import mongoose from "mongoose";

const orderItemSchema =
    new mongoose.Schema({
        productId: {
            type:
                mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },
    });

const orderSchema =
    new mongoose.Schema(
        {
            orderNumber: {
                type: String,
                required: true,
                unique: true,
            },

            user: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            items: [
                orderItemSchema,
            ],

            subtotal: {
                type: Number,
                required: true,
            },

            shippingFee: {
                type: Number,
                default: 0,
            },

            totalAmount: {
                type: Number,
                required: true,
            },

            status: {
                type: String,
                enum: [
                    "pending",
                    "processing",
                    "shipped",
                    "delivered",
                    "cancelled",
                ],
                default:
                    "pending",
            },

            paymentStatus: {
                type: String,
                enum: [
                    "pending",
                    "paid",
                    "failed",
                    "refunded",
                ],
                default:
                    "pending",
            },

            paymentMethod: {
                type: String,
                default:
                    "paystack",
            },

            shippingAddress:
            {
                fullName:
                    String,
                phone:
                    String,
                address:
                    String,
                city:
                    String,
                state:
                    String,
            },
        },
        {
            timestamps: true,
        }
    );

export default mongoose.model(
    "Order",
    orderSchema
);