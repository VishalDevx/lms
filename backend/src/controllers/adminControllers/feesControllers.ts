import { Request, Response } from "express";
import prisma from "../../config/db";

// Create a student fee record
export const createStudentFee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { studentId, amount, dueDate, paid } = req.body;

    if (!studentId || typeof studentId !== "number") {
      res.status(400).json({ msg: "Invalid or missing student ID!" });
      return;
    }
    if (!amount || typeof amount !== "number") {
      res.status(400).json({ msg: "Invalid or missing amount!" });
      return;
    }
    if (!dueDate || isNaN(Date.parse(dueDate))) {
      res.status(400).json({ msg: "Invalid or missing due date!" });
      return;
    }

    const studentFee = await prisma.feeSystem.create({
      data: {
        studentId,
        amount,
        dueDate: new Date(dueDate),
        paid: Boolean(paid),
      },
    });

    res.status(200).json({
      msg: "Fee Created Successfully!",
      studentFee,
    });
  } catch (error) {
    console.error("Error creating student fee:", error);
    res.status(500).json({
      msg: "Error occurred while creating the fee!",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Get a student's fee information
export const studentFee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.body;

    if (!id || typeof id !== "number") {
      res.status(400).json({ msg: "Invalid or missing student ID!" });
      return;
    }

    const student = await prisma.student.findUnique({
      where: { id },
      include: { feeSystem: true },
    });

    if (!student) {
      res.status(404).json({ msg: "Student not found!" });
      return;
    }

    res.status(200).json({
      msg: "Student Fee Details Retrieved Successfully!",
      student,
    });
  } catch (error) {
    console.error("Error fetching student fee details:", error);
    res.status(500).json({
      msg: "Error occurred while fetching student fee details!",
      error: error instanceof Error ? error.message : error,
    });
  }
};
