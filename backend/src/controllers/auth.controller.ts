import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import { AuthRequest } from "../middleware/auth";

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
                message: "User already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user =
            await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid credentials",
            });
        }

        const validPassword =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid credentials",
            });
        }

        const token =
            generateToken(
                user._id.toString()
            );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const getMe = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user =
      await User.findById(
        req.userId
      ).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};