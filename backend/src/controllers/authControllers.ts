import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/db";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.admin.findUnique({ where: { email } }); // Adjust model based on your schema
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const verifyToken = (req: Request, res: Response) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    res.json({ verified });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
