import Order from "../models/Order";
import Product from "../models/Product";
import {
  sendTelegramMessage,
} from "./telegram.service";

const formatCurrency =
  (
    amount: number
  ) =>
    `₦${amount.toLocaleString()}`;

export interface OperationsReport {
  revenue: number;
  orders: number;
  pending: number;
  delivered: number;
  lowStock: number;
  outOfStock: number;
}

export const getOperationsReport =
  async (): Promise<OperationsReport> => {
    const [
      paidOrders,
      orders,
      pending,
      delivered,
      lowStock,
      outOfStock,
    ] =
      await Promise.all([
        Order.find({
          paymentStatus:
            "paid",
        }).select("totalAmount"),
        Order.countDocuments(),
        Order.countDocuments({
          status:
            "pending",
        }),
        Order.countDocuments({
          status:
            "delivered",
        }),
        Product.countDocuments({
          stock: {
            $gt: 0,
          },
          $expr: {
            $lte: [
              "$stock",
              "$lowStockThreshold",
            ],
          },
        }),
        Product.countDocuments({
          stock: {
            $lte: 0,
          },
        }),
      ]);

    const revenue =
      paidOrders.reduce(
        (
          total,
          order
        ) =>
          total +
          order.totalAmount,
        0
      );

    return {
      revenue,
      orders,
      pending,
      delivered,
      lowStock,
      outOfStock,
    };
  };

export const formatDailyOperationsReport =
  (
    report: OperationsReport
  ) => `
📊 DAILY OPERATIONS REPORT

Revenue:
${formatCurrency(report.revenue)}

Orders:
${report.orders}

Pending:
${report.pending}

Delivered:
${report.delivered}

Low Stock:
${report.lowStock}

Out Of Stock:
${report.outOfStock}
`;

export const buildDailyOperationsReportMessage =
  async () =>
    formatDailyOperationsReport(
      await getOperationsReport()
    );

export const sendDailyOperationsReport =
  async () =>
    sendTelegramMessage(
      await buildDailyOperationsReportMessage()
    );
