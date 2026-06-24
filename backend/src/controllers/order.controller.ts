import {
  Response,
} from "express";

import Order, {
  OrderItem,
} from "../models/Order";
import Product from "../models/Product";
import User from "../models/User";

import {
  AuthRequest,
} from "../middleware/auth";

import {
  sendTelegramMessage,
} from "../services/telegram.service";

import {
  formatNewOrderAlert,
  formatLowStockAlert,
  formatOutOfStockAlert,
} from "../utils/operationsBot";

const generateOrderNumber =
  () => {
    return `ORD-${Date.now()}`;
  };

interface CreateOrderItemInput {
  productId: string;
  name?: string;
  image?: string;
  color?: string;
  size?: string;
  quantity: number;
}

interface CreateOrderRequestBody {
  items: CreateOrderItemInput[];
  shippingFee?: number;
  shippingAddress: {
    fullName?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
  };
  paymentMethod?: string;
}

export const createOrder =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const {
        items,
        shippingFee,
        shippingAddress,
        paymentMethod,
      } =
        req.body as CreateOrderRequestBody;

      if (
        !Array.isArray(
          items
        ) ||
        items.length === 0
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Order items are required",
          });
      }

      let calculatedSubtotal =
        0;

      const orderItems:
        OrderItem[] =
        [];

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

        const targetColor =
          typeof item.color ===
          "string" &&
          item.color.trim()
            ? item.color.trim()
            : "Default";

        const targetSize =
          typeof item.size ===
          "string" &&
          item.size.trim()
            ? item.size.trim()
            : "Standard";

        if (
          !product.variants ||
          product.variants.length ===
            0
        ) {
          product.variants = [
            {
              color:
                "Default",
              sizes: [
                {
                  size:
                    "Standard",
                  price:
                    product.price ?? 0,
                  stock:
                    product.stock ?? 0,
                  lowStockThreshold:
                    product.lowStockThreshold ??
                    10,
                },
              ],
            },
          ];
        }

        const variant =
          product.variants.find(
            (
              productVariant
            ) =>
              productVariant.color.toLowerCase() ===
              targetColor.toLowerCase()
          );

        const sizeOption =
          variant?.sizes.find(
            (
              productSize
            ) =>
              productSize.size.toLowerCase() ===
              targetSize.toLowerCase()
          );

        if (
          !variant ||
          !sizeOption
        ) {
          return res
            .status(400)
            .json({
              success: false,
              message: `${product.name} is not available in ${targetColor} / ${targetSize}`,
            });
        }

        if (
          sizeOption.stock <= 0
        ) {
          return res
            .status(400)
            .json({
              success: false,
              message: `${product.name} (${targetColor} / ${targetSize}) is out of stock`,
            });
        }

        if (
          sizeOption.stock <
          item.quantity
        ) {
          return res
            .status(400)
            .json({
              success: false,
              message: `Only ${sizeOption.stock} unit(s) of ${product.name} (${targetColor} / ${targetSize}) available`,
            });
        }

        calculatedSubtotal +=
          sizeOption.price *
          item.quantity;

        orderItems.push({
          productId:
            product._id,
          name:
            product.name,
          color:
            variant.color,
          size:
            sizeOption.size,
          price:
            sizeOption.price,
          quantity:
            item.quantity,
          image:
            product.images[0] ||
            item.image ||
            "",
        });
      }

      const safeShippingFee =
        typeof shippingFee ===
        "number"
          ? shippingFee
          : 0;

      const calculatedTotal =
        calculatedSubtotal +
        safeShippingFee;

      const order =
        await Order.create({
          orderNumber:
            generateOrderNumber(),

          user:
            req.userId,

          items:
            orderItems,

          subtotal:
            calculatedSubtotal,

          shippingFee:
            safeShippingFee,

          totalAmount:
            calculatedTotal,

          shippingAddress,

          paymentMethod,

          status:
            "pending",

          paymentStatus:
            "pending",
        });

      for (const item of orderItems) {
        const product =
          await Product.findById(
            item.productId
          );

        if (product) {
          const variant =
            product.variants.find(
              (
                productVariant
              ) =>
                productVariant.color.toLowerCase() ===
                (
                  item.color ??
                  "Default"
                ).toLowerCase()
            );

          const sizeOption =
            variant?.sizes.find(
              (
                productSize
              ) =>
                productSize.size.toLowerCase() ===
                (
                  item.size ??
                  "Standard"
                ).toLowerCase()
            );

          if (!sizeOption) {
            continue;
          }

          sizeOption.stock =
            Math.max(
              0,
              sizeOption.stock -
                item.quantity
            );

          await product.save();

          try {
            if (
              sizeOption.stock === 0
            ) {
              await sendTelegramMessage(
                formatOutOfStockAlert(
                  `${product.name} (${item.color ?? "Default"} / ${item.size ?? "Standard"})`
                )
              );
            } else if (
              sizeOption.stock <=
              sizeOption.lowStockThreshold
            ) {
              await sendTelegramMessage(
                formatLowStockAlert(
                  `${product.name} (${item.color ?? "Default"} / ${item.size ?? "Standard"})`,
                  sizeOption.stock
                )
              );
            }
          } catch (
          error
          ) {
            console.error(
              "Stock alert failed:",
              error
            );
          }
        }
      }

      try {
        const customer =
          await User.findById(
            req.userId
          );

        const customerName =
          customer
            ? `${customer.firstName} ${customer.lastName}`
            : "Unknown Customer";

        await sendTelegramMessage(
          formatNewOrderAlert(
            order.orderNumber,
            customerName,
            order.totalAmount,
            orderItems.map(
              (
                item: OrderItem
              ) => ({
                name:
                  item.name,
                color:
                  item.color,
                size:
                  item.size,
                quantity:
                  item.quantity,
              })
            )
          )
        );
      } catch (
      error
      ) {
        console.error(
          "Telegram alert failed:",
          error
        );
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

export const trackOrder =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const orderNumber =
        String(
          req.params.orderNumber ||
            ""
        )
          .trim()
          .toUpperCase();

      if (!orderNumber) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Order number is required",
          });
      }

      const order =
        await Order.findOne({
          orderNumber,
        }).select(
          "orderNumber paymentStatus status createdAt shippingAddress items totalAmount"
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

      return res.json({
        success: true,
        order,
      });
    } catch (
      error
    ) {
      console.error(
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Failed to track order",
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
