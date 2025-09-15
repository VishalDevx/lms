import { Request, Response } from "express";

import prisma from "../../config/db";
import { studentSchema } from "../../zod";
import { ZodError } from "zod";
export const addStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = studentSchema.parse(req.body);

    const existStudent = await prisma.student.findFirst({
      where: {
        OR: [
          { rollNumber: validatedData.rollNumber },
          { mobileNumber: validatedData.mobileNumber },
        ],
      },
    });

    if (existStudent) {
      return res.status(400).json({
        msg: "Roll Number and mobile number already exist!",
      });
    }

    const newStudent = await prisma.student.create({
      data: validatedData,
    });

    return res.status(201).json({
      msg: "Student created successfully",
      newStudent,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return res.status(400).json({
        msg: "Validation failed",
        issues: error.errors,
      });
    }

    return res.status(500).json({
      msg: "Internal error when adding the new student",
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
    const fee = await prisma.studentFee.findMany();
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
    const { rollNumber } = req.params;

    if (!rollNumber) {
      return res.status(404).json({
        msg: "Student not found",
      });
    }

    const studentWithFees = await prisma.student.findUnique({
      where: { rollNumber },
      include: {
        StudentFee: {
          include: {
           
            payments: true, // if you also want payment history
          },
        },
      },
    });

    if (!studentWithFees) {
      return res.status(404).json({ msg: "Student not found" });
    }
    console.log(studentWithFees);
    return res.status(200).json(studentWithFees);
  } catch (error) {
    console.error("Error fetching student with fee:", error);
    return res.status(500).json({
      msg: "Internal error",
      error,
    });
  }
};
