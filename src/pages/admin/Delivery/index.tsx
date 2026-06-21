import DeliveryColumn from "../../../components/admin/delivery/DeliveryColumn";

import {
  useDelivery,
} from "../../../hooks/admin/useDelivery";

const Delivery = () => {
  const {
    orders,
    loading,
  } = useDelivery();

  if (loading) {
    return (
      <div>
        Loading deliveries...
      </div>
    );
  }

  const pending =
    orders.filter(
      (order) =>
        order.status ===
        "pending"
    );

  const processing =
    orders.filter(
      (order) =>
        order.status ===
        "processing"
    );

  const shipped =
    orders.filter(
      (order) =>
        order.status ===
        "shipped"
    );

  const delivered =
    orders.filter(
      (order) =>
        order.status ===
        "delivered"
    );

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
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
          title="Pending"
          deliveries={
            pending
          }
        />

        <DeliveryColumn
          title="Processing"
          deliveries={
            processing
          }
        />

        <DeliveryColumn
          title="Shipped"
          deliveries={
            shipped
          }
        />

        <DeliveryColumn
          title="Delivered"
          deliveries={
            delivered
          }
        />
      </div>
    </>
  );
};

export default Delivery;