import { Request, Response } from "express";
import prisma from "../../config/db";

export const createStudent = async (
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
      class: studentClass, // Avoid using the reserved keyword 'class'
      mobileNumber,
      address,
      profilePic,
      rollNumber,
      adminId,
    } = req.body;

    // Create a new student
    const createStudent = await prisma.student.create({
      data: {
        name,
        fatherName,
        motherName,
        gender,
        bloodGroup,
        class: studentClass, // Map the 'class' field
        mobileNumber: parseInt(mobileNumber, 10), // Ensure it's an integer
        address,
        profilePic,
        rollNumber,
        adminId,
      },
    });

    // Send success response
    res.status(201).json({
      message: "Student created successfully!",
      student: createStudent,
    });
  } catch (error) {
    console.error("Error creating student:", error);

    // Handle errors gracefully
    res.status(500).json({
      message: "An error occurred while creating the student.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const uniqueStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { rollNumber } = req.body;
    const uniqueStudents = await prisma.student.findUnique({
      where: {
        rollNumber,
      },
    });
    res.status(200).json({
      msg: " Get the Unique Students",
      uniqueStudents,
    });
  } catch (error) {
    res.status(400).json({
      msg: " Internal Error ",
      error,
    });
  }
};

export const students = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json({
      success: "true",
      msg: " Students fetched successfully ",
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students ", error);
    res.status(400).json({
      success: "false",
      msg: "An error occured while fetching the students ",
      error,
    });
  }
};
