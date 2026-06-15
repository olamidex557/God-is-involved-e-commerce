import {
    Response,
} from "express";

import Order from "../models/Order";

import {
    AuthRequest,
} from "../middleware/auth";

const generateOrderNumber =
    () => {
        return `ORD-${Date.now()}`;
    };

export const createOrder =
    async (
        req: AuthRequest,
        res: Response
    ) => {
        try {
            const {
                items,
                subtotal,
                shippingFee,
                totalAmount,
                shippingAddress,
                paymentMethod,
            } = req.body;

            const order =
                await Order.create({
                    orderNumber:
                        generateOrderNumber(),

                    user:
                        req.userId,

                    items,

                    subtotal,

                    shippingFee,

                    totalAmount,

                    shippingAddress,

                    paymentMethod,

                    status:
                        "pending",

                    paymentStatus:
                        "pending",
                });

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
                })
                    .sort({
                        createdAt:
                            -1,
                    });

            res.json({
                success: true,
                orders,
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

            if (
                !order
            ) {
                return res
                    .status(404)
                    .json({
                        success:
                            false,
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
            console.error(
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to fetch order",
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
                        createdAt:
                            -1,
                    });

            res.json({
                success: true,
                orders,
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
                            req.body
                                .status,
                    },
                    {
                        new: true,
                    }
                );

            if (
                !order
            ) {
                return res
                    .status(404)
                    .json({
                        success:
                            false,
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
            console.error(
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to update order",
            });
        }
    };