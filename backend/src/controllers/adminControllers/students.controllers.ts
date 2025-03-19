import { Request, Response } from "express";

import prisma from "../../config/db";

export const addStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      fatherName,
      motherName,
      gender,
      address,
      profilePic,
      grade,
      rollNumber,
      mobileNumber,
      bloodGroup,
      createdAt,
    } = req.body;
    const add_student = await prisma.student.create({
      data: {
        name,
        fatherName,
        motherName,
        gender,
        address,
        profilePic,
        grade,
        rollNumber,
        mobileNumber,
        bloodGroup,
        createdAt,
      },
    });
    res.status(200).json({
      msg: "Student is Created SuccessFully",
      add_student,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      msg: "Internal Error",
    });
  }
};
