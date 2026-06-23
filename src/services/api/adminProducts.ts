import { api } from "./client";
import type {
  ProductPayload,
} from "../../types/product";

export const getProducts =
  async () => {
    const response =
      await api.get(
        "/products"
      );

    return response.data;
  };

export const createProduct =
  async (
    product: ProductPayload
  ) => {
    const response =
      await api.post(
        "/products",
        product
      );

    return response.data;
  };

export const updateProduct =
  async (
    id: string,
    product: ProductPayload
  ) => {
    const response =
      await api.put(
        `/products/${id}`,
        product
      );

    return response.data;
  };

export const updateProductStock =
  async (
    id: string,
    stock: number
  ) => {
    const response =
      await api.patch(
        `/products/${id}/stock`,
        {
          stock,
        }
      );

    return response.data;
  };

export const deleteProduct =
  async (
    id: string
  ) => {
    const response =
      await api.delete(
        `/products/${id}`
      );

    return response.data;
  };
