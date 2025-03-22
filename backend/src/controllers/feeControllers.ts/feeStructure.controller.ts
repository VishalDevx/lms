import { Request, Response } from "express";
import prisma from "../../config/db";
import { feeStructureSchema } from "../../zod/feeStuctureSchema";

export const createFeeStructure = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const validateDate = feeStructureSchema.parse(req.body);

    const neeFee = await prisma.feeStructure.create({
      data: validateDate,
    });
  } catch (error) {}
};
