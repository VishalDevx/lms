import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["ADMIN", "STAFF", "STUDENT"]),
});

export const signupValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    signupSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({
      message: "Validation Error",
      error: error.errors || error.message, // Handle Zod errors
    });
  }
};
