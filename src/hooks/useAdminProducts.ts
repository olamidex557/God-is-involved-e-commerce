import { useEffect, useState } from "react";

import { api } from "../services/api/client";
import type {
  Product,
} from "../types/product";

export const useAdminProducts = () => {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchProducts =
    async () => {
      try {
        const response =
          await api.get(
            "/products"
          );

        setProducts(
          response.data.products
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    fetchProducts,
  };
};
