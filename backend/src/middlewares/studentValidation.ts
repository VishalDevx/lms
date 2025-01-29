import { error } from "console";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const studentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be atleast 2 character long!")
    .max(50, "Name must not be exceed 50 character!"),

  fatherName: z
    .string()
    .min(2, "Father name must be atleast 2 character long!")
    .max(50, "Father name must  not be exceed 50 character"),
  motherName: z
    .string()
    .min(2, "Mother name must be atleast 2 character long!")
    .max(50, "Mother name must  not be exceed 50 character"),
  gender: z.enum(["Male", "Female", "Other"]),
  grade: z.enum(["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"]),
  address: z.string(),
  profilePic: z.string().url(),
  rollNumber: z.string().nonempty(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Mobile number must be 10 to 15 digits long.")
    .optional(),
  createdAt: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : new Date())),
});

export const validateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validation_student = studentSchema.safeParse(req.body);
    if (!validation_student.success) {
      res.status(400).json({
        msg: "Validation Failed",
        error: validation_student.error.format(),
      });
      return;
    }
    req.body = validation_student.data;
    next();
  } catch (error) {
    console.error("Validation Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
