import { Request, Response } from "express";
import prisma from "../../config/db";
import { expenseSchema } from "../../zod/expenseSchema";

export const addExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validateDate = expenseSchema.parse(req.body);
    const expense = await prisma.expense.create({
      data: validateDate,
    });
    res.status(201).json({
      msg: " expense  added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: " error eccoured when trying to adding the expense",
    });
  }
};
export const getExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expense = await prisma.expense.findMany();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
