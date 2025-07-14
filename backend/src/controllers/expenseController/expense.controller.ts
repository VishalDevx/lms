import { Request, Response } from "express";
import prisma from "../../config/db";
import { expenseSchema } from "../../zod";

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

export const totalIncome = async (
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
