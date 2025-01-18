import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const feeSchema = z.object({
  studentId: z.number().min(1, "StudentId is Required!"),
  amount: z.number().min(1, "Amout is required"),
  dueDate: z.date(),
  paid: z.boolean().default(false),
});

export const feeValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    feeSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      msg: "Validation Error ",
      error,
    });
  }
};
