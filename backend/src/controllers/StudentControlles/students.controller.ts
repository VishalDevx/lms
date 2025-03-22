import { Request, Response } from "express";

import prisma from "../../config/db";
import { studentSchema } from "../../zod/studentSchema";
import { promises } from "dns";
export const addStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    // validate input date using zod
    const validatedData = studentSchema.parse(req.body);

    // check for uniqueness in prisma
    const existStudent = await prisma.student.findFirst({
      where: {
        OR: [
          { rollNumber: validatedData.rollNumber },
          {
            mobileNumber: validatedData.mobileNumber,
          },
        ],
      },
    });
    if (existStudent) {
      return res.status(400).json({
        msg: "Roll Number and mobile number is already exists !",
      });
    }
    // Insert a new student in the database
    const newStudent = await prisma.student.create({
      data: validatedData,
    });
    return res.status(201).json({
      msg: " student created SuccessFully",
      newStudent,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      msg: " Internal Error when adding the new student !",
      error,
    });
  }
};

export const updateStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { rollNumber } = req.body;
    // validate the input data
    const validatedData = studentSchema.partial().parse(req.body);
    const existStudent = await prisma.student.findUnique({
      where: { rollNumber },
    });
    if (!existStudent) {
      return res.status(404).json({
        msg: " Student not found!",
      });
    }
    if (validatedData.rollNumber || validatedData.mobileNumber) {
      const duplicateStudent = await prisma.student.findFirst({
        where: {
          OR: [
            { rollNumber: validatedData.rollNumber },
            { mobileNumber: validatedData.mobileNumber },
          ],
          NOT: { rollNumber },
        },
      });
      if (duplicateStudent) {
        return res.status(400).json({
          msg: " Roll Number and Mobile Number is already exists !",
        });
      }
    }
    // update in database
    const updateStudent = await prisma.student.update({
      where: { rollNumber },
      data: validatedData,
    });
    return res.status(200).json({
      msg: " student informatin updated successfully!",
      updateStudent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: " Internal error is occured when updating the student !",
      error,
    });
  }
};

export const allStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const allStudent = await prisma.student.findMany();
    return res.status(201).json(allStudent);
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      msg: " some error is occured ",
      error,
    });
  }
};

export const studentByRollnumber = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { rollNumber } = req.body;
    if (!rollNumber) {
      return res.status(404).json({
        msg: " student not found",
      });
    }
    const studentByRollnumber = await prisma.student.findUnique({
      where: { rollNumber },
    });
    return res.status(201).json(studentByRollnumber);
  } catch (error) {
    console.error(400);
    return res.status(500).json({
      msg: " internal error",
      error,
    });
  }
};
