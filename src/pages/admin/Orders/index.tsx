import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAllOrders,
  updateOrderStatus,
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
    search,
    setSearch,
  ] = useState("");

  const fetchOrders =
    async () => {
      try {
        const response =
          await getAllOrders();

        setOrders(
          response.orders
        );
      } catch (
        error
      ) {
        console.error(
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders =
    useMemo(() => {
      return orders.filter(
        (order) =>
          order.orderNumber
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          order.shippingAddress.fullName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [
      orders,
      search,
    ]);

  const revenue =
    orders
      .filter(
        (o) =>
          o.status ===
          "delivered"
      )
      .reduce(
        (
          sum,
          order
        ) =>
          sum +
          order.totalAmount,
        0
      );

  const changeStatus =
    async (
      orderId: string,
      status: string
    ) => {
      try {
        await updateOrderStatus(
          orderId,
          status
        );

        fetchOrders();
      } catch (
        error
      ) {
        console.error(
          error
        );
      }
    };

  if (loading) {
    return (
      <div>
        Loading orders...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">
          Orders
        </h1>

        <p className="text-white/50 mt-2">
          Monitor and fulfil
          customer orders.
        </p>
      </div>

      {/* KPIs */}

      <div className="grid lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={orders.length}
        />

        <StatCard
          title="Revenue"
          value={`₦${revenue.toLocaleString()}`}
        />

        <StatCard
          title="Pending"
          value={
            orders.filter(
              (o) =>
                o.status ===
                "pending"
            ).length
          }
        />

        <StatCard
          title="Delivered"
          value={
            orders.filter(
              (o) =>
                o.status ===
                "delivered"
            ).length
          }
        />
      </div>

      {/* SEARCH */}

      <div
        className="
        bg-white/[0.03]
        border
        border-white/10
        rounded-3xl
        p-6
        "
      >
        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search by customer or order number..."
          className="
          w-full
          h-14
          bg-black/30
          rounded-2xl
          px-5
          outline-none
          "
        />
      </div>

      {/* TABLE */}

      <div
        className="
        bg-white/[0.03]
        border
        border-white/10
        rounded-3xl
        overflow-hidden
        "
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-5">
                Order
              </th>

              <th className="text-left p-5">
                Customer
              </th>

              <th className="text-left p-5">
                Amount
              </th>

              <th className="text-left p-5">
                Status
              </th>

              <th className="text-left p-5">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map(
              (
                order
              ) => (
                <tr
                  key={
                    order._id
                  }
                  className="
                  border-b
                  border-white/5
                  "
                >
                  <td className="p-5">
                    {
                      order.orderNumber
                    }
                  </td>

                  <td className="p-5">
                    {
                      order
                        .shippingAddress
                        .fullName
                    }
                  </td>

                  <td className="p-5 text-[#D4AF37] font-semibold">
                    ₦
                    {order.totalAmount.toLocaleString()}
                  </td>

                  <td className="p-5 capitalize">
                    {
                      order.status
                    }
                  </td>

                  <td className="p-5">
                    <select
                      value={
                        order.status
                      }
                      onChange={(
                        e
                      ) =>
                        changeStatus(
                          order._id,
                          e.target
                            .value
                        )
                      }
                      className="
                      bg-black/30
                      rounded-xl
                      px-4
                      py-2
                      "
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="processing">
                        Processing
                      </option>

                      <option value="shipped">
                        Shipped
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <div
      className="
      bg-white/[0.03]
      border
      border-white/10
      rounded-3xl
      p-6
      "
    >
      <p className="text-white/50">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
};

export default OrdersAdmin;