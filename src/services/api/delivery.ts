import { api } from "./client";

export const getDeliveryOrders =
  async () => {
    const response =
      await api.get(
        "/orders"
      );

    return response.data;
  };