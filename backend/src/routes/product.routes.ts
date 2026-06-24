import { Router } from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateProductStock,
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
  productUpdateSchema,
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
    productUpdateSchema
  ),
  updateProduct
);

router.patch(
  "/:id/stock",
  protect,
  requireAdmin,
  updateProductStock
);

router.delete(
  "/:id",
  protect,
  requireAdmin,
  deleteProduct
);

export default router;
