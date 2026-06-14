import { Router } from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
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
  productSchema,
} from "../validations/product.validation";

const router = Router();

router.get(
  "/",
  getProducts
);

router.get(
  "/:id",
  getProductById
);

router.post(
  "/",
  protect,
  requireAdmin,
  validateBody(
    productSchema
  ),
  createProduct
);

router.put(
  "/:id",
  protect,
  requireAdmin,
  validateBody(
    productSchema
  ),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  requireAdmin,
  deleteProduct
);

export default router;
