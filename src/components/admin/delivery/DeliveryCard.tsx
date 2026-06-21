interface Props {
  delivery: any;
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
      "
    >
      <p className="text-sm text-white/50">
        {
          delivery.orderNumber
        }
      </p>

      <h3 className="mt-2 font-semibold">
        {
          delivery
            ?.shippingAddress
            ?.fullName
        }
      </h3>

      <p className="mt-3 text-white/60">
        {
          delivery
            ?.shippingAddress
            ?.city
        }
      </p>
    </div>
  );
};

export default DeliveryCard;