import {
  useEffect,
  useState,
} from "react";

import {
  getProducts,
} from "../services/api/products";
import type {
  Product,
} from "../types/product";

interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
}

export const useProducts =
  (
    filters: ProductFilters = {}
  ) => {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
    } = filters;

    const [
      products,
      setProducts,
    ] = useState<Product[]>([]);

    const [
      loading,
      setLoading,
    ] = useState(true);

    useEffect(() => {
      const fetchProducts =
        async () => {
          try {
            const data =
              await getProducts(
                {
                  search,
                  category,
                  minPrice,
                  maxPrice,
                  sort,
                }
              );

            setProducts(
              data.products
            );
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };

      fetchProducts();
    }, [
      search,
      category,
      minPrice,
      maxPrice,
      sort,
    ]);

    return {
      products,
      loading,
    };
  };
