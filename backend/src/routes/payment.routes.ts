import { Router } from "express";

import {
  getPaymentStats,
  initializePayment,
  paystackWebhook,
  verifyPayment,
} from "../controllers/payment.controller";

import {
  protect,
} from "../middleware/auth";

import {
  requireAdmin,
} from "../middleware/admin";

const router = Router();

router.post(
  "/webhook",
  paystackWebhook
);

router.post(
  "/initialize",
  protect,
  initializePayment
);

router.get(
  "/verify/:reference",
  protect,
  verifyPayment
);

router.get(
  "/",
  protect,
  requireAdmin,
  getPaymentStats
);

export default router;
