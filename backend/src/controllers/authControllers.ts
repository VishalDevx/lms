import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/db"; // Prisma client instance
import { Role } from "@prisma/client";
import { error } from "console";
// Login and Verifications
const secret: string = process.env.JWT_SECRET || "";
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      res.status(401).json({ msg: "User is not Found!" });
      return;
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401).json({
        msg: " Invalid Credential",
      });
    }
    if (!secret) {
      throw new Error("Jwt secret is not defined");
    }
    const token = jwt.sign({ id: admin.id, Role: admin.role }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Internel Server Error", error);
    res.status(500).json({
      msg: " Error During login ",
      error,
    });
  }
};
export const verifyToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.header("Authorization")?.split("")[1];
  if (!token) {
    res.status(401).json({ msg: "No token Provided" });
    return;
  }
  try {
    const verified = jwt.verify(token, secret!);
    res.status(200).json({
      verified,
    });
  } catch (error) {
    console.error(" Token Verififcation error", error);
    res.status(401).json({
      msg: " Error Occured while trying to verified the token ",
      error,
    });
  }
};

// Sign Up logic

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
