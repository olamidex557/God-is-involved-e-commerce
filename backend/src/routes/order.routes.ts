import {
  Router,
} from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  trackOrder,
  updateOrderStatus,
} from "../controllers/order.controller";

import {
  protect,
} from "../middleware/auth";

import {
  requireAdmin,
} from "../middleware/admin";
import {
  validateBody,
} from "../middleware/validate";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../validations/order.validation";

const router =
  Router();

/*
|--------------------------------------------------------------------------
| CUSTOMER ROUTES
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  validateBody(
    createOrderSchema
  ),
  createOrder
);

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

router.get(
  "/track/:orderNumber",
  trackOrder
);

router.get(
  "/:id",
  protect,
  getOrderById
);

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  requireAdmin,
  getAllOrders
);

router.patch(
  "/:id/status",
  protect,
  requireAdmin,
  validateBody(
    updateOrderStatusSchema
  ),
  updateOrderStatus
);

export default router;
