interface Props {
  quote: {
    id: string;
    client: string;
    project: string;
    budget: string;
  };
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
      hover:border-[#D4AF37]
      transition
      "
    >
      <p className="text-sm text-white/50">
        {quote.id}
      </p>

      <h3
        className="
        font-semibold
        mt-2
        "
      >
        {quote.client}
      </h3>

      <p
        className="
        text-white/60
        mt-1
        "
      >
        {quote.project}
      </p>

      <p
        className="
        mt-4
        text-[#D4AF37]
        font-medium
        "
      >
        {quote.budget}
      </p>
    </div>
  );
};

export default QuoteCard;