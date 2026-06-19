import { Request, Response } from "express";

import User from "../models/User";
import Order from "../models/Order";

export const getActivity = async (
  _req: Request,
  res: Response
) => {
  try {
    const [
      recentUsers,
      recentOrders,
    ] = await Promise.all([
      User.find()
        .sort({
          createdAt: -1,
        })
        .limit(10),

      Order.find()
        .sort({
          createdAt: -1,
        })
        .limit(10),
    ]);

    const activities = [
      ...recentUsers.map(
        (user) => ({
          type: "user",
          title: `${user.firstName} ${user.lastName} registered`,
          date: user.createdAt,
        })
      ),

      ...recentOrders.map(
        (order) => ({
          type: "order",
          title: `New order ${order.orderNumber}`,
          date: order.createdAt,
        })
      ),
    ]
      .sort(
        (a, b) =>
          new Date(
            b.date
          ).getTime() -
          new Date(
            a.date
          ).getTime()
      )
      .slice(0, 20);

    res.json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch activity",
    });
  }
};