import { Request, Response } from "express";
import prisma from "../../config/db";

export const createStudentFee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { studentId, amount, dueDate, paid } = req.body;
    const studentFee = await prisma.feeSystem.create({
      data: {
        studentId,
        amount,
        dueDate,
        paid,
        student: {
          connect: { id: studentId },
        },
      },
    });
    res.status(200).json({
      msg: "Fee Created Successfully !",
      studentFee,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error occured while create the fee !",
      error,
    });
  }
};

export const studentFee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.body;
    const studentFee = await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        feeSystem: true,
      },
    });
  } catch (error) {}
};
