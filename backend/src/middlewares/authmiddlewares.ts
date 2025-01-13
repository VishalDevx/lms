import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface authRequest extends Request {
  user?: { id: string; role: string };
}

export const authMiddleware = (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split("")[1];

  if (!token) {
    return res.status(401).json({ mas: "No Token Authorization Denied" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decode as { id: string; role: string };
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
};
