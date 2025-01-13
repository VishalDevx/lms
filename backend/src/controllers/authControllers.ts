import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/db"; // Prisma client instance

/**
 * Login Controller
 * Authenticates a user (admin in this case) and generates a JWT token.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Fetch the user from the database
    const user = await prisma.admin.findUnique({ where: { email } });

    // If user is not found
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the provided password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" } // Token expiration
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Verify Token Controller
 * Verifies the validity of a JWT token.
 */
export const verifyToken = (req: Request, res: Response): void => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract the token from the Authorization header

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    res.status(200).json({ verified });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
