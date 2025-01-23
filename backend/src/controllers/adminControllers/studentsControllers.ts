import { Request, Response } from "express";

import prisma from "../../config/db";
import { Gender } from "@prisma/client";

export const studentSchema = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      fatherName,
      motherName,
      gender,
      bloodGroup,
      grade,
      mobileNumber,
      address,
      profilePic,
      rollNumber,
      createdAt,
      updatedAt,
    } = req.body;

    const addStudent = await prisma.student.create({
      data: {
        name,
        fatherName,
        motherName,
        gender,
        bloodGroup,
        grade,
        mobileNumber,
      },
    });
  } catch (error) {}
};
