import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../config/db"; // Prisma client instance
import { Role } from "@prisma/client";
import { error } from "console";
// Login and Verifications
const secret: string = process.env.JWT_SECRET || "";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, Role } = req.body;
    const hasedPassword = await bcrypt.hash(password, 6);
    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hasedPassword,
        role: Role,
      },
    });
    res.status(200).json({ msg: "User created successfully!", admin });
  } catch (error) {
    res.status(500).json({
      msg: " Internal Server Error!",
      error,
    });
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      res.status(401).json({ msg: "Invalid Credentials" });
      return;
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      res.status(403).json({ msg: "Invalid Password, try again" });
      return;
    }

    // Generate the JWT token
    const token = jwt.sign({ userId: admin.id }, secret!, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, admin });
  } catch (error) {
    res.status(500).json({ msg: "Login Failed!" });
  }
};
