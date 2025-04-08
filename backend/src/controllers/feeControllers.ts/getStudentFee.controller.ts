import { Request, Response } from "express";
import prisma from "../../config/db";

export const getStudentFees = async (
  req: Request,
  res: Response
): Promise<any> => {
  const studentId = Number(req.params.id);

  if (!studentId || isNaN(studentId)) {
    return res.status(400).json({ message: "Invalid student ID" });
  }

  try {
    const fees = await prisma.studentFee.findMany({
      where: {
        studentId: studentId,
      },
      include: {
        FeeStructure: true, // include the related FeeStructure
      },
      orderBy: {
        dueDate: "asc",
      },
    });

    return res.status(200).json({
      message: "Fees fetched successfully",
      data: fees.map((fee) => ({
        feeName: fee.FeeStructure.name,
        month: fee.FeeStructure.month,
        dueDate: fee.dueDate,
        paidAmount: fee.paidAmount,
        dueAmount: fee.dueAmount,
        status: fee.status,
      })),
    });
  } catch (error: any) {
    console.error("Error fetching fees:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
