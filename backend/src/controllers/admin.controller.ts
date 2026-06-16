import { Request, Response } from "express";
import mongoose from "mongoose";

import Product from "../models/Product";
import User from "../models/User";

type RevenueAggregationResult = {
  totalOrders: number;
  totalRevenue: number;
};

const getCollectionCount = async (
  collectionName: string
) => {
  const collections =
    await mongoose.connection.db
      ?.listCollections({
        name: collectionName,
      })
      .toArray();

  if (!collections?.length) {
    return 0;
  }

  return mongoose.connection
    .collection(collectionName)
    .countDocuments();
};

export const getAdminStats =
  async (
    _req: Request,
    res: Response
  ) => {
    try {
      const ordersCollection =
        mongoose.connection.collection(
          "orders"
        );

      const [
        products,
        totalUsers,
        totalQuotations,
        orderStats,
        recentOrders,
      ] = await Promise.all([
        Product.find(),

        User.countDocuments(),

        getCollectionCount(
          "quotes"
        ),

        ordersCollection
          .aggregate<RevenueAggregationResult>(
            [
              {
                $group: {
                  _id: null,

                  totalOrders: {
                    $sum: 1,
                  },

                  totalRevenue: {
                    $sum: {
                      $convert: {
                        input:
                          "$totalAmount",
                        to: "double",
                        onError: 0,
                        onNull: 0,
                      },
                    },
                  },
                },
              },
            ]
          )
          .toArray(),

        ordersCollection
          .find({})
          .sort({
            createdAt: -1,
          })
          .limit(10)
          .toArray(),
      ]);

      const stats =
        orderStats[0] ?? {
          totalOrders: 0,
          totalRevenue: 0,
        };

      const pendingOrders =
        await ordersCollection.countDocuments(
          {
            status:
              "pending",
          }
        );

      const processingOrders =
        await ordersCollection.countDocuments(
          {
            status:
              "processing",
          }
        );

      const shippedOrders =
        await ordersCollection.countDocuments(
          {
            status:
              "shipped",
          }
        );

      const deliveredOrders =
        await ordersCollection.countDocuments(
          {
            status:
              "delivered",
          }
        );

      const totalProducts =
        products.length;

      const healthyProducts =
        products.filter(
          (product) =>
            product.stock > 20
        ).length;

      const criticalProducts =
        products.filter(
          (product) =>
            product.stock > 0 &&
            product.stock <= 5
        ).length;

      const outOfStockProducts =
        products.filter(
          (product) =>
            product.stock === 0
        ).length;

      const inventoryValue =
        products.reduce(
          (
            total,
            product
          ) =>
            total +
            product.price *
              product.stock,
          0
        );

      const lowStockProducts =
        products
          .filter(
            (product) =>
              product.stock <= 20
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

      res.json({
        totalProducts,

        totalOrders:
          stats.totalOrders,

        totalUsers,

        totalQuotations,

        totalRevenue:
          stats.totalRevenue,

        pendingOrders,

        processingOrders,

        shippedOrders,

        deliveredOrders,

        healthyProducts,

        criticalProducts,

        outOfStockProducts,

        inventoryValue,

        lowStockProducts,

        recentOrders,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to load dashboard statistics",
      });
    }
  };