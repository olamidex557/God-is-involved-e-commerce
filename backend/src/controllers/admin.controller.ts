import { Request, Response } from "express";
import mongoose from "mongoose";

import Product from "../models/Product";
import User from "../models/User";
import Order from "../models/Order";

export const getAdminStats = async (
  _req: Request,
  res: Response
) => {
  try {
    const [
      totalProducts,
      totalUsers,
      totalOrders,

      totalRevenue,

      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,

      lowStockProducts,

      recentOrders,
    ] = await Promise.all([
      Product.countDocuments(),

      User.countDocuments(),

      Order.countDocuments(),

      Order.aggregate([
        {
          $group: {
            _id: null,
            revenue: {
              $sum:
                "$totalAmount",
            },
          },
        },
      ]),

      Order.countDocuments({
        status:
          "pending",
      }),

      Order.countDocuments({
        status:
          "processing",
      }),

      Order.countDocuments({
        status:
          "shipped",
      }),

      Order.countDocuments({
        status:
          "delivered",
      }),

      Product.find({
        stock: {
          $lte: 10,
        },
      })
        .sort({
          stock: 1,
        })
        .limit(10),

      Order.find()
        .sort({
          createdAt: -1,
        })
        .limit(10)
        .select(
          "orderNumber totalAmount status createdAt"
        ),
    ]);

    const revenue =
      totalRevenue[0]
        ?.revenue || 0;

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,

      totalRevenue:
        revenue,

      totalQuotations: 0,

      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,

      lowStockProducts,

      recentOrders,
    });
  } catch (error) {
    console.error(
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to load dashboard statistics",
    });
  }
};