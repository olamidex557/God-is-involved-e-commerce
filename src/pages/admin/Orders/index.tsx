import {
  useEffect,
  useState,
} from "react";

import KanbanColumn from "../../../components/admin/orders/KanbanColumn";

import {
  getAllOrders,
} from "../../../services/api/orders";

import type {
  Order,
} from "../../../types/order";

const OrdersAdmin = () => {
  const [
    orders,
    setOrders,
  ] = useState<Order[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      try {
        setLoading(true);

        const response =
          await getAllOrders();

        setOrders(
          response.orders
        );
      } catch (
        error: any
      ) {
        setError(
          error?.response?.data
            ?.message ||
            "Unable to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

  const pending =
    orders
      .filter(
        (order) =>
          order.status ===
          "pending"
      )
      .map((order) => ({
        id: order._id,
        orderNumber:
          order.orderNumber,
        customer:
          order
            .shippingAddress
            .fullName,
        amount: `₦${order.totalAmount.toLocaleString()}`,
        status:
          order.status,
      }));

  const processing =
    orders
      .filter(
        (order) =>
          order.status ===
          "processing"
      )
      .map((order) => ({
        id: order._id,
        orderNumber:
          order.orderNumber,
        customer:
          order
            .shippingAddress
            .fullName,
        amount: `₦${order.totalAmount.toLocaleString()}`,
        status:
          order.status,
      }));

  const shipped =
    orders
      .filter(
        (order) =>
          order.status ===
          "shipped"
      )
      .map((order) => ({
        id: order._id,
        orderNumber:
          order.orderNumber,
        customer:
          order
            .shippingAddress
            .fullName,
        amount: `₦${order.totalAmount.toLocaleString()}`,
        status:
          order.status,
      }));

  const delivered =
    orders
      .filter(
        (order) =>
          order.status ===
          "delivered"
      )
      .map((order) => ({
        id: order._id,
        orderNumber:
          order.orderNumber,
        customer:
          order
            .shippingAddress
            .fullName,
        amount: `₦${order.totalAmount.toLocaleString()}`,
        status:
          order.status,
      }));

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

      {loading && (
        <div className="py-10">
          Loading orders...
        </div>
      )}

      {error && (
        <div className="text-red-400 py-10">
          {error}
        </div>
      )}

      {!loading &&
        !error && (
          <div
            className="
            grid
            xl:grid-cols-4
            gap-6
            "
          >
            <KanbanColumn
              title="Pending"
              orders={
                pending
              }
            />

            <KanbanColumn
              title="Processing"
              orders={
                processing
              }
            />

            <KanbanColumn
              title="Shipped"
              orders={
                shipped
              }
            />

            <KanbanColumn
              title="Delivered"
              orders={
                delivered
              }
            />
          </div>
        )}
    </>
  );
};

export default OrdersAdmin;