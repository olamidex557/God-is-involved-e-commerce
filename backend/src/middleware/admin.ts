import {
  Response,
  NextFunction,
} from "express";

import User from "../models/User";
import {
  AuthRequest,
} from "./auth";

export const requireAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user =
      await User.findById(
        req.userId
      ).select("role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to verify admin access",
    });
  }
};
