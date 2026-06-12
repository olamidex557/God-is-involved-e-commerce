import {
  useEffect,
  useState,
} from "react";

import {
  getProduct,
} from "../services/api/products";

export const useProduct = (
  id: string
) => {
  const [
    product,
    setProduct,
  ] = useState<any>(null);

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