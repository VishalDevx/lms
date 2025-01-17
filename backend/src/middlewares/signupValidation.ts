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
export const studentSchema = z.object({
  name: z.string().min(1, "Please Submit the name of students !"),
  fatherName: z.string().min(1, "Father Name"),
  motherName: z.string().min(1, "mother name "),
  gender: z.enum(["Male,Female,Others"]),
  bloodGroup: z.string().min(1, "Blood Group"),
  mobileNumber: z.string().min(10),
  address: z.string().min(1),
  profilePic: z.string().min(1),
  rollNumber: z.string().min(1),
});
