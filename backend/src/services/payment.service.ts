import crypto from "crypto";
import axios from "axios";
import mongoose, {
  HydratedDocument,
} from "mongoose";

import Order, {
  OrderDocument,
  OrderItem,
} from "../models/Order";
import PaymentEvent from "../models/PaymentEvent";
import User from "../models/User";
import {
  sendPaymentSuccessfulEmail,
} from "./email.service";
import {
  sendTelegramMessage,
} from "./telegram.service";
import {
  formatPaymentFailedAlert,
  formatPaymentReceivedAlert,
} from "../utils/operationsBot";

const PAYSTACK_BASE_URL =
  "https://api.paystack.co";

interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: PaystackTransaction;
}

interface PaystackTransaction {
  id: number;
  status: string;
  reference: string;
  amount: number;
  gateway_response?: string;
  paid_at?: string;
  customer?: {
    email?: string;
  };
  metadata?: {
    orderId?: string;
    orderNumber?: string;
    userId?: string;
  };
}

interface PaystackWebhookPayload {
  event: string;
  data?: PaystackTransaction;
}

export const verifyPaystackSignature =
  (
    rawBody: Buffer,
    signature: string | undefined
  ) => {
    if (!signature) {
      return false;
    }

    const hash =
      crypto
        .createHmac(
          "sha512",
          process.env.PAYSTACK_SECRET_KEY ||
            ""
        )
        .update(rawBody)
        .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(signature)
    );
  };

