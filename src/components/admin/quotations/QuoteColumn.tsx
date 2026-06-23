import QuoteCard from "./QuoteCard";
import type {
  Quote,
} from "../../../types/quotation";

interface Props {
  title: string;
  quotes: Quote[];
}

const QuoteColumn = ({
  title,
  quotes,
}: Props) => {
  return (
    <div
      className="
      bg-white/[0.02]
      border
      border-white/10
      rounded-3xl
      p-5
      "
    >
      <div
        className="
        flex
        justify-between
        items-center
        mb-5
        "
      >
        <h2 className="font-semibold">
          {title}
        </h2>

        <span className="text-white/50">
          {quotes.length}
        </span>
      </div>

      <div className="space-y-4">
        {quotes.map(
          (quote) => (
            <QuoteCard
              key={quote._id}
              quote={quote}
            />
          )
        )}
      </div>
    </div>
  );
};

export default QuoteColumn;
