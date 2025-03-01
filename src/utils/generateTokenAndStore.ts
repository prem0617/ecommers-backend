import { Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/auth.types";

export function generateTokenAndStore(res: Response, user: User) {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  res.cookie("ecommersToken", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day
  });

  return token;
}
