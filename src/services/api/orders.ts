import { api } from "./client";

import type{
  Order,
  CreateOrderPayload,
} from "../../types/order";

interface CreateOrderResponse {
  success: boolean;
  order: Order;
}

export const createOrder =
  async (
    orderData: CreateOrderPayload
  ): Promise<CreateOrderResponse> => {
    const response =
      await api.post(
        "/orders",
        orderData
      );

    return response.data;
  };

export const getMyOrders =
  async () => {
    const response =
      await api.get(
        "/orders/my-orders"
      );

    return response.data;
  };

export const getAllOrders =
  async () => {
    const response =
      await api.get(
        "/orders"
      );

    return response.data;
  };

export const updateOrderStatus =
  async (
    orderId: string,
    status: string
  ) => {
    const response =
      await api.patch(
        `/orders/${orderId}/status`,
        {
          status,
        }
      );

    return response.data;
  };
