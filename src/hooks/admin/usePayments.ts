import {
  useEffect,
  useState,
} from "react";

import {
  getPaymentStats,
} from "../../services/api/payments";
import type {
  PaymentStats,
} from "../../types/payment";

export const usePayments =
  () => {
    const [
      stats,
      setStats,
    ] = useState<PaymentStats | null>(
      null
    );

    const [
      loading,
      setLoading,
    ] = useState(true);

    const fetchPayments =
      async () => {
        try {
          const response =
            await getPaymentStats();

          setStats(
            response
          );
        } catch (
          error
        ) {
          console.error(
            error
          );
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
      fetchPayments();
    }, []);

    return {
      stats,
      loading,
      fetchPayments,
    };
  };
