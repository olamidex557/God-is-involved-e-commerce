import QuoteColumn from "../../../components/admin/quotations/QuoteColumn";

import {
  useQuotes,
} from "../../../hooks/admin/useQuotes";

const Quotations = () => {
  const {
    quotes,
    loading,
  } = useQuotes();

  const pending =
    quotes.filter(
      (quote) =>
        quote.status ===
        "pending"
    );

  const approved =
    quotes.filter(
      (quote) =>
        quote.status ===
        "approved"
    );

  const rejected =
    quotes.filter(
      (quote) =>
        quote.status ===
        "rejected"
    );

  if (loading) {
    return (
      <div>
        Loading quotations...
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Quotations
        </h1>

        <p className="text-white/50 mt-2">
          Manage quotation
          requests.
        </p>
      </div>

      <div
        className="
        grid
        xl:grid-cols-3
        gap-6
        "
      >
        <QuoteColumn
          title="Pending"
          quotes={pending}
        />

        <QuoteColumn
          title="Approved"
          quotes={approved}
        />

        <QuoteColumn
          title="Rejected"
          quotes={rejected}
        />
      </div>
    </>
  );
};

export default Quotations;