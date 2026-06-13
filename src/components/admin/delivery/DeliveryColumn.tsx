import DeliveryCard from "./DeliveryCard";

interface Props {
  title: string;
  deliveries: any[];
}

const DeliveryColumn = ({
  title,
  deliveries,
}: Props) => {
  return (
    <div
      className="
      bg-white/[0.03]
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
        mb-5
        "
      >
        <h2 className="font-semibold">
          {title}
        </h2>

        <span className="text-white/50">
          {deliveries.length}
        </span>
      </div>

      <div className="space-y-4">
        {deliveries.map(
          (delivery) => (
            <DeliveryCard
              key={
                delivery.orderId
              }
              delivery={delivery}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DeliveryColumn;