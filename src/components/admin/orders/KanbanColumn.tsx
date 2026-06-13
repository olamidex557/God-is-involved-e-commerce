import OrderCard from "./OrderCard";

interface Props {
  title: string;
  orders: any[];
}

const KanbanColumn = ({
  title,
  orders,
}: Props) => {
  return (
    <div
      className="
      bg-white/[0.02]
      border
      border-white/10
      rounded-3xl
      p-5
      min-h-[700px]
      "
    >
      <div
        className="
        flex
        justify-between
        items-center
        mb-5
        "
      >
        <h2
          className="
          font-semibold
          "
        >
          {title}
        </h2>

        <span
          className="
          text-sm
          text-white/50
          "
        >
          {orders.length}
        </span>
      </div>

      <div className="space-y-4">
        {orders.map(
          (order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          )
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;