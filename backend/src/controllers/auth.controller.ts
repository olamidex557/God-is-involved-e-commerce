import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({
        firstName,
        lastName,
        email,
        password:
          hashedPassword,
      });

    res.status(201).json({
      success: true,
      message:
        "Account created successfully",
      user: {
        id: user._id,
        firstName:
          user.firstName,
        lastName:
          user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Server error",
    });
  }
};