import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user.model";
import { generateTokenAndStore } from "../utils/generateTokenAndStore";
import Admin from "../models/admin.model";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    console.log({ name, email, password });

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateTokenAndStore(res, newUser);

    res
      .status(201)
      .json({ message: "User registered successfully", newUser, token });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error, errorMessage: error.message });
    return;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateTokenAndStore(res, user);

    res.status(200).json({ token, user });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error, errorMessage: error.message });
    return;
  }
};

export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const userExists = await Admin.findOne({ email: email.toLowerCase() });
    if (userExists) {
      res.status(400).json({ message: "Admin already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Admin({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateTokenAndStore(res, newUser);

    res
      .status(201)
      .json({ message: "Admin registered successfully", newUser, token });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error, errorMessage: error.message });
    return;
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email: email.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateTokenAndStore(res, user);

    res.status(200).json({ token, user });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error, errorMessage: error.message });
    return;
  }
};

export const logOut = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("ecommersToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error, errorMessage: error.message });
    return;
  }
};
