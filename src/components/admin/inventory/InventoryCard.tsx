interface Props {
  title: string;
  value: string;
  color: string;
}

const InventoryCard = ({
  title,
  value,
  color,
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
      <div
        className={`
        w-3
        h-3
        rounded-full
        mb-4
        ${color}
        `}
      />

      <p className="text-white/50">
        {title}
      </p>

      <h3
        className="
        text-4xl
        font-bold
        mt-2
        "
      >
        {value}
      </h3>
    </div>
  );
};

export default InventoryCard;