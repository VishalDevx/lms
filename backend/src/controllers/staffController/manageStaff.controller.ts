import { Request, Response } from "express";

import prisma from "../../config/db";
import { staffSchema } from "../../zod/staffSchema";
export const staffAdd = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = staffSchema.parse(req.body);
    const existStaff = await prisma.staff.findUnique({
      where: { email: validatedData.email },
    });
    if (existStaff) {
      res.status(400).json({
        msg: "email is alread exist",
      });
    }
    const staffAdd = await prisma.staff.create({
      data: validatedData,
    });
    res.status(201).json({
      msg: "staff adding successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Some internal Problem is occured when addign the staff!",
    });
  }
};

export const getStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const getStaff = await prisma.staff.findMany();
    res.status(201).json(getStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "error occured the when getting the staff!",
    });
  }
};

export const staffByname = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.params;
    if (!email) {
      res.status(404).json({
        msg: "not found",
      });
    }

    const staff = await prisma.staff.findUnique({
      where: { email },
    });
    res.status(201).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: " internal error",
    });
  }
};

export const updateStaff = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = staffSchema.parse(req.body);
    const existStaff = await prisma.staff.findUnique({
      where: { email: validatedData.email },
    });
    if (!existStaff) {
      res.status(404).json({
        msg: " not exist",
      });
    }
    const update = await prisma.staff.update({
      where: { email: validatedData.email },
      data: validatedData,
    });
    res.status(200).json({
      msg: " staff update successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: " some error occured please try after some time",
    });
  }
};
