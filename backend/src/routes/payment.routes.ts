import { Router } from "express";

import {
  getPaymentStats,
} from "../controllers/payment.controller";

import {
  protect,
} from "../middleware/auth";

import {
  requireAdmin,
} from "../middleware/admin";

const router = Router();

router.get(
  "/",
  protect,
  requireAdmin,
  getPaymentStats
);

export default router;