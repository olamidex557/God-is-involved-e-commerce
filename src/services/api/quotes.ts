import { api } from "./client";

import type {
  CreateQuotePayload,
} from "../../types/quotation";

export const createQuote =
  async (
    payload: CreateQuotePayload
  ) => {
    const response =
      await api.post(
        "/quotes",
        payload
      );

    return response.data;
  };

export const getQuotes =
  async () => {
    const response =
      await api.get(
        "/quotes"
      );

    return response.data;
  };

export const updateQuoteStatus =
  async (
    id: string,
    status: string
  ) => {
    const response =
      await api.patch(
        `/quotes/${id}`,
        {
          status,
        }
      );

    return response.data;
  };