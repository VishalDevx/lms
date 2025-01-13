import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "rgdSchool";
const generateToken = (userId: number, role: string) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: "1h" });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role, name, grade } = req.body;
    if (!email || !password || !role) {
      return res
        .status(401)
        .json({ success: false, msg: " All field are required" });
    }
  } catch (error) {}
};
