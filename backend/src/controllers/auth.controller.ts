import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";

import User from "../models/User";

import { generateToken } from "../utils/generateToken";

import { AuthRequest } from "../middleware/auth";

import {
  sendOTPEmail,
  sendResetPasswordEmail,
} from "../services/email.service";

const generateOTP = () => {
  return Math.floor(
    100000 +
      Math.random() * 900000
  ).toString();
};

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
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const otp =
      generateOTP();

    const otpExpiresAt =
      new Date(
        Date.now() +
          10 * 60 * 1000
      );

    const user =
      await User.create({
        firstName,
        lastName,
        email,
        password:
          hashedPassword,

        verified: false,

        otp,

        otpExpiresAt,
      });

    await sendOTPEmail(
      email,
      otp
    );

    res.status(201).json({
      success: true,
      message:
        "Account created. Please verify your email.",
      email:
        user.email,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};

export const verifyOTP =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        email,
        otp,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "User not found",
          });
      }

      if (
        user.verified
      ) {
        return res.json({
          success: true,
          message:
            "Account already verified",
        });
      }

      if (
        user.otp !== otp
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Invalid OTP",
          });
      }

      if (
        !user.otpExpiresAt ||
        user.otpExpiresAt <
          new Date()
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "OTP expired",
          });
      }

      user.verified =
        true;

      user.otp = null;

      user.otpExpiresAt =
        null;

      await user.save();

      res.json({
        success: true,
        message:
          "Email verified successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

export const resendOTP =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        email,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "User not found",
          });
      }

      const otp =
        generateOTP();

      user.otp = otp;

      user.otpExpiresAt =
        new Date(
          Date.now() +
            10 *
              60 *
              1000
        );

      await user.save();

      await sendOTPEmail(
        email,
        otp
      );

      res.json({
        success: true,
        message:
          "OTP sent successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };


  export const forgotPassword =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        email,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.json({
          success: true,
          message:
            "If the account exists, a reset link has been sent.",
        });
      }

      const token =
        crypto
          .randomBytes(32)
          .toString("hex");

      user.resetPasswordToken =
        token;

      user.resetPasswordExpiresAt =
        new Date(
          Date.now() +
            30 *
              60 *
              1000
        );

      await user.save();

      await sendResetPasswordEmail(
        email,
        token
      );

      res.json({
        success: true,
        message:
          "Password reset email sent.",
      });
    } catch (error) {
      console.error(
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to process request",
      });
    }
  };


  export const resetPassword =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        token,
        password,
      } = req.body;

      const user =
        await User.findOne({
          resetPasswordToken:
            token,
        });

      if (!user) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Invalid reset token",
          });
      }

      if (
        !user
          .resetPasswordExpiresAt ||
        user
          .resetPasswordExpiresAt <
          new Date()
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Reset token expired",
          });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      user.password =
        hashedPassword;

      user.resetPasswordToken =
        null;

      user.resetPasswordExpiresAt =
        null;

      await user.save();

      res.json({
        success: true,
        message:
          "Password reset successfully",
      });
    } catch (error) {
      console.error(
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to reset password",
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
      await User.findOne({
        email,
      });

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

    if (
      !validPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    if (
      !user.verified
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Please verify your email first",
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
        firstName:
          user.firstName,
        lastName:
          user.lastName,
        email:
          user.email,
        role:
          user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
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
      ).select(
        "-password"
      );

    res.json({
      success: true,
      user,
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};