import { Router } from "express";

import {
  getAdminStats,
} from "../controllers/admin.controller";
import {
  protect,
} from "../middleware/auth";
import {
  requireAdmin,
} from "../middleware/admin";

const router = Router();

router.use(
  protect,
  requireAdmin
);

router.get(
  "/stats",
  getAdminStats
);

export default router;
