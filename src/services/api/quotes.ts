import { api } from "./client";

export const getQuotes =
  async () => {
    const response =
      await api.get(
        "/quotes"
      );

    return response.data;
  };

export const createQuote =
  async (
    quote: any
  ) => {
    const response =
      await api.post(
        "/quotes",
        quote
      );

    return response.data;
  };