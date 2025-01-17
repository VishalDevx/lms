import { Request, Response } from "express";
import prisma from "../../config/db";

export async function createStudent(
  req: Request,
  res: Response
): Promise<void> {
  const studentValidation = req.body;
  try {
    const createStudent = await prisma.student.create({
      data: studentValidation,
    });
    res.status(200).json({
      msg: "Students Created SuccessFully!",
      createStudent,
    });
  } catch (error) {}
}
