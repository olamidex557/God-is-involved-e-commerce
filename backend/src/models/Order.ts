import mongoose from "mongoose";

export type OrderStatus =
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

export type PaymentStatus =
    | "pending"
    | "paid"
    | "failed"
    | "refunded";

export interface OrderItem {
    productId: mongoose.Types.ObjectId;
    name: string;
    color?: string;
    size?: string;
    price: number;
    quantity: number;
    image: string;
}

export interface ShippingAddress {
    fullName?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
}

export interface OrderDocument {
    orderNumber: string;
    user: mongoose.Types.ObjectId;
    items: OrderItem[];
    subtotal: number;
    shippingFee: number;
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: string;
    paystackReference?: string;
    paystackTransactionId?: string;
    paidAt?: Date;
    paymentFailureReason?: string;
    shippingAddress?: ShippingAddress;
    createdAt: Date;
    updatedAt: Date;
}

const orderItemSchema =
    new mongoose.Schema<OrderItem>({
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

        color: {
            type: String,
            default: "Default",
        },

        size: {
            type: String,
            default: "Standard",
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
    new mongoose.Schema<OrderDocument>(
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

            paystackReference: {
                type: String,
                default: null,
                index: true,
                sparse: true,
            },

            paystackTransactionId: {
                type: String,
                default: null,
            },

            paidAt: {
                type: Date,
                default: null,
            },

            paymentFailureReason: {
                type: String,
                default: null,
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
