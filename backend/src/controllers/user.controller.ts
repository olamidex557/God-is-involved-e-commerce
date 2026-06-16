import { Request, Response } from "express";

import User from "../models/User";
import Order from "../models/Order";

export const getUsers = async (
  _req: Request,
  res: Response
) => {
  try {
    const users =
      await User.find()
        .select("-password")
        .sort({
          createdAt: -1,
        });

    const usersWithStats =
      await Promise.all(
        users.map(
          async (user) => {
            const orders =
              await Order.find({
                user: user._id,
              });

            const totalSpent =
              orders.reduce(
                (
                  total,
                  order
                ) =>
                  total +
                  order.totalAmount,
                0
              );

            return {
              ...user.toObject(),

              totalOrders:
                orders.length,

              totalSpent,
            };
          }
        )
      );

    res.json({
      success: true,
      users:
        usersWithStats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch users",
    });
  }
};