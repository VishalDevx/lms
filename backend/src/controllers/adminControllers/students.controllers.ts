import { Request, Response, NextFunction } from "express";
import prisma from "../../config/db"; // Ensure Prisma is correctly configured
import { addStudentSchema } from "../../middlewares/studentValidation"; // Assuming the path is correct

// Student Validation Middleware
export const studentValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validationResult = addStudentSchema.safeParse(req.body); // Validate the incoming body

    if (!validationResult.success) {
      res.status(400).json({
        msg: "Validation failed",
        errors: validationResult.error.format(),
      });
      return;
    }

    // Attach validated data to req.body for further use
    req.body = validationResult.data.body;

    next();
  } catch (error) {
    console.error("Validation Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Controller to Add Student
export const add_student = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract validated student data from req.body
    const {
      name,
      fatherName,
      motherName,
      gender,
      grade,
      address,
      profilePic,
      rollNumber,
      bloodGroup,
      mobileNumber,
    } = req.body;

    // Create a student in the database
    const newStudent = await prisma.student.create({
      data: {
        name,
        fatherName,
        motherName,
        gender,
        grade,
        address,
        profilePic,
        rollNumber,
        bloodGroup: bloodGroup ?? null, // Optional field, set to null if not provided
        mobileNumber: mobileNumber ?? null, // Optional field, set to null if not provided
      },
    });

    // Respond with success message and created student data
    res.status(201).json({
      msg: "Student created successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
