import { Request, Response } from "express";
import prisma from "../../config/db";
import { expenseSchema } from "../../zod";

// -------------------- Add Transaction --------------------
export const addTransaction = async (req: Request, res: Response) => {
  try {
    const validated = expenseSchema.parse(req.body);

    const transaction = await prisma.expenseTracker.create({
      data: {
        ...validated,
        type: validated.type.toUpperCase() === "CREDIT" ? "CREDIT" : "DEBIT",
      },
    });

    res.status(200).json({ msg: "Transaction added", transaction });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Invalid transaction data" });
  }
};

// -------------------- Transactions by Week --------------------
export const transactionsByWeek = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);

    const transactions = await prisma.expenseTracker.findMany({
      where: { date: { gte: weekStart, lte: weekEnd } },
    });

    const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const incomeData = Array(7).fill(0);
    const expenseData = Array(7).fill(0);

    transactions.forEach(item => {
      const dayIndex = (new Date(item.date).getDay() + 6) % 7; // Monday=0
      if(item.type === "CREDIT") incomeData[dayIndex] += item.amount;
      if(item.type === "DEBIT") expenseData[dayIndex] += item.amount;
    });

    res.status(200).json({
      labels,
      incomeData,
      expenseData,
      totalIncome: incomeData.reduce((a,b)=>a+b,0),
      totalExpense: expenseData.reduce((a,b)=>a+b,0),
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching weekly transactions" });
  }
};

// -------------------- Transactions by Month --------------------
export const transactionsByMonth = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);

    const transactions = await prisma.expenseTracker.findMany({
      where: { date: { gte: monthStart, lte: monthEnd } },
    });

    const daysInMonth = monthEnd.getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    const incomeData = Array(daysInMonth).fill(0);
    const expenseData = Array(daysInMonth).fill(0);

    transactions.forEach(item => {
      const day = new Date(item.date).getDate() - 1;
      if(item.type === "CREDIT") incomeData[day] += item.amount;
      if(item.type === "DEBIT") expenseData[day] += item.amount;
    });

    res.status(200).json({
      labels,
      incomeData,
      expenseData,
      totalIncome: incomeData.reduce((a,b)=>a+b,0),
      totalExpense: expenseData.reduce((a,b)=>a+b,0),
      monthStart: monthStart.toISOString(),
      monthEnd: monthEnd.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching monthly transactions" });
  }
};

// -------------------- Transactions by Year --------------------
export const transactionsByYear = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const yearStart = startOfYear(today);
    const yearEnd = endOfYear(today);

    const transactions = await prisma.expenseTracker.findMany({
      where: { date: { gte: yearStart, lte: yearEnd } },
    });

    const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const incomeData = Array(12).fill(0);
    const expenseData = Array(12).fill(0);

    transactions.forEach(item => {
      const monthIndex = new Date(item.date).getMonth();
      if(item.type === "CREDIT") incomeData[monthIndex] += item.amount;
      if(item.type === "DEBIT") expenseData[monthIndex] += item.amount;
    });

    res.status(200).json({
      labels,
      incomeData,
      expenseData,
      totalIncome: incomeData.reduce((a,b)=>a+b,0),
      totalExpense: expenseData.reduce((a,b)=>a+b,0),
      yearStart: yearStart.toISOString(),
      yearEnd: yearEnd.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching yearly transactions" });
  }
};
// -------------------- Raw Transactions by week --------------------

export const transactionsByWeekRaw = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);

    const transactions = await prisma.expenseTracker.findMany({
      where: { date: { gte: weekStart, lte: weekEnd } },
      orderBy: { date: "asc" },
    });

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching weekly transactions" });
  }
};

// -------------------- Raw Transactions by Month --------------------
export const transactionsByMonthRaw = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);

    const transactions = await prisma.expenseTracker.findMany({
      where: { date: { gte: monthStart, lte: monthEnd } },
      orderBy: { date: "asc" },
    });

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching monthly transactions" });
  }
};
// -------------------- Helpers --------------------
function startOfWeek(date: Date) {
  const day = date.getDay();
  const diff = (day + 6) % 7;
  const start = new Date(date);
  start.setDate(date.getDate() - diff);
  start.setHours(0,0,0,0);
  return start;
}

function endOfWeek(date: Date) {
  const start = startOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23,59,59,999);
  return end;
}

function startOfMonth(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  start.setHours(0,0,0,0);
  return start;
}

function endOfMonth(date: Date) {
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23,59,59,999);
  return end;
}

function startOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 1);
  start.setHours(0,0,0,0);
  return start;
}

function endOfYear(date: Date) {
  const end = new Date(date.getFullYear(), 11, 31);
  end.setHours(23,59,59,999);
  return end;
}
