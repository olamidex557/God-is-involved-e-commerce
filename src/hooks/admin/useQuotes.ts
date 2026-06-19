import {
  useEffect,
  useState,
} from "react";

import {
  getQuotes,
} from "../../services/api/quotes";

export const useQuotes =
  () => {
    const [
      quotes,
      setQuotes,
    ] = useState<any[]>(
      []
    );

    const [
      loading,
      setLoading,
    ] = useState(true);

    const fetchQuotes =
      async () => {
        try {
          const response =
            await getQuotes();

          setQuotes(
            response.quotes
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
      fetchQuotes();
    }, []);

    return {
      quotes,
      loading,
      fetchQuotes,
    };
  };