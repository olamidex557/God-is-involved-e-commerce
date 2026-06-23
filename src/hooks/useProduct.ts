import {
  useEffect,
  useState,
} from "react";

import {
  getProduct,
} from "../services/api/products";
import type {
  Product,
} from "../types/product";

export const useProduct = (
  id: string
) => {
  const [
    product,
    setProduct,
  ] = useState<Product | null>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    const fetchProduct =
      async () => {
        try {
          const data =
            await getProduct(id);

          setProduct(
            data.product
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
  };
};
