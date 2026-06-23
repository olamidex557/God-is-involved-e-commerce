import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import Container from "../../components/ui/Container";

import {
  getMyOrders,
} from "../../services/api/orders";

import {
  useAuth,
} from "../../context/AuthContext";
import type {
  Order,
} from "../../types/order";

const Dashboard = () => {
  const { user } =
    useAuth();

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

  const totalOrders =
    orders.length;

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status ===
        "pending"
    ).length;

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.status ===
        "delivered"
    ).length;

  const totalSpent =
    orders.reduce(
      (
        total,
        order
      ) =>
        total +
        order.totalAmount,
      0
    );

  return (
    <div className="pt-32 pb-24">
      <Container>
        {/* HEADER */}

        <div className="mb-12">
          <p
            className="
            uppercase
            tracking-[0.3em]
            text-[#D4AF37]
            mb-3
            "
          >
            Dashboard
          </p>

          <h1
            className="
            text-4xl
            md:text-6xl
            font-bold
            "
          >
            Welcome Back,
            <br />
            {
              user?.firstName
            }
          </h1>
        </div>

        {/* STATS */}

        <div
          className="
          grid
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          "
        >
          <div
            className="
            bg-white/[0.03]
            border
            border-white/10
            rounded-3xl
            p-8
            "
          >
            <h3 className="text-4xl font-bold">
              {totalOrders}
            </h3>

            <p className="text-white/50 mt-2">
              Total Orders
            </p>
          </div>

          <div
            className="
            bg-white/[0.03]
            border
            border-white/10
            rounded-3xl
            p-8
            "
          >
            <h3 className="text-4xl font-bold">
              {
                pendingOrders
              }
            </h3>

            <p className="text-white/50 mt-2">
              Pending Orders
            </p>
          </div>

          <div
            className="
            bg-white/[0.03]
            border
            border-white/10
            rounded-3xl
            p-8
            "
          >
            <h3 className="text-4xl font-bold">
              {
                deliveredOrders
              }
            </h3>

            <p className="text-white/50 mt-2">
              Delivered
            </p>
          </div>

          <div
            className="
            bg-white/[0.03]
            border
            border-white/10
            rounded-3xl
            p-8
            "
          >
            <h3 className="text-4xl font-bold">
              ₦
              {totalSpent.toLocaleString()}
            </h3>

            <p className="text-white/50 mt-2">
              Total Spend
            </p>
          </div>
        </div>

        {/* QUICK ACTIONS */}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div
            className="
            grid
            md:grid-cols-3
            gap-6
            "
          >
            <Link
              to="/materials"
              className="
              border
              border-white/10
              rounded-3xl
              p-8
              hover:border-[#D4AF37]
              transition
              "
            >
              Browse Materials
            </Link>

            <Link
              to="/quotation"
              className="
              border
              border-white/10
              rounded-3xl
              p-8
              hover:border-[#D4AF37]
              transition
              "
            >
              Request Quotation
            </Link>

            <Link
              to="/orders"
              className="
              border
              border-white/10
              rounded-3xl
              p-8
              hover:border-[#D4AF37]
              transition
              "
            >
              My Orders
            </Link>
          </div>
        </div>

        {/* RECENT ORDERS */}

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          <div
            className="
            border
            border-white/10
            rounded-3xl
            overflow-hidden
            "
          >
            {loading ? (
              <div className="p-8">
                Loading...
              </div>
            ) : orders.length ===
              0 ? (
              <div className="p-8">
                No orders yet
              </div>
            ) : (
              orders
                .slice(0, 5)
                .map(
                  (
                    order
                  ) => (
                    <div
                      key={
                        order._id
                      }
                      className="
                      flex
                      justify-between
                      items-center
                      p-6
                      border-b
                      border-white/10
                      "
                    >
                      <div>
                        <p className="font-semibold">
                          {
                            order.orderNumber
                          }
                        </p>

                        <p className="text-white/50 text-sm">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <span
                          className="
                          capitalize
                          "
                        >
                          {
                            order.status
                          }
                        </span>
                      </div>

                      <div>
                        ₦
                        {order.totalAmount.toLocaleString()}
                      </div>
                    </div>
                  )
                )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
