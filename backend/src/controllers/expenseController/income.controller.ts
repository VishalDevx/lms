import { Request, Response } from "express";
import prisma from "../../config/db";
import { expenseSchema } from "../../zod";
import { date } from "zod";
import { stat } from "fs";

export const addTrascation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validateData = expenseSchema.parse(req.body);

    const validTypes = ["INCOME", "EXPENSE"];

    if (
      !validateData.type ||
      !validTypes.includes(validateData.type.toUpperCase())
    ) {
      res.status(400).json({
        msg: "Invalid 'type' provided. It must be either 'INCOME' or 'EXPENSE'.",
      });
      return;
    }
    const trasaction = await prisma.expenseTracker.create({
      data: {
        ...validateData,
        type: validateData.type === "INCOME" ? "Income" : "Expense",
      },
    });
    res.status(200).json({
      msg: " Trascation added successFully",
      trasaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: " You are give the invalide information ",
    });
  }
};

export const incomeByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const incomeByCategory = await prisma.expenseTracker.groupBy({
      by: ["category"],
      where: {
        type: "Income",
      },
      _sum: {
        amount: true,
      },
    });
    res.status(202).json({
      msg: `Total Income is ${incomeByCategory}`,
    });
    console.log(incomeByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Not getting the sum of the income",
    });
  }
};

export const incomeByWeek = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const today = new Date();

    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 }); // Sunday

    const incomes = await prisma.expenseTracker.findMany({
      where: {
        date: {
          gte: weekStart,
          lte: weekEnd,
        },
        type: "Income", // Adjust based on your DB schema
      },
    });

    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);

    res.status(200).json({
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
      totalIncome,
    });
  } catch (error) {
    console.error("Error fetching weekly income:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Manual helper: Get Monday of the week
function startOfWeek(date: Date, options: { weekStartsOn: number }): Date {
  const day = date.getDay();
  const diff =
    (day < options.weekStartsOn ? 7 : 0) + day - options.weekStartsOn;
  const start = new Date(date);
  start.setDate(date.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

// Manual helper: Get Sunday of the week
function endOfWeek(date: Date, options: { weekStartsOn: number }): Date {
  const start = startOfWeek(date, options);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

export const incomeBymonth = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const income = await prisma.expenseTracker.findMany({
      where: {
        date: {
          gte: monthStart,
          lte: monthEnd,
        },
        type: "Income",
      },
    });
    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);

    res.status(200).json({
      monthStart: monthStart.toISOString(),
      monthEnd: monthEnd.toISOString(),
      totalIncome,
      records: income,
    });
  } catch (error) {
    console.error(error);

    res.status(503).json({
      msg: "Errror in the month income",
    });
  }
};

// helper to get the first day to month
function startOfMonth(date: Date): Date {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  start.setHours(0, 0, 0, 0);
  return start;
}
// helper to get the last day to month
function endOfMonth(date: Date): Date {
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return end;
}
