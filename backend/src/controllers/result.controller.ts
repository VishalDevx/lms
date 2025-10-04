import { Request, Response } from "express";
import prisma from "../config/db";
import { resultSchema } from "../zod";

// ------------------------
// Upload Result (Class Teacher)
// ------------------------
export const uploadResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = resultSchema.parse(req.body);

    // Ensure student exists
    const student = await prisma.student.findUnique({
      where: { id: validatedData.studentId },
    });
    if (!student) {
      res.status(404).json({ msg: "Student not found" });
      return;
    }

    // Ensure teacher exists
    const teacher = await prisma.classTeacher.findUnique({
      where: { id: validatedData.classTeacherId },
    });
    if (!teacher) {
      res.status(404).json({ msg: "Class teacher not found" });
      return;
    }

    // Ensure teacher grade matches student grade
    if (teacher.grade !== student.grade) {
      res.status(403).json({ msg: "Teacher not authorized for this student's grade" });
      return;
    }

    // Ensure exam exists
    const exam = await prisma.exam.findUnique({
      where: { id: validatedData.examId },
    });
    if (!exam) {
      res.status(404).json({ msg: "Exam not found" });
      return;
    }

    const result = await prisma.result.create({
      data: {
        studentId: validatedData.studentId,
        classTeacherId: validatedData.classTeacherId,
        examId: validatedData.examId,
        subject: validatedData.subject,
        marksObtained: validatedData.marksObtained,
        totalMarks: validatedData.totalMarks,
        examType: validatedData.examType,
        remarks: validatedData.remarks,
        date: validatedData.date || new Date(),
      },
      include: {
        student: true,
        classTeacher: { include: { staff: true } },
        exam: true,
      },
    });

    res.status(201).json({ msg: "Result uploaded successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error uploading result" });
  }
};

// ------------------------
// Get All Results
// ------------------------
export const getAllResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await prisma.result.findMany({
      include: {
        student: true,
        classTeacher: { include: { staff: true } },
        exam: true,
      },
    });

    if (results.length === 0) {
      res.status(404).json({ msg: "No results found" });
      return;
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching results" });
  }
};

// ------------------------
// Get Results by Student
// ------------------------
export const getResultsByStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;

    const results = await prisma.result.findMany({
      where: { studentId: Number(studentId) },
      include: {
        student: true,
        classTeacher: { include: { staff: true } },
        exam: true,
      },
    });

    if (results.length === 0) {
      res.status(404).json({ msg: "No results found for this student" });
      return;
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching results by student" });
  }
};

// ------------------------
// Get Results by Grade
// ------------------------
export const getResultsByGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { grade } = req.params;

    const results = await prisma.result.findMany({
      where: {
        student: { grade: grade as any }, // cast to Grade enum
      },
      include: {
        student: true,
        classTeacher: { include: { staff: true } },
        exam: true,
      },
    });

    if (results.length === 0) {
      res.status(404).json({ msg: "No results found for this grade" });
      return;
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching results by grade" });
  }
};

// ------------------------
// Update Result
// ------------------------
export const updateResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = resultSchema.partial().parse(req.body);

    const exist = await prisma.result.findUnique({ where: { id: Number(id) } });
    if (!exist) {
      res.status(404).json({ msg: "Result not found" });
      return;
    }

    const updated = await prisma.result.update({
      where: { id: Number(id) },
      data: validatedData,
      include: {
        student: true,
        classTeacher: { include: { staff: true } },
        exam: true,
      },
    });

    res.status(200).json({ msg: "Result updated successfully", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating result" });
  }
};

// ------------------------
// Delete Result
// ------------------------
export const deleteResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const exist = await prisma.result.findUnique({ where: { id: Number(id) } });
    if (!exist) {
      res.status(404).json({ msg: "Result not found" });
      return;
    }

    await prisma.result.delete({ where: { id: Number(id) } });

    res.status(200).json({ msg: "Result deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error deleting result" });
  }
};
