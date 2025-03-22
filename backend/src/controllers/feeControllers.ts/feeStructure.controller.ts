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
