import { api } from "./client";
import type {
  InitializePaymentResponse,
  PaymentStats,
  VerifyPaymentResponse,
} from "../../types/payment";

export const getPaymentStats =
  async (): Promise<PaymentStats> => {
    const response =
      await api.get(
        "/payments"
      );

    return response.data;
  };

export const initializePayment =
  async (
    orderId: string
  ): Promise<InitializePaymentResponse> => {
    const response =
      await api.post(
        "/payments/initialize",
        {
          orderId,
        }
      );

    return response.data;
  };

export const verifyPayment =
  async (
    reference: string
  ): Promise<VerifyPaymentResponse> => {
    const response =
      await api.get(
        `/payments/verify/${reference}`
      );

    return response.data;
  };
