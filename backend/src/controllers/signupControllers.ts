import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/db"; // Prisma client instance
import { Role } from "@prisma/client";
import { error } from "console";
// Login and Verifications
const secret: string = process.env.JWT_SECRET || "";
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;
  try {
    const existedUser = await prisma.admin.findUnique({
      where: { email },
    });
    if (existedUser) {
      res.status(400).json({
        msg: "Email ID already exist !",
      });
      // Hash the Password

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.admin.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });
      res.status(200).json({
        msg: "User created successfully!",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server errror sign",
      error,
    });
  }
};
