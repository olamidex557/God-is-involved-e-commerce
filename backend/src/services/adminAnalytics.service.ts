import Order from "../models/Order";
import Product from "../models/Product";
import {
  getInventoryItems,
} from "../utils/inventory";
import User from "../models/User";
import Quote from "../models/Quote";

interface TrendPoint {
  label: string;
  revenue: number;
  orders: number;
}

interface StatusPoint {
  status: string;
  count: number;
}

const getMonthStart =
  (
    monthOffset: number
  ) => {
    const now =
      new Date();

    return new Date(
      now.getFullYear(),
      now.getMonth() -
        monthOffset,
      1
    );
  };

const getMonthLabel =
  (
    date: Date
  ) =>
    date.toLocaleString(
      "en",
      {
        month:
          "short",
      }
    );

const buildTrend =
  async (): Promise<TrendPoint[]> => {
    const start =
      getMonthStart(
        5
      );

    const rows =
      await Order.aggregate<{
        _id: {
          year: number;
          month: number;
        };
        revenue: number;
        orders: number;
      }>([
        {
          $match: {
            createdAt: {
              $gte:
                start,
            },
          },
        },
        {
          $group: {
            _id: {
              year: {
                $year:
                  "$createdAt",
              },
              month: {
                $month:
                  "$createdAt",
              },
            },
            revenue: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$paymentStatus",
                      "paid",
                    ],
                  },
                  "$totalAmount",
                  0,
                ],
              },
            },
            orders: {
              $sum:
                1,
            },
          },
        },
      ]);

    return Array.from(
      {
        length:
          6,
      },
      (
        _,
        index
      ) => {
        const date =
          getMonthStart(
            5 - index
          );

        const match =
          rows.find(
            (
              row
            ) =>
              row._id.year ===
                date.getFullYear() &&
              row._id.month ===
                date.getMonth() + 1
          );

        return {
          label:
            getMonthLabel(
              date
            ),
          revenue:
            match?.revenue ||
            0,
          orders:
            match?.orders ||
            0,
        };
      }
    );
  };

export const getAdminAnalytics =
  async () => {
    const [
      products,
      totalUsers,
      totalQuotations,
      paidOrders,
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      recentOrders,
      statusDistribution,
      trend,
    ] =
      await Promise.all([
        Product.find(),
        User.countDocuments(),
        Quote.countDocuments(),
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
        Order.countDocuments({
          status:
            "cancelled",
        }),
        Order.find()
          .sort({
            createdAt: -1,
          })
          .limit(10)
          .select(
            "orderNumber status paymentStatus totalAmount createdAt"
          ),
        Order.aggregate<StatusPoint>([
          {
            $group: {
              _id:
                "$status",
              count: {
                $sum:
                  1,
              },
            },
          },
          {
            $project: {
              _id:
                0,
              status:
                "$_id",
              count:
                1,
            },
          },
        ]),
        buildTrend(),
      ]);

    const totalRevenue =
      paidOrders.reduce(
        (
          total,
          order
        ) =>
          total +
          order.totalAmount,
        0
      );

    const inventoryItems =
      getInventoryItems(
        products
      );

    const totalProducts =
      products.length;

    const healthyProducts =
      inventoryItems.filter(
        (
          item
        ) =>
          item.stock >
          item.lowStockThreshold
      ).length;

    const criticalProducts =
      inventoryItems.filter(
        (
          item
        ) =>
          item.stock > 0 &&
          item.stock <=
            item.lowStockThreshold
      ).length;

    const outOfStockProducts =
      inventoryItems.filter(
        (
          item
        ) =>
          item.stock <= 0
      ).length;

    const inventoryValue =
      inventoryItems.reduce(
        (
          total,
          item
        ) =>
          total +
          item.price *
            item.stock,
        0
      );

    const lowStockProducts =
      inventoryItems
        .filter(
          (
            item
          ) =>
            item.stock <=
            item.lowStockThreshold
        )
        .sort(
          (
            a,
            b
          ) =>
            a.stock -
            b.stock
        )
        .slice(
          0,
          10
        );

    return {
      totalProducts,
      totalOrders,
      totalUsers,
      totalQuotations,
      totalRevenue,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      healthyProducts,
      criticalProducts,
      outOfStockProducts,
      inventoryValue,
      lowStockProducts,
      recentOrders,
      revenueTrend:
        trend.map(
          (
            point
          ) => ({
            label:
              point.label,
            value:
              point.revenue,
          })
        ),
      ordersTrend:
        trend.map(
          (
            point
          ) => ({
            label:
              point.label,
            value:
              point.orders,
          })
        ),
      statusDistribution,
    };
  };