const getPaystackHeaders =
  () => ({
    Authorization:
      `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type":
      "application/json",
  });

const getCustomerName =
  async (
    userId: unknown,
    fallback: string
  ) => {
    if (
      !mongoose.Types.ObjectId.isValid(
        String(userId)
      )
    ) {
      return fallback;
    }

    const user =
      await User.findById(
        String(
          userId
        )
      );

    return user
      ? `${user.firstName} ${user.lastName}`
      : fallback;
  };

const getCustomerEmail =
  async (
    userId: unknown
  ) => {
    if (
      !mongoose.Types.ObjectId.isValid(
        String(userId)
      )
    ) {
      return null;
    }

    const user =
      await User.findById(
        String(
          userId
        )
      );

    return user?.email || null;
  };

const notifyPaymentSuccess =
  async (
    order: HydratedDocument<OrderDocument>
  ) => {
    const customerName =
      await getCustomerName(
        order.user,
        order.shippingAddress?.fullName ||
          "Unknown Customer"
      );

    const items =
      order.items.map(
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
      );

    await sendTelegramMessage(
      formatPaymentReceivedAlert(
        order.orderNumber,
        customerName,
        order.totalAmount,
        items
      )
    );

    const customerEmail =
      await getCustomerEmail(
        order.user
      );

    if (customerEmail) {
      await sendPaymentSuccessfulEmail(
        customerEmail,
        order.orderNumber,
        order.totalAmount,
        items
      );
    }
  };

const notifyPaymentFailure =
  async (
    order: HydratedDocument<OrderDocument>
  ) => {
    await sendTelegramMessage(
      formatPaymentFailedAlert(
        order.orderNumber,
        order.totalAmount
      )
    );
  };

export const initializePaystackPayment =
  async (
    orderId: string,
    userId: string
  ) => {
    const order =
      await Order.findOne({
        _id:
          orderId,
        user:
          userId,
      });

    if (!order) {
      throw new Error(
        "Order not found"
      );
    }

    if (
      order.paymentStatus ===
      "paid"
    ) {
      throw new Error(
        "Order has already been paid"
      );
    }

    const user =
      await User.findById(
        userId
      );

    if (!user) {
      throw new Error(
        "Customer not found"
      );
    }

    const callbackUrl =
      `${
        process.env.FRONTEND_URL ||
        "http://localhost:5173"
      }/order-success`;

    const response =
      await axios.post<PaystackInitializeResponse>(
        `${PAYSTACK_BASE_URL}/transaction/initialize`,
        {
          email:
            user.email,
          amount:
            Math.round(
              order.totalAmount * 100
            ),
          callback_url:
            callbackUrl,
          metadata: {
            orderId:
              String(order._id),
            orderNumber:
              order.orderNumber,
            userId:
              String(user._id),
          },
        },
        {
          headers:
            getPaystackHeaders(),
        }
      );

    if (
      !response.data.status
    ) {
      throw new Error(
        response.data.message
      );
    }

    order.paystackReference =
      response.data.data.reference;

    await order.save();

    return {
      authorizationUrl:
        response.data.data.authorization_url,
      accessCode:
        response.data.data.access_code,
      reference:
        response.data.data.reference,
      orderNumber:
        order.orderNumber,
    };
  };

const findOrderFromTransaction =
  async (
    transaction: PaystackTransaction
  ) => {
    const orderId =
      transaction.metadata?.orderId;

    if (
      orderId &&
      mongoose.Types.ObjectId.isValid(
        orderId
      )
    ) {
      const order =
        await Order.findById(
          orderId
        );

      if (order) {
        return order;
      }
    }

    return Order.findOne({
      paystackReference:
        transaction.reference,
    });
  };

const markPaymentSuccessful =
  async (
    transaction: PaystackTransaction,
    expectedUserId?: string
  ) => {
    const order =
      await findOrderFromTransaction(
        transaction
      );

    if (!order) {
      throw new Error(
        "Order not found for payment reference"
      );
    }

    if (
      expectedUserId &&
      String(order.user) !==
        expectedUserId
    ) {
      throw new Error(
        "Payment does not belong to this customer"
      );
    }

    const alreadyPaid =
      order.paymentStatus ===
      "paid";

    const expectedAmount =
      Math.round(
        order.totalAmount * 100
      );

    if (
      transaction.amount !==
      expectedAmount
    ) {
      throw new Error(
        "Payment amount does not match order total"
      );
    }

    order.paymentStatus =
      "paid";
    order.status =
      "processing";
    order.paystackReference =
      transaction.reference;
    order.paystackTransactionId =
      String(transaction.id);
    order.paidAt =
      transaction.paid_at
        ? new Date(
            transaction.paid_at
          )
        : new Date();
    order.paymentFailureReason =
      undefined;

    await order.save();

    if (!alreadyPaid) {
      try {
        await notifyPaymentSuccess(
          order
        );
      } catch (
        error
      ) {
        console.error(
          "Payment success notification failed:",
          error
        );
      }
    }

    return order;
  };

const markPaymentFailed =
  async (
    transaction: PaystackTransaction,
    expectedUserId?: string
  ) => {
    const order =
      await findOrderFromTransaction(
        transaction
      );

    if (!order) {
      throw new Error(
        "Order not found for payment reference"
      );
    }

    if (
      expectedUserId &&
      String(order.user) !==
        expectedUserId
    ) {
      throw new Error(
        "Payment does not belong to this customer"
      );
    }

    const wasAlreadyFailed =
      order.paymentStatus ===
      "failed";

    order.paymentStatus =
      "failed";
    order.paystackReference =
      transaction.reference;
    order.paystackTransactionId =
      String(transaction.id);
    order.paymentFailureReason =
      transaction.gateway_response ||
      "Payment failed";

    await order.save();

    if (!wasAlreadyFailed) {
      try {
        await notifyPaymentFailure(
          order
        );
      } catch (
        error
      ) {
        console.error(
          "Payment failure notification failed:",
          error
        );
      }
    }

    return order;
  };

export const verifyPaystackPayment =
  async (
    reference: string,
    userId?: string
  ) => {
    const response =
      await axios.get<PaystackVerifyResponse>(
        `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(
          reference
        )}`,
        {
          headers:
            getPaystackHeaders(),
        }
      );

    if (
      !response.data.status
    ) {
      throw new Error(
        response.data.message
      );
    }

    const transaction =
      response.data.data;

    if (
      transaction.status !==
      "success"
    ) {
      const order =
        await markPaymentFailed(
          transaction,
          userId
        );

      return {
        success: false,
        order,
        message:
          transaction.gateway_response ||
          "Payment was not successful",
      };
    }

    const order =
      await markPaymentSuccessful(
        transaction,
        userId
      );

    return {
      success: true,
      order,
      message:
        "Payment verified successfully",
    };
  };

const getEventKey =
  (
    payload: PaystackWebhookPayload
  ) =>
    `${payload.event}:${payload.data?.id || payload.data?.reference || "unknown"}`;

export const processPaystackWebhook =
  async (
    payload: PaystackWebhookPayload
  ) => {
    const transaction =
      payload.data;

    const eventKey =
      getEventKey(
        payload
      );

    const existingEvent =
      await PaymentEvent.findOne({
        eventKey,
      });

    if (existingEvent) {
      return {
        duplicate:
          true,
        processed:
          false,
      };
    }

    await PaymentEvent.create({
      eventKey,
      event:
        payload.event,
      reference:
        transaction?.reference,
      transactionId:
        transaction?.id
          ? String(
              transaction.id
            )
          : undefined,
      status:
        transaction?.status,
      payload,
    });

    if (!transaction) {
      return {
        duplicate:
          false,
        processed:
          false,
      };
    }

    if (
      payload.event ===
        "charge.success" &&
      transaction.status ===
        "success"
    ) {
      await markPaymentSuccessful(
        transaction
      );

      return {
        duplicate:
          false,
        processed:
          true,
      };
    }

    if (
      payload.event ===
        "charge.failed" ||
      transaction.status ===
        "failed"
    ) {
      await markPaymentFailed(
        transaction
      );

      return {
        duplicate:
          false,
        processed:
          true,
      };
    }

    return {
      duplicate:
        false,
      processed:
        false,
    };
  };
