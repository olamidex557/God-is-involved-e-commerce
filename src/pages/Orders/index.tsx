import {
  useEffect,
  useState,
} from "react";

import Container from "../../components/ui/Container";

import {
  getMyOrders,
} from "../../services/api/orders";

import type {
  Order,
} from "../../types/order";

const Orders = () => {
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
          await getMyOrders();

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

  const getStatusClass =
    (
      status: string
    ) => {
      switch (
        status
      ) {
        case "pending":
          return "bg-yellow-500/20 text-yellow-400";

        case "processing":
          return "bg-blue-500/20 text-blue-400";

        case "shipped":
          return "bg-purple-500/20 text-purple-400";

        case "delivered":
          return "bg-green-500/20 text-green-400";

        case "cancelled":
          return "bg-red-500/20 text-red-400";

        default:
          return "bg-white/10";
      }
    };

  return (
    <div className="pt-32 pb-32">
      <Container>
        <div className="mb-16">
          <p
            className="
            uppercase
            tracking-[0.3em]
            text-[#D4AF37]
            mb-4
            "
          >
            Orders
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            "
          >
            Order
            <br />
            History
          </h1>
        </div>

        {loading && (
          <div className="text-center py-20">
            Loading orders...
          </div>
        )}

        {error && (
          <div
            className="
            text-red-400
            text-center
            py-10
            "
          >
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          orders.length ===
            0 && (
            <div
              className="
              border
              border-white/10
              rounded-[32px]
              p-10
              text-center
              "
            >
              <h2 className="text-3xl font-bold">
                No Orders Yet
              </h2>

              <p className="text-white/50 mt-4">
                Your completed
                purchases will
                appear here.
              </p>
            </div>
          )}

        <div className="space-y-6">
          {orders.map(
            (order) => (
              <div
                key={
                  order._id
                }
                className="
                border
                border-white/10
                rounded-[32px]
                p-8
                "
              >
                <div
                  className="
                  flex
                  flex-col
                  xl:flex-row
                  xl:items-center
                  xl:justify-between
                  gap-6
                  "
                >
                  <div>
                    <p className="text-white/50">
                      Order Number
                    </p>

                    <h3 className="text-2xl font-bold">
                      {
                        order.orderNumber
                      }
                    </h3>
                  </div>

                  <div>
                    <p className="text-white/50">
                      Date
                    </p>

                    <h4>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </h4>
                  </div>

                  <div>
                    <p className="text-white/50">
                      Total
                    </p>

                    <h4>
                      ₦
                      {order.totalAmount.toLocaleString()}
                    </h4>
                  </div>

                  <div>
                    <span
                      className={`
                      px-4
                      py-2
                      rounded-full
                      capitalize
                      ${getStatusClass(
                        order.status
                      )}
                    `}
                    >
                      {
                        order.status
                      }
                    </span>
                  </div>

                  <div>
                    <p className="text-white/50">
                      Items
                    </p>

                    <h4>
                      {
                        order.items
                          .length
                      }
                    </h4>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="space-y-3">
                    {order.items.map(
                      (
                        item,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="
                          flex
                          justify-between
                          text-sm
                          "
                        >
                          <span>
                            {
                              item.name
                            }{" "}
                            ×{" "}
                            {
                              item.quantity
                            }
                          </span>

                          <span>
                            ₦
                            {(
                              item.price *
                              item.quantity
                            ).toLocaleString()}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default Orders;