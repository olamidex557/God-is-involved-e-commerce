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

export const getAdminStats = async (
  _req: Request,
  res: Response
) => {
  try {
    const ordersCollection =
      mongoose.connection.collection(
        "orders"
      );

    const [
      totalProducts,
      totalUsers,
      totalQuotations,
      orderStats,
    ] = await Promise.all([
      Product.countDocuments(),
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
                      input: {
                        $ifNull: [
                          "$totalRevenue",
                          {
                            $ifNull: [
                              "$revenue",
                              {
                                $ifNull: [
                                  "$totalAmount",
                                  {
                                    $ifNull: [
                                      "$total",
                                      "$amount",
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      to: "double",
                      onError: 0,
                      onNull: 0,
                    },
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                totalOrders: 1,
                totalRevenue: 1,
              },
            },
          ]
        )
        .toArray(),
    ]);

    const stats =
      orderStats[0] ?? {
        totalOrders: 0,
        totalRevenue: 0,
      };

    res.json({
      totalProducts,
      totalOrders:
        stats.totalOrders,
      totalUsers,
      totalQuotations,
      totalRevenue:
        stats.totalRevenue,
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
