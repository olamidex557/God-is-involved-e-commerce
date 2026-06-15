import { Router } from "express";

import {
  register,
  login,
  getMe,
  verifyOTP,
  resendOTP,
} from "../controllers/auth.controller";

import {
  protect,
} from "../middleware/auth";

const router = Router();

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.post(
  "/verify-otp",
  verifyOTP
);

router.post(
  "/resend-otp",
  resendOTP
);

router.get(
  "/me",
  protect,
  getMe
);

export default router;