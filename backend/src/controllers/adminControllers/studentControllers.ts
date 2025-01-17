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
