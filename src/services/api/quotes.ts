import { api } from "./client";
import type {
  CreateQuotePayload,
} from "../../types/quotation";

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
    quote: CreateQuotePayload
  ) => {
    const response =
      await api.post(
        "/quotes",
        quote
      );

    return response.data;
  };
