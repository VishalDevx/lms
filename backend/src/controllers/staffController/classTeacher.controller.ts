import { Request, Response } from "express";
import prisma from "../../config/db";
import { classTeacherSchema } from "../../zod";

// ------------------------
// Assign Class Teacher
// ------------------------
export const assignClassTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = classTeacherSchema.parse(req.body);

    // Ensure staff exists
    const staff = await prisma.staff.findUnique({
      where: { id: validatedData.staffId },
    });
    if (!staff) {
      res.status(404).json({ msg: "Staff not found" });
      return;
    }

    // Check if grade already has a class teacher
    const exist = await prisma.classTeacher.findUnique({
      where: { grade: validatedData.grade },
    });
    if (exist) {
      res.status(400).json({ msg: "This grade already has a class teacher assigned" });
      return;
    }

    const classTeacher = await prisma.classTeacher.create({
      data: validatedData,
    });

    res.status(201).json({
      msg: "Class teacher assigned successfully",
      classTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error assigning class teacher" });
  }
};

// ------------------------
// Get All Class Teachers
// ------------------------
export const getClassTeachers = async (req: Request, res: Response): Promise<void> => {
  try {
    const teachers = await prisma.classTeacher.findMany({
      include: { staff: true },
    });

    if (teachers.length === 0) {
      res.status(404).json({ msg: "No class teachers found" });
      return;
    }

    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching class teachers" });
  }
};

// ------------------------
// Get Class Teacher by Grade
// ------------------------
export const getClassTeacherByGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { grade } = req.params;

    const teacher = await prisma.classTeacher.findUnique({
      where: { grade: grade as any },
      include: { staff: true },
    });

    if (!teacher) {
      res.status(404).json({ msg: "No class teacher found for this grade" });
      return;
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching class teacher by grade" });
  }
};

// ------------------------
// Update Class Teacher (change assigned staff)
// ------------------------
export const updateClassTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const { grade } = req.params;
    const { staffId } = req.body;

    // Validate new staff exists
    const staff = await prisma.staff.findUnique({ where: { id: staffId } });
    if (!staff) {
      res.status(404).json({ msg: "Staff not found" });
      return;
    }

    const updated = await prisma.classTeacher.update({
      where: { grade: grade as any },
      data: { staffId },
    });

    res.status(200).json({
      msg: "Class teacher updated successfully",
      updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating class teacher" });
  }
};

// ------------------------
// Remove Class Teacher
// ------------------------
export const removeClassTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const { grade } = req.params;

    const teacher = await prisma.classTeacher.findUnique({
      where: { grade: grade as any },
    });

    if (!teacher) {
      res.status(404).json({ msg: "Class teacher not found for this grade" });
      return;
    }

    await prisma.classTeacher.delete({
      where: { grade: grade as any },
    });

    res.status(200).json({ msg: "Class teacher removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error removing class teacher" });
  }
};
