interface Props {
  title: string;
  value: string;
  growth: string;
}

const RevenueCard = ({
  title,
  value,
  growth,
}: Props) => {
  return (
    <div
      className="
      bg-white/[0.03]
      border
      border-white/10
      rounded-3xl
      p-6
      "
    >
      <p className="text-white/50">
        {title}
      </p>

      <h3
        className="
        text-4xl
        font-bold
        mt-3
        "
      >
        {value}
      </h3>

      <p
        className="
        text-green-500
        mt-2
        "
      >
        {growth}
      </p>
    </div>
  );
};

export default RevenueCard;