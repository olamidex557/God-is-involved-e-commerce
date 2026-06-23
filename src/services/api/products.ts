import { api } from "./client";
import type {
  Product,
} from "../../types/product";

export const getProducts =
  async (
    params?: {
      search?: string;
      category?: string;
      minPrice?: string;
      maxPrice?: string;
      sort?: string;
    }
  ): Promise<{
    success: boolean;
    products: Product[];
  }> => {
    const response =
      await api.get(
        "/products",
        {
          params,
        }
      );

    return response.data;
  };

export const getProduct =
  async (
    id: string
  ): Promise<{
    success: boolean;
    product: Product;
  }> => {
    const response =
      await api.get(
        `/products/${id}`
      );

    return response.data;
  };
