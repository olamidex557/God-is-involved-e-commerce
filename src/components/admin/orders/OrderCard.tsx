interface Props {
  order: {
    id: string;
    customer: string;
    amount: string;
  };
}

const OrderCard = ({
  order,
}: Props) => {
  return (
    <div
      className="
      bg-white/[0.03]
      border
      border-white/10
      rounded-2xl
      p-4
      cursor-pointer
      hover:border-[#D4AF37]
      transition
      "
    >
      <p
        className="
        text-sm
        text-white/50
        "
      >
        {order.id}
      </p>

      <h3
        className="
        font-semibold
        mt-2
        "
      >
        {order.customer}
      </h3>

      <p
        className="
        mt-3
        text-[#D4AF37]
        "
      >
        {order.amount}
      </p>
    </div>
  );
};

export default OrderCard;