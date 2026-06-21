import { Request, Response } from "express";

import Order from "../models/Order";
import User from "../models/User";

export const getPaymentStats =
  async (
    _req: Request,
    res: Response
  ) => {
    try {
      const orders =
        await Order.find({
          paymentStatus:
            "paid",
        }).sort({
          createdAt: -1,
        });

      const totalRevenue =
        orders.reduce(
          (
            total,
            order
          ) =>
            total +
            order.totalAmount,
          0
        );

      const averageOrderValue =
        orders.length
          ? totalRevenue /
            orders.length
          : 0;

      const users =
        await User.find();

      const topCustomers =
        await Promise.all(
          users.map(
            async (
              user
            ) => {
              const customerOrders =
                orders.filter(
                  (
                    order
                  ) =>
                    String(
                      order.user
                    ) ===
                    String(
                      user._id
                    )
                );

              return {
                name:
                  `${user.firstName} ${user.lastName}`,

                email:
                  user.email,

                orders:
                  customerOrders.length,

                totalSpent:
                  customerOrders.reduce(
                    (
                      total,
                      order
                    ) =>
                      total +
                      order.totalAmount,
                    0
                  ),
              };
            }
          )
        );

      const recentTransactions =
        await Promise.all(
          orders
            .slice(
              0,
              20
            )
            .map(
              async (
                order
              ) => {
                const user =
                  await User.findById(
                    order.user
                  );

                return {
                  ...order.toObject(),

                  customer:
                    user
                      ? `${user.firstName} ${user.lastName}`
                      : "Unknown",
                };
              }
            )
        );

      res.json({
        totalRevenue,

        totalTransactions:
          orders.length,

        averageOrderValue,

        topCustomers:
          topCustomers
            .filter(
              (
                customer
              ) =>
                customer.totalSpent >
                0
            )
            .sort(
              (
                a,
                b
              ) =>
                b.totalSpent -
                a.totalSpent
            )
            .slice(
              0,
              10
            ),

        recentTransactions,
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
          "Failed to load payment statistics",
      });
    }
  };