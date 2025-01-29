import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const addStudentSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long!")
      .max(50, "Name must not exceed 50 characters!")
      .nonempty("Name is required!"),

    fatherName: z
      .string()
      .min(2, "Father name must be at least 2 characters long!")
      .max(50, "Father name must not exceed 50 characters!")
      .nonempty("Father name is required!"),

    motherName: z
      .string()
      .min(2, "Mother name must be at least 2 characters long!")
      .max(50, "Mother name must not exceed 50 characters!")
      .nonempty("Mother name is required!"),

    gender: z.enum(["Male", "Female", "Other"]),

    bloodGroup: z.string().optional(),

    grade: z.string().nonempty("Grade is required!"),

    mobileNumber: z
      .string()
      .min(10, "Mobile number must be at least 10 digits!")
      .max(15, "Mobile number must not exceed 15 digits!")
      .optional(),

    address: z.string().nonempty("Address is required!"),

    profilePic: z.string().url().nonempty("Profile picture URL is required!"),

    rollNumber: z.string().nonempty("Roll number is required!"),
  }),
});

export const studentValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Validate request body against the schema
    addStudentSchema.parse(req);

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({
      msg: "Validation failed",
    });
  }
};

// Exporting type correctly
export type AddStudentSchemaType = z.infer<typeof addStudentSchema>;
