interface Props {
  order: {
    id: string;
    orderNumber: string;
    customer: string;
    amount: string;
    status: string;
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
      hover:border-[#D4AF37]
      transition
      "
    >
      <p
        className="
        text-xs
        text-white/40
        "
      >
        {
          order.orderNumber
        }
      </p>

      <h3
        className="
        font-semibold
        mt-2
        "
      >
        {
          order.customer
        }
      </h3>

      <p
        className="
        mt-3
        text-[#D4AF37]
        font-medium
        "
      >
        {
          order.amount
        }
      </p>
    </div>
  );
};

export default OrderCard;