interface Props {
  delivery: {
    orderId: string;
    customer: string;
    location: string;
  };
}

const DeliveryCard = ({
  delivery,
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
        text-sm
        text-white/50
        "
      >
        {delivery.orderId}
      </p>

      <h3
        className="
        mt-2
        font-semibold
        "
      >
        {delivery.customer}
      </h3>

      <p
        className="
        mt-3
        text-white/60
        "
      >
        {delivery.location}
      </p>
    </div>
  );
};

export default DeliveryCard;