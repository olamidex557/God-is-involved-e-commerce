import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
} from "../../services/api/admin";
import type {
  DashboardStats,
} from "../../services/api/admin";

export const useDashboardStats =
  () => {
    const [
      stats,
      setStats,
    ] =
      useState<DashboardStats | null>(
        null
      );

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [
      error,
      setError,
    ] = useState<string | null>(
      null
    );

    const fetchStats =
      async () => {
        try {
          setLoading(true);
          setError(null);

          const data =
            await getDashboardStats();

          setStats(data);
        } catch (err) {
          console.error(err);

          setError(
            "Unable to load dashboard statistics."
          );
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
      let active = true;

      const loadStats =
        async () => {
          try {
            setError(null);

            const data =
              await getDashboardStats();

            if (!active) {
              return;
            }

            setStats(data);
          } catch (err) {
            console.error(err);

            if (!active) {
              return;
            }

            setError(
              "Unable to load dashboard statistics."
            );
          } finally {
            if (active) {
              setLoading(false);
            }
          }
        };

      void loadStats();

      return () => {
        active = false;
      };
    }, []);

    return {
      stats,
      loading,
      error,
      fetchStats,
    };
  };
