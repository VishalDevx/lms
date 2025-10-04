import { Request, Response } from "express";
import prisma from "../../config/db";
import { staffSchema } from "../../zod";

export const staffAdd = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = staffSchema.parse(req.body);

    const existStaff = await prisma.staff.findUnique({
      where: { email: validatedData.email },
    });
    if (existStaff) {
      res.status(400).json({ msg: "Email already exists" });
      return;
    }

    const staffAdd = await prisma.staff.create({
      data: validatedData,
    });

    res.status(201).json({ msg: "Staff added successfully", staffAdd });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error while adding staff" });
  }
};

export const getStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const staffList = await prisma.staff.findMany();

    if (staffList.length === 0) {
      res.status(200).json({ msg: "No staff registered yet" });
      return;
    }

    res.status(200).json(staffList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching staff" });
  }
};

export const staffByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;

    if (!email) {
      res.status(400).json({ msg: "Email parameter is required" });
      return;
    }

    const staff = await prisma.staff.findUnique({ where: { email } });

    if (!staff) {
      res.status(404).json({ msg: "Staff not found" });
      return;
    }

    res.status(200).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    const validatedData = staffSchema.partial().parse(req.body); // partial allows updating some fields

    const existStaff = await prisma.staff.findUnique({ where: { email } });

    if (!existStaff) {
      res.status(404).json({ msg: "Staff not found" });
      return;
    }

    const updatedStaff = await prisma.staff.update({
      where: { email },
      data: validatedData,
    });

    res.status(200).json({ msg: "Staff updated successfully", updatedStaff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating staff" });
  }
};
