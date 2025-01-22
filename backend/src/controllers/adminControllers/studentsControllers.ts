import { Request, Response } from "express";

import prisma from "../../config/db";

export const studentSchema = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {name ,fatherName ,motherName,gender,bloodGroup,class,mobileNumber,address,profilePic,rollNumber,createdAt,updatedAt}= req.body
  } catch (error) {}
};
