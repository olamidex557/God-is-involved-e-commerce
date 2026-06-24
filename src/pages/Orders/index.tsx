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
  OrderItem,
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

  useEffect(() => {
    const loadOrders =
      async () => {
        try {
          const response =
            await getMyOrders();

          setOrders(
            response.orders || []
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

    loadOrders();
  }, []);

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="mb-12">
          <p
            className="
            uppercase
            tracking-[0.3em]
            text-[#D4AF37]
            mb-3
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
            Order History
          </h1>
        </div>

        {loading ? (
          <div
            className="
            border
            border-white/10
            rounded-3xl
            p-8
            "
          >
            Loading orders...
          </div>
        ) : orders.length ===
          0 ? (
          <div
            className="
            border
            border-white/10
            rounded-3xl
            p-8
            "
          >
            No orders found.
          </div>
        ) : (
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
                  rounded-3xl
                  p-8
                  "
                >
                  <div
                    className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
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

                      <p>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-white/50">
                        Total
                      </p>

                      <p>
                        ₦
                        {order.totalAmount.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <span
                        className="
                        px-4
                        py-2
                        rounded-full
                        bg-[#D4AF37]/20
                        text-[#D4AF37]
                        capitalize
                        "
                      >
                        {
                          order.status
                        }
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4
                      className="
                      font-semibold
                      mb-4
                      "
                    >
                      Items
                    </h4>

                    <div className="space-y-3">
                      {order.items.map(
                        (
                          item: OrderItem
                        ) => (
                          <div
                            key={
                              item.productId
                            }
                            className="
                            flex
                            justify-between
                            text-white/70
                            "
                          >
                            <span>
                              {
                                item.name
                              }
                              <span className="block text-xs text-white/45">
                                {item.color ?? "Default"} / {item.size ?? "Standard"}
                              </span>
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
        )}
      </Container>
    </div>
  );
};

export default Orders;
