interface Props {
  title: string;
  value: string;
  subtitle?: string;
}

const RevenueCard = ({
  title,
  value,
  subtitle,
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

      {subtitle && (
        <p
          className="
          text-white/40
          mt-2
          text-sm
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default RevenueCard;