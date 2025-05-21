import { Request, Response } from "express";
import prisma from "../../config/db";

export const expenseDashBoard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const credit = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: "CREDIT",
      },
    });

    const debit = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: "DEBIT",
      },
    });

    res.status(200).json({
      creditAmount: credit._sum.amount ?? 0,
      debitAmount: debit._sum.amount ?? 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error occurred while fetching dashboard data",
      error,
    });
  }
};

export const feeDashBoard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const paid = await prisma.studentFee.aggregate({
      _sum: {
        paidAmount: true,
      },
      where: {
        status: "PAID",
      },
    });
    const pending = await prisma.studentFee.aggregate({
      _sum: {
        dueAmount: true,
      },
      where: {
        status: "PENDING",
      },
    });
    res.status(200).json({
      paidAmount: paid._sum.paidAmount ?? 0,
      pendingAmount: pending._sum.dueAmount ?? 0,
    });
  } catch (error) {
    console.error(error);
    res.status(403).json(error);
  }
};
