import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const studentSchema = z.object({
  name: z.string().min(1, "Please Submit the name of students !"),
  fatherName: z.string().min(1, "Father Name"),
  motherName: z.string().min(1, "mother name "),
  gender: z.enum(["Male,Female,Others"]),
  bloodGroup: z.string().min(1, "Blood Group"),
  mobileNumber: z.number().min(10),
  address: z.string().min(1),
  profilePic: z.string().min(1),
  rollNumber: z.string().min(1),
  adminId: z.number().min(1),
});

export const studentValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    studentSchema.parse(req.header);
    next();
  } catch (error) {
    console.error(error);
  }
};
