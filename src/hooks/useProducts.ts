import {
  useEffect,
  useState,
} from "react";

import {
  getProducts,
} from "../services/api/products";

export const useProducts =
  () => {
    const [
      products,
      setProducts,
    ] = useState<any[]>([]);

    const [
      loading,
      setLoading,
    ] = useState(true);

    useEffect(() => {
      const fetchProducts =
        async () => {
          try {
            const data =
              await getProducts();

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
    }, []);

    return {
      products,
      loading,
    };
  };