import { Request, Response, NextFunction } from "express";
import { z } from "zod";
const studentSchema = z.object({
  name: z.string().min(1, "Please Submit the name of students!"),
  fatherName: z.string().min(1, "Father Name is required"),
  motherName: z.string().min(1, "Mother Name is required"),
  gender: z.enum(["Male", "Female", "Others"]),
  bloodGroup: z.string().min(1, "Blood Group is required"),
  class: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], {
    required_error: "Class is required",
  }), // Include "10"
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .or(
      z
        .number()
        .refine(
          (num) => num.toString().length >= 10,
          "Mobile number must be at least 10 digits"
        )
    ),
  address: z.string().min(1, "Address is required"),
  profilePic: z.string().min(1, "Profile picture URL is required"),
  rollNumber: z.string().min(1, "Roll Number is required"),
  adminId: z.number().min(1, "Admin ID is required"),
});

export const studentValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    studentSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      msg: " Validation Error",
      error,
    });
  }
};
