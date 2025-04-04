import { Request, Response } from "express";
import prisma from "../../config/db";
import z from "zod";
import { feeStructureSchema } from "../../zod/feeStuctureSchema";
import { FeeStatus } from "@prisma/client";

export const assignFee = async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = feeStructureSchema.parse(req.body);
    const feeStructure = await prisma.feeStructure.create({
      data: validatedData,
    });
    const student = await prisma.student.findMany({});
    const feeEntries = student.map((student) => ({
      studentId: student.id,
      feeStructureId: feeStructure.id,
      dueDate: new Date(validatedData.dueDate),
      dueAmount: feeStructure.amount,
      paidAmount: 0,
      status: FeeStatus.PENDING,
    }));
    await prisma.studentFee.createMany({
      data: feeEntries,
    });
    return res.status(200).json({
      msg: "fee is added successfully",
      feeEntries,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      msg: "bad request",
      error,
    });
  }
};
