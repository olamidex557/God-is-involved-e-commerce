import {
  Request,
  Response,
} from "express";

import Order from "../models/Order";
import User from "../models/User";
import {
  AuthRequest,
} from "../middleware/auth";
import {
  initializePaystackPayment,
  processPaystackWebhook,
  verifyPaystackPayment,
  verifyPaystackSignature,
} from "../services/payment.service";

interface RawBodyRequest extends Request {
  rawBody?: Buffer;
}

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

export const initializePayment =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      if (!req.userId) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "Unauthorized",
          });
      }

      const orderId =
        String(
          req.body.orderId || ""
        );

      if (!orderId) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Order ID is required",
          });
      }

      const payment =
        await initializePaystackPayment(
          orderId,
          req.userId
        );

      return res.json({
        success: true,
        payment,
      });
    } catch (
      error
    ) {
      console.error(
        "Payment initialization failed:",
        error
      );

      return res
        .status(400)
        .json({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Payment initialization failed",
        });
    }
  };

export const verifyPayment =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const reference =
        String(
          req.params.reference
        );

      const result =
        await verifyPaystackPayment(
          reference,
          req.userId
        );

      return res.json({
        success:
          result.success,
        message:
          result.message,
        order:
          result.order,
      });
    } catch (
      error
    ) {
      console.error(
        "Payment verification failed:",
        error
      );

      return res
        .status(400)
        .json({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Payment verification failed",
        });
    }
  };

export const paystackWebhook =
  async (
    req: RawBodyRequest,
    res: Response
  ) => {
    try {
      const rawBody =
        req.rawBody ||
        Buffer.from(
          JSON.stringify(
            req.body
          )
        );

      const signature =
        req.headers[
          "x-paystack-signature"
        ];

      const isValid =
        verifyPaystackSignature(
          rawBody,
          Array.isArray(
            signature
          )
            ? signature[0]
            : signature
        );

      if (!isValid) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "Invalid Paystack signature",
          });
      }

      const payload =
        req.body;

      const result =
        await processPaystackWebhook(
          payload
        );

      return res.json({
        success: true,
        ...result,
      });
    } catch (
      error
    ) {
      console.error(
        "Paystack webhook failed:",
        error
      );

      return res
        .status(200)
        .json({
          success: false,
        });
    }
  };
