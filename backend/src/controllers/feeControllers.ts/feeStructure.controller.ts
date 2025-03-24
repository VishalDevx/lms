import { Request, Response } from "express";
import prisma from "../../config/db";
import { feeStructureSchema } from "../../zod/feeStuctureSchema";

export const createFeeStructure = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const validateDate = feeStructureSchema.parse(req.body);

    const newFee = await prisma.feeStructure.create({
      data: validateDate,
    });
    return res.status(200).json({
      msg: "fees added in the student page",
      newFee,
    });
  } catch (error) {
    return res.status(404).json({
      msg: " internal error ",
      error,
    });
  }
};

export const studentFee = async (req: Request, res: Response): Promise<any> => {
  try {
    // Extract student ID from request params
    const { studentId } = req.params;

    // Fetch all Student Fees linked to this student
    const studentFees = await prisma.studentFee.findMany({
      where: { studentId },
      include: { feeStructure: true }, // Include fee structure details
    });

    // If no fees found, return a message
    if (studentFees.length === 0) {
      return res.status(404).json({
        msg: "No fees found for this student",
      });
    }

    return res.status(200).json({
      msg: "Student fees retrieved successfully",
      studentFees,
    });
  } catch (error) {
    return res.status(401).json({
      msg: "error occured in the student fee ",
      error,
    });
  }
};
