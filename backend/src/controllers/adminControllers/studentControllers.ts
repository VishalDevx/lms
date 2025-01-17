import { Request, Response } from "express";
import prisma from "../../config/db";

export const addStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    name,
    fatherName,
    motherName,
    gender,
    bloodGroup,
    mobileNumber,
    address,
    profilePic,
    rollNumber,
  } = req.body;
  try {
    const createStudent = await prisma.student.create({
      data: {
        name,
        fatherName,
        motherName,
        gender,
        bloodGroup,
        mobileNumber,
        address,
        profilePic,
        rollNumber,
      },
    });
  } catch (error) {}
};
