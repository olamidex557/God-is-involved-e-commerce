import { Router } from "express";

import {
  getUsers,
} from "../controllers/user.controller";

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
  getUsers
);

export default router;