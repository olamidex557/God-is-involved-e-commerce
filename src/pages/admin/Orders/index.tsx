import KanbanColumn from "../../../components/admin/orders/KanbanColumn";

const pending = [
  {
    id: "#101",
    customer:
      "Olamide",
    amount:
      "₦250,000",
  },
  {
    id: "#102",
    customer:
      "Adebayo",
    amount:
      "₦120,000",
  },
];

const processing = [
  {
    id: "#103",
    customer:
      "James",
    amount:
      "₦75,000",
  },
];

const shipped = [
  {
    id: "#104",
    customer:
      "Samuel",
    amount:
      "₦320,000",
  },
];

const delivered = [
  {
    id: "#105",
    customer:
      "David",
    amount:
      "₦500,000",
  },
];

const OrdersAdmin = () => {
  return (
    <>
      <div className="mb-8">
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Orders
        </h1>

        <p className="text-white/50 mt-2">
          Manage customer
          orders through
          every stage.
        </p>
      </div>

      <div
        className="
        grid
        xl:grid-cols-4
        gap-6
        "
      >
        <KanbanColumn
          title="Pending"
          orders={pending}
        />

        <KanbanColumn
          title="Processing"
          orders={
            processing
          }
        />

        <KanbanColumn
          title="Shipped"
          orders={shipped}
        />

        <KanbanColumn
          title="Delivered"
          orders={
            delivered
          }
        />
      </div>
    </>
  );
};

export default OrdersAdmin;