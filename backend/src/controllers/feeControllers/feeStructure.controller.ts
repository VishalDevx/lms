import { Request, Response } from "express";
import prisma from "../../config/db";


import { FeeStatusEnum, feeStructureSchema } from "../../zod"

export const assignFee = async (req: Request, res: Response): Promise<any> => {
  try {
    // Step 1: Validate input
    const validatedData = feeStructureSchema.parse(req.body);

    // Step 2: Create the main FeeStructure (once)
    const feeStructure = await prisma.feeStructure.create({
      data: validatedData,
    });

    // Step 3: Fetch all students in the target grade
    const students = await prisma.student.findMany({
      where: { grade: validatedData.grade },
      select: { id: true }, // only need the ID
    });

    if (students.length === 0) {
      return res.status(404).json({
        message: `No students found in grade ${validatedData.grade}`,
      });
    }

    // Step 4: Prepare StudentFee records for each student
    const studentFees = students.map((student: { id: any; }) => ({
      studentId: student.id,
      feeStructureId: feeStructure.id,
      paidAmount: 0,
      dueAmount: validatedData.amount,
      dueDate: validatedData.month,
      status: FeeStatusEnum.enum.PENDING,
    }));

    // Step 5: Bulk create all studentFee entries
    await prisma.studentFee.createMany({
      data: studentFees,
    });

    // Step 6: Respond to client
    return res.status(201).json({
      message: `Fee assigned to ${students.length} students in grade ${validatedData.grade}`,
      feeStructure,
    });
  } catch (error: any) {
    console.error("Fee assignment failed:", error);
    return res.status(500).json({
      message: "Something went wrong while assigning fee",
      error: error.message,
    });
  }
};
export const studentFee = async (req: Request, res: Response): Promise<any> => {
  try {
    // const validatedData = studentFeeSchema.parse(req.body);
    const studentFee = await prisma.studentFee.findMany({});
    return res.status(201).json({
      msg: "student fee ",
      studentFee,
    });
  } catch (error) {
    return res.status(403).json({
      msg: " not availble to find the fee ",
      error,
    });
  }
};
