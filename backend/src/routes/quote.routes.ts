import { Router } from "express";

import {
  createQuote,
  getQuotes,
} from "../controllers/quote.controller";

import {
  protect,
} from "../middleware/auth";

import {
  requireAdmin,
} from "../middleware/admin";

const router = Router();

router.post(
  "/",
  createQuote
);

router.get(
  "/",
  protect,
  requireAdmin,
  getQuotes
);

export default router;