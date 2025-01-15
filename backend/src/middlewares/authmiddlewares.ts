import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET || "";

if (!secret) {
  throw new Error("JWT_SECRET environment is not defined ");
}

export const authenicate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.split("")[1];
  if (!token) {
    return res.status(404).json({
      msg: " token is not provided",
    });
  }
  try {
    const decoded = jwt.verify(token, secret);
    (req as any).admin = decoded;
    next();
  } catch (error) {
    res.status(404).json({
      msg: "Invalide Token or Expired token",
    });
  }
};
