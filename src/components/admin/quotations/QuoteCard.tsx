import type {
  Quote,
} from "../../../types/quotation";

interface Props {
  quote: Quote;
}

const QuoteCard = ({
  quote,
}: Props) => {
  return (
    <div
      className="
      bg-white/[0.03]
      border
      border-white/10
      rounded-2xl
      p-4
      "
    >
      <p className="text-xs text-white/50">
        {quote._id}
      </p>

      <h3
        className="
        font-semibold
        mt-2
        "
      >
        {
          quote.customerName
        }
      </h3>

      <p className="text-white/60">
        {
          quote.projectType
        }
      </p>

      <p
        className="
        text-[#D4AF37]
        mt-4
        "
      >
        ₦
        {quote.estimatedCost.toLocaleString()}
      </p>

      <div
        className="
        mt-4
        text-sm
        "
      >
        {
          quote.status
        }
      </div>
    </div>
  );
};

export default QuoteCard;
