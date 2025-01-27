import { Request, Response } from "express";
import {
  StudentModel,
  studentSchema,
} from "../../middlewares/studentValidation";
import prisma from "../../config/db";
export const addStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const studentData: StudentModel = studentSchema.parse(req.body);
    const student = await prisma.student.create({
      data: studentData,
    });
  } catch (error) {}
};
