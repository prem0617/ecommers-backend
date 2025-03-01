import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.ecommersToken;

  if (!token) {
    res.status(401).json({ message: "User is not Authenticated" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
    return;
  }
};

export const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Admin Access Required" });
    return;
  }
  next();
};
