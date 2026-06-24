import CommandCard from "../../../components/admin/CommandCard";

import {
  useDashboardStats,
} from "../../../hooks/admin/useDashboardStats";

const currencyFormatter =
  new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }
  );

const numberFormatter =
  new Intl.NumberFormat(
    "en-NG"
  );

interface MiniBarChartProps {
  title: string;
  data: {
    label: string;
    value: number;
  }[];
  formatValue?: (
    value: number
  ) => string;
}

const MiniBarChart = ({
  title,
  data,
  formatValue = (
    value
  ) =>
    numberFormatter.format(
      value
    ),
}: MiniBarChartProps) => {
  const max =
    Math.max(
      ...data.map(
        (
          point
        ) =>
          point.value
      ),
      1
    );

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-xl font-semibold mb-6">
        {title}
      </h2>

      <div className="flex items-end gap-3 h-44">
        {data.map(
          (
            point
          ) => (
            <div
              key={
                point.label
              }
              className="flex-1 flex flex-col justify-end gap-3"
            >
              <div
                className="
                rounded-t-xl
                bg-[#D4AF37]
                min-h-2
                shadow-[0_0_24px_rgba(212,175,55,0.18)]
                "
                style={{
                  height: `${Math.max(
                    8,
                    (point.value /
                      max) *
                      150
                  )}px`,
                }}
                title={formatValue(
                  point.value
                )}
              />

              <div className="text-center">
                <p className="text-xs text-white/50">
                  {point.label}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const {
    stats,
    loading,
    error,
    fetchStats,
  } = useDashboardStats();

  const formatNumber =
    (
      value?: number
    ) => {
      if (loading)
        return "Loading...";

      return numberFormatter.format(
        value || 0
      );
    };

  const formatMoney =
    (
      value?: number
    ) => {
      if (loading)
        return "Loading...";

      return currencyFormatter.format(
        value || 0
      );
    };

  return (
    <>
      {/* HEADER */}

      <div className="mb-10">
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Command Center
        </h1>

        <p
          className="
          text-white/50
          mt-2
          "
        >
          Real-time overview
          of orders,
          inventory and
          customer activity.
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div
          className="
          mb-6
          p-4
          rounded-2xl
          border
          border-red-500/30
          bg-red-500/10
          "
        >
          <div
            className="
            flex
            justify-between
            items-center
            "
          >
            <span>
              {error}
            </span>

            <button
              onClick={
                fetchStats
              }
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* TOP STATS */}

      <div
        className="
        grid
        md:grid-cols-2
        xl:grid-cols-5
        gap-6
        "
      >
        <CommandCard
          title="Revenue"
          value={formatMoney(
            stats?.totalRevenue
          )}
          growth="Total sales"
        />

        <CommandCard
          title="Orders"
          value={formatNumber(
            stats?.totalOrders
          )}
          growth="All orders"
        />

        <CommandCard
          title="Customers"
          value={formatNumber(
            stats?.totalUsers
          )}
          growth="Registered users"
        />

        <CommandCard
          title="Products"
          value={formatNumber(
            stats?.totalProducts
          )}
          growth="Inventory items"
        />

        <CommandCard
          title="Low Stock"
          value={formatNumber(
            stats
              ?.lowStockProducts
              ?.length
          )}
          growth="Requires attention"
        />
      </div>

      {/* ORDER PIPELINE */}

      <div
        className="
        mt-8
        grid
        md:grid-cols-2
        xl:grid-cols-5
        gap-6
        "
      >
        <div
          className="
          rounded-3xl
          border
          border-yellow-500/20
          bg-yellow-500/10
          p-6
          "
        >
          <p
            className="
            text-yellow-400
            "
          >
            Pending
          </p>

          <h3
            className="
            text-4xl
            font-bold
            mt-3
            "
          >
            {formatNumber(
              stats?.pendingOrders
            )}
          </h3>
        </div>

        <div
          className="
          rounded-3xl
          border
          border-blue-500/20
          bg-blue-500/10
          p-6
          "
        >
          <p
            className="
            text-blue-400
            "
          >
            Processing
          </p>

          <h3
            className="
            text-4xl
            font-bold
            mt-3
            "
          >
            {formatNumber(
              stats?.processingOrders
            )}
          </h3>
        </div>

        <div
          className="
          rounded-3xl
          border
          border-purple-500/20
          bg-purple-500/10
          p-6
          "
        >
          <p
            className="
            text-purple-400
            "
          >
            Shipped
          </p>

          <h3
            className="
            text-4xl
            font-bold
            mt-3
            "
          >
            {formatNumber(
              stats?.shippedOrders
            )}
          </h3>
        </div>

        <div
          className="
          rounded-3xl
          border
          border-green-500/20
          bg-green-500/10
          p-6
          "
        >
          <p
            className="
            text-green-400
            "
          >
            Delivered
          </p>

          <h3
            className="
            text-4xl
            font-bold
            mt-3
            "
          >
            {formatNumber(
              stats?.deliveredOrders
            )}
          </h3>
        </div>

        <div
          className="
          rounded-3xl
          border
          border-red-500/20
          bg-red-500/10
          p-6
          "
        >
          <p
            className="
            text-red-400
            "
          >
            Cancelled
          </p>

          <h3
            className="
            text-4xl
            font-bold
            mt-3
            "
          >
            {formatNumber(
              stats?.cancelledOrders
            )}
          </h3>
        </div>
      </div>

      {/* CHARTS */}

      <div
        className="
        mt-8
        grid
        xl:grid-cols-3
        gap-6
        "
      >
        <MiniBarChart
          title="Revenue Trend"
          data={
            stats?.revenueTrend ||
            []
          }
          formatValue={
            currencyFormatter.format
          }
        />

        <MiniBarChart
          title="Orders Trend"
          data={
            stats?.ordersTrend ||
            []
          }
        />

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Status Distribution
          </h2>

          <div className="space-y-4">
            {(stats?.statusDistribution ||
              []
            ).map(
              (
                item
              ) => {
                const total =
                  stats?.totalOrders ||
                  1;

                return (
                  <div
                    key={
                      item.status
                    }
                  >
                    <div className="flex justify-between text-sm capitalize">
                      <span>
                        {item.status}
                      </span>

                      <span className="text-white/50">
                        {item.count}
                      </span>
                    </div>

                    <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#D4AF37]"
                        style={{
                          width: `${Math.round(
                            (item.count /
                              total) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* MAIN GRID */}

      <div
        className="
        mt-8
        grid
        xl:grid-cols-2
        gap-6
        "
      >
        {/* RECENT ORDERS */}

        <div
          className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
          "
        >
          <h2
            className="
            text-xl
            font-semibold
            mb-6
            "
          >
            Recent Orders
          </h2>

          <div className="space-y-4">
            {stats?.recentOrders
              ?.length ? (
              stats.recentOrders.map(
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
                    border-b
                    border-white/10
                    pb-4
                    "
                  >
                    <div>
                      <p
                        className="
                        font-medium
                        "
                      >
                        {
                          order.orderNumber
                        }
                      </p>

                      <p
                        className="
                        text-sm
                        text-white/50
                        "
                      >
                        {
                          order.status
                        }
                      </p>
                    </div>

                    <div>
                      {currencyFormatter.format(
                        order.totalAmount
                      )}
                    </div>
                  </div>
                )
              )
            ) : (
              <p
                className="
                text-white/50
                "
              >
                No orders found.
              </p>
            )}
          </div>
        </div>

        {/* LOW STOCK */}

        <div
          className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
          "
        >
          <h2
            className="
            text-xl
            font-semibold
            mb-6
            "
          >
            Low Stock Alerts
          </h2>

          <div className="space-y-4">
            {stats
              ?.lowStockProducts
              ?.length ? (
              stats.lowStockProducts.map(
                (
                  product
                ) => (
                  <div
                    key={
                      `${product.productId}-${product.color}-${product.size}`
                    }
                    className="
                    flex
                    justify-between
                    items-center
                    border-b
                    border-white/10
                    pb-4
                    "
                  >
                    <span>
                      {
                        product.productName
                      }
                      <span className="block text-sm text-white/45">
                        {product.color} / {product.size}
                      </span>
                    </span>

                    <span
                      className="
                      text-red-400
                      "
                    >
                      {
                        product.stock
                      }{" "}
                      left
                    </span>
                  </div>
                )
              )
            ) : (
              <p
                className="
                text-white/50
                "
              >
                Inventory healthy.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
