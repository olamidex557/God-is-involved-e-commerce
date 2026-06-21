import { Request, Response } from "express";

import Order from "../models/Order";
import Product from "../models/Product";

import {
  sendTelegramMessage,
} from "../services/telegram.service";

import {
  detectIntent,
} from "../utils/telegramIntent";

export const telegramWebhook =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const text =
        req.body?.message?.text;

      if (!text) {
        return res.sendStatus(
          200
        );
      }

      const intent =
        detectIntent(
          text
        );

      let command =
        text.toLowerCase();

      if (
        !command.startsWith(
          "/"
        )
      ) {
        switch (
          intent
        ) {
          case "pending":
            command =
              "/pending";
            break;

          case "revenue":
            command =
              "/revenue";
            break;

          case "stock":
            command =
              "/stock";
            break;

          case "summary":
            command =
              "/summary";
            break;

          case "today":
            command =
              "/today";
            break;

          case "low-stock":
            command =
              "/low-stock";
            break;

          case "top-products":
            command =
              "/top-products";
            break;

          default:
            command =
              "/help";
        }
      }

      switch (
        command
      ) {
        case "/pending": {
          const pending =
            await Order.countDocuments(
              {
                status:
                  "pending",
              }
            );

          await sendTelegramMessage(
            `📦 Pending Orders\n\n${pending}`
          );

          break;
        }

        case "/orders": {
          const orders =
            await Order.countDocuments();

          await sendTelegramMessage(
            `📦 Total Orders\n\n${orders}`
          );

          break;
        }

        case "/stock": {
          const totalProducts =
            await Product.countDocuments();

          const lowStock =
            await Product.countDocuments(
              {
                stock: {
                  $gt: 0,
                  $lte: 10,
                },
              }
            );

          const outOfStock =
            await Product.countDocuments(
              {
                stock: 0,
              }
            );

          await sendTelegramMessage(
            `
📦 INVENTORY SUMMARY

Products:
${totalProducts}

Low Stock:
${lowStock}

Out Of Stock:
${outOfStock}
`
          );

          break;
        }

        case "/revenue": {
          const orders =
            await Order.find();

          const revenue =
            orders.reduce(
              (
                total,
                order
              ) =>
                total +
                order.totalAmount,
              0
            );

          await sendTelegramMessage(
            `
💰 REVENUE

₦${revenue.toLocaleString()}
`
          );

          break;
        }

        case "/summary": {
          const orders =
            await Order.find();

          const revenue =
            orders.reduce(
              (
                total,
                order
              ) =>
                total +
                order.totalAmount,
              0
            );

          const pending =
            await Order.countDocuments(
              {
                status:
                  "pending",
              }
            );

          const processing =
            await Order.countDocuments(
              {
                status:
                  "processing",
              }
            );

          const delivered =
            await Order.countDocuments(
              {
                status:
                  "delivered",
              }
            );

          const totalProducts =
            await Product.countDocuments();

          const lowStock =
            await Product.countDocuments(
              {
                stock: {
                  $gt: 0,
                  $lte: 10,
                },
              }
            );

          const outOfStock =
            await Product.countDocuments(
              {
                stock: 0,
              }
            );

          await sendTelegramMessage(
            `
📊 OPERATIONS SUMMARY

Revenue:
₦${revenue.toLocaleString()}

Orders

Pending:
${pending}

Processing:
${processing}

Delivered:
${delivered}

Inventory

Products:
${totalProducts}

Low Stock:
${lowStock}

Out Of Stock:
${outOfStock}
`
          );

          break;
        }

        case "/low-stock": {
          const products =
            await Product.find(
              {
                stock: {
                  $gt: 0,
                  $lte: 10,
                },
              }
            );

          if (
            products.length ===
            0
          ) {
            await sendTelegramMessage(
              "✅ No low stock products."
            );

            break;
          }

          const message = `
⚠️ LOW STOCK PRODUCTS

${products
  .map(
    (
      product
    ) =>
      `${product.name} - ${product.stock}`
  )
  .join("\n")}
`;

          await sendTelegramMessage(
            message
          );

          break;
        }

        case "/today": {
          const start =
            new Date();

          start.setHours(
            0,
            0,
            0,
            0
          );

          const todayOrders =
            await Order.find(
              {
                createdAt: {
                  $gte:
                    start,
                },
              }
            );

          const revenue =
            todayOrders.reduce(
              (
                total,
                order
              ) =>
                total +
                order.totalAmount,
              0
            );

          await sendTelegramMessage(
            `
📅 TODAY

Orders:
${todayOrders.length}

Revenue:
₦${revenue.toLocaleString()}
`
          );

          break;
        }

        case "/top-products": {
          const products =
            await Product.find()
              .sort({
                stock: 1,
              })
              .limit(
                5
              );

          const message = `
🏆 PRODUCTS NEEDING ATTENTION

${products
  .map(
    (
      product
    ) =>
      `${product.name} (${product.stock})`
  )
  .join("\n")}
`;

          await sendTelegramMessage(
            message
          );

          break;
        }

        default: {
          await sendTelegramMessage(
            `
🤖 GOD IS INVOLVED OPERATIONS BOT

Available Commands

/pending
/orders
/stock
/revenue
/summary
/today
/low-stock
/top-products

You can also ask:

Any pending orders?

Show me low stock items

What is today's revenue?

Give me a summary
`
          );
        }
      }

      res.sendStatus(
        200
      );
    } catch (
      error
    ) {
      console.error(
        error
      );

      res.sendStatus(
        200
      );
    }
  };