import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/db"; // Prisma client instance
import { Role } from "@prisma/client";

const secret: string = process.env.JWT_SECRET || "";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      res.status(401).json({ msg: "User not found!" });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      res.status(401).json({ msg: "Invalid Credentials!" });
      return;
    }

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ id: admin.id, Role: admin.role }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      msg: "Internal Server error",
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
