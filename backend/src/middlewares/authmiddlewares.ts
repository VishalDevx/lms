import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET || "";

if (!secret) {
  throw new Error("JWT_SECRET environment variable is not defined.");
}
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token is not provided" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid Token or Expired Token" });
  }
};
