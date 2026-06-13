import DeliveryColumn from "../../../components/admin/delivery/DeliveryColumn";

const pending = [
  {
    orderId: "#201",
    customer: "Olamide",
    location: "Lagos",
  },
];

const transit = [
  {
    orderId: "#202",
    customer: "Sarah",
    location: "Abuja",
  },
];

const delivered = [
  {
    orderId: "#203",
    customer: "James",
    location: "Ibadan",
  },
];

const failed = [
  {
    orderId: "#204",
    customer: "David",
    location: "Port Harcourt",
  },
];

const Delivery = () => {
  return (
    <>
      <div className="mb-8">
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Delivery
        </h1>

        <p className="text-white/50 mt-2">
          Track shipments and
          logistics operations.
        </p>
      </div>

      <div
        className="
        grid
        xl:grid-cols-4
        gap-6
        "
      >
        <DeliveryColumn
          title="Pending Pickup"
          deliveries={pending}
        />

        <DeliveryColumn
          title="In Transit"
          deliveries={transit}
        />

        <DeliveryColumn
          title="Delivered"
          deliveries={delivered}
        />

        <DeliveryColumn
          title="Failed"
          deliveries={failed}
        />
      </div>
    </>
  );
};

export default Delivery;