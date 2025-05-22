import { Request, Response } from "express";
import prisma from "../config/db";
import { adminSignupInput } from "@vishaldevsx/lms-common";
export const signUp = async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  const result = adminSignupInput.parse(req.body);
};
