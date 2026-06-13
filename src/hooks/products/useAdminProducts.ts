import {
  useEffect,
  useState,
} from "react";

import {
  getProducts,
} from "../../services/api/adminProducts";

export const useAdminProducts =
  () => {
    const [
      products,
      setProducts,
    ] = useState([]);

    const [
      loading,
      setLoading,
    ] = useState(true);

    const fetchProducts =
      async () => {
        try {
          const data =
            await getProducts();

          setProducts(
            data.products
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