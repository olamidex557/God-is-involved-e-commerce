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

const Dashboard = () => {
  const {
    stats,
    loading,
    error,
    fetchStats,
  } = useDashboardStats();

  const getMetricValue =
    (
      value:
        | number
        | undefined,
      formatter = numberFormatter
    ) => {
      if (loading) {
        return "Loading...";
      }

      if (error) {
        return "Unavailable";
      }

      return formatter.format(
        value ?? 0
      );
    };

  return (
    <>
      {/* STATS */}

      {error && (
        <div
          className="
          mb-6
          flex
          flex-col
          gap-3
          rounded-2xl
          border
          border-red-500/30
          bg-red-500/10
          p-4
          text-sm
          text-red-100
          sm:flex-row
          sm:items-center
          sm:justify-between
          "
        >
          <span>{error}</span>

          <button
            type="button"
            onClick={fetchStats}
            className="
            rounded-xl
            bg-white/10
            px-4
            py-2
            font-medium
            text-white
            transition
            hover:bg-white/15
            "
          >
            Retry
          </button>
        </div>
      )}

      <div
        className="
        grid
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        "
      >
        <CommandCard
          title="Revenue"
          value={getMetricValue(
            stats?.totalRevenue,
            currencyFormatter
          )}
          growth="Live total"
        />

        <CommandCard
          title="Orders"
          value={getMetricValue(
            stats?.totalOrders
          )}
          growth="Live count"
        />

        <CommandCard
          title="Quotes"
          value={getMetricValue(
            stats?.totalQuotations
          )}
          growth="Live count"
        />

        <CommandCard
          title="Customers"
          value={getMetricValue(
            stats?.totalUsers
          )}
          growth="Live count"
        />

        <CommandCard
          title="Products"
          value={getMetricValue(
            stats?.totalProducts
          )}
          growth="Live count"
        />
      </div>

      {/* WORKSPACE */}

      <div
        className="
        mt-8
        grid
        lg:grid-cols-3
        gap-6
        "
      >
        {/* ACTIVITY */}

        <div
          className="
          lg:col-span-2
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
            Live Activity
          </h2>

          <div className="space-y-4">
            <div className="border-b border-white/10 pb-3">
              New quote submitted
            </div>

            <div className="border-b border-white/10 pb-3">
              Order #102 paid
            </div>

            <div className="border-b border-white/10 pb-3">
              Inventory updated
            </div>

            <div className="border-b border-white/10 pb-3">
              New customer registered
            </div>

            <div>
              Delivery marked complete
            </div>
          </div>
        </div>

        {/* AI PANEL */}

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
            AI Assistant
          </h2>

          <div className="space-y-3">
            <button
              className="
              w-full
              text-left
              p-3
              rounded-xl
              bg-white/5
              hover:bg-white/10
              "
            >
              Show low stock items
            </button>

            <button
              className="
              w-full
              text-left
              p-3
              rounded-xl
              bg-white/5
              hover:bg-white/10
              "
            >
              Show pending orders
            </button>

            <button
              className="
              w-full
              text-left
              p-3
              rounded-xl
              bg-white/5
              hover:bg-white/10
              "
            >
              Generate report
            </button>
          </div>
        </div>
      </div>

      {/* LOWER GRID */}

      <div
        className="
        mt-6
        grid
        md:grid-cols-2
        gap-6
        "
      >
        <div
          className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
          "
        >
          <h2 className="text-xl font-semibold mb-4">
            Recent Orders
          </h2>

          <div className="space-y-3">
            <p>#102 • ₦45,000</p>
            <p>#101 • ₦22,000</p>
            <p>#100 • ₦89,000</p>
          </div>
        </div>

        <div
          className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
          "
        >
          <h2 className="text-xl font-semibold mb-4">
            Low Stock Alerts
          </h2>

          <div className="space-y-3">
            <p>Walnut MDF</p>
            <p>Oak Veneer</p>
            <p>Black Edge Tape</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
