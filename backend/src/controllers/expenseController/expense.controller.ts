import { Request, Response } from "express";
import prisma from "../../config/db";
import { expenseSchema } from "../../zod";

// -------------------- Add Transaction --------------------
export const addTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const validateData = expenseSchema.parse(req.body);
    const validTypes = ["CREDIT", "DEBIT"];

    if (!validateData.type || !validTypes.includes(validateData.type.toUpperCase())) {
      res.status(400).json({
        msg: "Invalid 'type' provided. It must be either 'CREDIT' or 'DEBIT'.",
      });
      return;
    }

    const transaction = await prisma.expenseTracker.create({
      data: {
        ...validateData,
        type: validateData.type.toUpperCase() === "CREDIT" ? "CREDIT" : "DEBIT",
      },
    });

    res.status(200).json({
      msg: "Transaction added successfully",
      transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Invalid information provided" });
  }
};

// -------------------- Income --------------------
export const incomeByWeek = async (req: Request, res: Response): Promise<any> => {
  try {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);

    const income = await prisma.expenseTracker.findMany({
      where: { date: { gte: weekStart, lte: weekEnd }, type: "CREDIT" },
    });

    const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const incomeData = Array(7).fill(0);

    income.forEach(item => {
      const dayIndex = (new Date(item.date).getDay() + 6) % 7; // Monday=0
      incomeData[dayIndex] += item.amount;
    });

    res.status(200).json({
      labels,
      incomeData,
      totalIncome: incomeData.reduce((a,b) => a+b,0),
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching weekly income" });
  }
};

export const incomeByMonth = async (req: Request, res: Response): Promise<any> => {
  try {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);

    const income = await prisma.expenseTracker.findMany({
      where: { date: { gte: monthStart, lte: monthEnd }, type: "CREDIT" },
    });

    const daysInMonth = monthEnd.getDate();
    const labels = Array.from({length: daysInMonth}, (_, i) => (i+1).toString());
    const incomeData = Array(daysInMonth).fill(0);

    income.forEach(item => {
      const day = new Date(item.date).getDate() - 1;
      incomeData[day] += item.amount;
    });

    res.status(200).json({
      labels,
      incomeData,
      totalIncome: incomeData.reduce((a,b) => a+b,0),
      monthStart: monthStart.toISOString(),
      monthEnd: monthEnd.toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching monthly income" });
  }
};

export const incomeByYear = async (req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    const yearStart = startOfYear(today);
    const yearEnd = endOfYear(today);

    const income = await prisma.expenseTracker.findMany({
      where: { date: { gte: yearStart, lte: yearEnd }, type: "CREDIT" },
    });

    const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const incomeData = Array(12).fill(0);

    income.forEach(item => {
      const monthIndex = new Date(item.date).getMonth();
      incomeData[monthIndex] += item.amount;
    });

    res.status(200).json({
      labels,
      incomeData,
      totalIncome: incomeData.reduce((a,b)=>a+b,0),
      yearStart: yearStart.toISOString(),
      yearEnd: yearEnd.toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching yearly income" });
  }
};

// -------------------- Expense --------------------
export const expenseByWeek = async (req: Request, res: Response): Promise<any> => {
  try {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);

    const expense = await prisma.expenseTracker.findMany({
      where: { date: { gte: weekStart, lte: weekEnd }, type: "DEBIT" },
    });

    const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const expenseData = Array(7).fill(0);

    expense.forEach(item => {
      const dayIndex = (new Date(item.date).getDay() + 6) % 7;
      expenseData[dayIndex] += item.amount;
    });

    res.status(200).json({
      labels,
      expenseData,
      totalExpense: expenseData.reduce((a,b)=>a+b,0),
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching weekly expense" });
  }
};

export const expenseByMonth = async (req: Request, res: Response): Promise<any> => {
  try {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);

    const expense = await prisma.expenseTracker.findMany({
      where: { date: { gte: monthStart, lte: monthEnd }, type: "DEBIT" },
    });

    const daysInMonth = monthEnd.getDate();
    const labels = Array.from({length: daysInMonth}, (_, i) => (i+1).toString());
    const expenseData = Array(daysInMonth).fill(0);

    expense.forEach(item => {
      const day = new Date(item.date).getDate() - 1;
      expenseData[day] += item.amount;
    });

    res.status(200).json({
      labels,
      expenseData,
      totalExpense: expenseData.reduce((a,b)=>a+b,0),
      monthStart: monthStart.toISOString(),
      monthEnd: monthEnd.toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching monthly expense" });
  }
};

export const expenseByYear = async (req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    const yearStart = startOfYear(today);
    const yearEnd = endOfYear(today);

    const expense = await prisma.expenseTracker.findMany({
      where: { date: { gte: yearStart, lte: yearEnd }, type: "DEBIT" },
    });

    const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const expenseData = Array(12).fill(0);

    expense.forEach(item => {
      const monthIndex = new Date(item.date).getMonth();
      expenseData[monthIndex] += item.amount;
    });

    res.status(200).json({
      labels,
      expenseData,
      totalExpense: expenseData.reduce((a,b)=>a+b,0),
      yearStart: yearStart.toISOString(),
      yearEnd: yearEnd.toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching yearly expense" });
  }
};
//-------------------Cetagory------------------------
// -------------------- Income by Category --------------------
export const incomeByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await prisma.expenseTracker.groupBy({
      by: ["category"],
      where: { type: "CREDIT" },
      _sum: { amount: true },
    });

    // Prepare chart data
    const labels = data.map(item => item.category);
    const incomeData = data.map(item => item._sum.amount ?? 0);
    const totalIncome = incomeData.reduce((a,b) => a+b,0);

    res.status(200).json({
      labels,
      incomeData,
      totalIncome,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching income by category" });
  }
};

// -------------------- Expense by Category --------------------
export const expenseByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await prisma.expenseTracker.groupBy({
      by: ["category"],
      where: { type: "DEBIT" },
      _sum: { amount: true },
    });

    // Prepare chart data
    const labels = data.map(item => item.category);
    const expenseData = data.map(item => item._sum.amount ?? 0);
    const totalExpense = expenseData.reduce((a,b) => a+b,0);

    res.status(200).json({
      labels,
      expenseData,
      totalExpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching expense by category" });
  }
};


// -------------------- Helpers --------------------
function startOfWeek(date: Date) {
  const day = date.getDay();
  const diff = (day + 6) % 7; // Monday=0
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
