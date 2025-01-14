import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET || "";
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ msg: "Token is not Provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, secret!);
    (req as any).admin = decoded;
    next();
  } catch (error) {
    res.status(500).json({ msg: " Ivalide token" });
  }
};

export const authorize =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Access forbidden" });
    }
    next();
  };
