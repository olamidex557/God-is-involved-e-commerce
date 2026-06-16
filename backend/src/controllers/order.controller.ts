import {
  Response,
} from "express";

import Order from "../models/Order";
import Product from "../models/Product";

import {
  AuthRequest,
} from "../middleware/auth";

const generateOrderNumber =
  () => {
    return `ORD-${Date.now()}`;
  };

export const createOrder =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const {
        items,
        subtotal,
        shippingFee,
        totalAmount,
        shippingAddress,
        paymentMethod,
      } = req.body;

      for (const item of items) {
        const product =
          await Product.findById(
            item.productId
          );

        if (!product) {
          return res
            .status(404)
            .json({
              success: false,
              message: `${item.name} not found`,
            });
        }

        if (
          product.stock <= 0
        ) {
          return res
            .status(400)
            .json({
              success: false,
              message: `${product.name} is out of stock`,
            });
        }

        if (
          product.stock <
          item.quantity
        ) {
          return res
            .status(400)
            .json({
              success: false,
              message: `Only ${product.stock} unit(s) of ${product.name} available`,
            });
        }
      }

      const order =
        await Order.create({
          orderNumber:
            generateOrderNumber(),

          user:
            req.userId,

          items,

          subtotal,

          shippingFee,

          totalAmount,

          shippingAddress,

          paymentMethod,

          status:
            "pending",

          paymentStatus:
            "pending",
        });

      for (const item of items) {
        const product =
          await Product.findById(
            item.productId
          );

        if (product) {
          product.stock =
            product.stock -
            item.quantity;

          product.inStock =
            product.stock > 0;

          await product.save();
        }
      }

      res.status(201).json({
        success: true,
        order,
      });
    } catch (
      error
    ) {
      console.error(
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to create order",
      });
    }
  };

export const getMyOrders =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const orders =
        await Order.find({
          user:
            req.userId,
        }).sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        orders,
      });
    } catch (
      error
    ) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch orders",
      });
    }
  };

export const getOrderById =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Order not found",
          });
      }

      res.json({
        success: true,
        order,
      });
    } catch (
      error
    ) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch order",
      });
    }
  };

export const getAllOrders =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const orders =
        await Order.find()
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        orders,
      });
    } catch (
      error
    ) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch orders",
      });
    }
  };

export const updateOrderStatus =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
          }
        );

      if (!order) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Order not found",
          });
      }

      res.json({
        success: true,
        order,
      });
    } catch (
      error
    ) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to update order",
      });
    }
  };