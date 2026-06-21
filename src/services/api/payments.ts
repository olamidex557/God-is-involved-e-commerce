import { api } from "./client";

export const getPaymentStats =
  async () => {
    const response =
      await api.get(
        "/payments"
      );

    return response.data;
  };