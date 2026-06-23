import {
  useEffect,
  useState,
} from "react";

import {
  getDeliveryOrders,
} from "../../services/api/delivery";
import type {
  Order,
} from "../../types/order";

export const useDelivery =
  () => {
    const [
      orders,
      setOrders,
    ] = useState<Order[]>(
      []
    );

    const [
      loading,
      setLoading,
    ] = useState(true);

    const fetchOrders =
      async () => {
        try {
          const response =
            await getDeliveryOrders();

          setOrders(
            response.orders ||
              []
          );
        } catch (
          error
        ) {
          console.error(
            error
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    useEffect(() => {
      fetchOrders();
    }, []);

    return {
      orders,
      loading,
      fetchOrders,
    };
  };
