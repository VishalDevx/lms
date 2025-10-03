import { Request, Response } from "express";
import prisma from "../../config/db";
import { FeeStatusEnum } from "../../zod";

export const createFeeStructure = async (req: Request, res: Response) => {
  try {
    const { name, amount, month, grade } = req.body;

    // 1️⃣ Create fee structure
    const fee = await prisma.feeStructure.create({
      data: { name, amount, month, grade },
    });

    // 2️⃣ Fetch all students in that grade
    const students = await prisma.student.findMany({
      where: { grade },
    });

    // 3️⃣ Assign fee to each student
    let assignedFeesCount = 0;
    for (const student of students) {
      const existing = await prisma.studentFee.findFirst({
        where: { studentId: student.id, feeStructureId: fee.id },
      });

      if (!existing) {
        const studentFee = await prisma.studentFee.create({
          data: {
            studentId: student.id,
            feeStructureId: fee.id,
            totalFee: amount,
            dueAmount: amount,
            paidAmount: 0,
            status: FeeStatusEnum.enum.PENDING,
            dueDate: new Date(new Date(month).getFullYear(), new Date(month).getMonth(), 10),
          },
        });

        // optional: record history
        await prisma.feeHistory.create({
          data: {
            changeType: "Initial Assignment",
            oldAmount: 0,
            newAmount: amount,
            status: FeeStatusEnum.enum.PENDING,
            studentFeeId: studentFee.id,
          },
        });

        assignedFeesCount++;
      }
    }

    return res.status(201).json({
      msg: "Fee structure created and assigned to students",
      fee,
      assignedFeesCount,
    });
  } catch (err) {
    console.error("Error creating fee structure:", err);
    res.status(500).json({ msg: "Failed to create fee structure", error: err });
  }
};
