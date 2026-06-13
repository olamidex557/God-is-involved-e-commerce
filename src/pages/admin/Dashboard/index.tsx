import CommandCard from "../../../components/admin/CommandCard";

const Dashboard = () => {
  return (
    <>
      {/* STATS */}

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
          value="₦2.4M"
          growth="+12%"
        />

        <CommandCard
          title="Orders"
          value="324"
          growth="+18%"
        />

        <CommandCard
          title="Quotes"
          value="125"
          growth="+8%"
        />

        <CommandCard
          title="Customers"
          value="842"
          growth="+15%"
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
