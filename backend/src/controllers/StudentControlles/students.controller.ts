import { Request, Response } from "express";
import prisma from "../../config/db";
import { studentSchema } from "../../zod";
import { ZodError } from "zod";

// Add new student
export const addStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = studentSchema.parse(req.body);

    // Check for duplicate rollNumber or mobileNumber
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

// Update student info
export const updateStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { rollNumber } = req.body;

    // Partial validation
    const validatedData = studentSchema.partial().parse(req.body);

    const existStudent = await prisma.student.findUnique({
      where: { rollNumber },
    });

    if (!existStudent) {
      return res.status(404).json({
        msg: "Student not found!",
      });
    }

    // Check for duplicate rollNumber or mobileNumber
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
          msg: "Roll Number and Mobile Number already exist!",
        });
      }
    }

    const updateStudent = await prisma.student.update({
      where: { rollNumber },
      data: validatedData,
    });

    return res.status(200).json({
      msg: "Student information updated successfully!",
      updateStudent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal error occurred when updating the student!",
      error,
    });
  }
};

// Get all students with enhanced fee info
export const allStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const allStudents = await prisma.student.findMany({
      include: {
        studentFees: {
          include: {
            payments: true,
            feeHistories: true,
            FeeStructure: true,
          },
        },
      },
    });

    return res.status(200).json(allStudents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Some error occurred while fetching students",
      error,
    });
  }
};

// Get single student by roll number with full fee info
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
        studentFees: {
          include: {
            payments: true,       // payment history
            feeHistories: true,   // track updates and discounts
            FeeStructure: true,   // month, grade, original amount
          },
        },
      },
    });

    if (!studentWithFees) {
      return res.status(404).json({ msg: "Student not found" });
    }

    return res.status(200).json(studentWithFees);
  } catch (error) {
    console.error("Error fetching student with fee:", error);
    return res.status(500).json({
      msg: "Internal error",
      error,
    });
  }
};
