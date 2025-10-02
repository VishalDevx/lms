import { Request, Response } from "express";
import prisma from "../../config/db";
import { FeeStatusEnum } from "../../zod"; // import from your Zod enums

export const runFeeScheduler = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const academicYearStartMonth = 3; // April
    let year = today.getFullYear();
    if (today.getMonth() < academicYearStartMonth) year -= 1;

    const currentMonth = new Date(year, today.getMonth(), 1);

    // Fetch fee structures for the current month
    const feeStructures = await prisma.feeStructure.findMany({
      where: { month: currentMonth },
      orderBy: { updatedAt: "desc" },
    });

    let createdFeesCount = 0;

    for (const fee of feeStructures) {
      const students = await prisma.student.findMany({ where: { grade: fee.grade } });

      for (const student of students) {
        // Check if fee already exists
        const existingFee = await prisma.studentFee.findFirst({
          where: { studentId: student.id, feeStructureId: fee.id },
        });

        if (!existingFee) {
          // Create new student fee
          const studentFee = await prisma.studentFee.create({
            data: {
              studentId: student.id,
              feeStructureId: fee.id,
              totalFee: fee.amount,
              dueAmount: fee.amount,
              paidAmount: 0,
              status: FeeStatusEnum.enum.PENDING, // Use Zod enum for safety
              dueDate: new Date(today.getFullYear(), today.getMonth(), 10),
            },
          });

          // Create fee history
          await prisma.feeHistory.create({
            data: {
              changeType: "Auto Update",
              oldAmount: 0,
              newAmount: fee.amount,
              status: FeeStatusEnum.enum.PENDING,
              studentFeeId: studentFee.id,
            },
          });

          createdFeesCount++;
        }
      }
    }

    return res.status(200).json({
      msg: "Fee scheduler run successfully",
      feesCreated: createdFeesCount,
    });
  } catch (err) {
    console.error("Error running fee scheduler:", err);
    return res.status(500).json({
      msg: "Error running fee scheduler",
      error: (err as Error).message || err,
    });
  }
};


// POST /admin/fee-structure
export const createFeeStructure = async (req: Request, res: Response) => {
  try {
    const { name, amount, month, grade } = req.body;

    const fee = await prisma.feeStructure.create({
      data: { name, amount, month, grade },
    });

    res.status(201).json({ msg: "Fee structure created", fee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to create fee structure", error: err });
  }
};
