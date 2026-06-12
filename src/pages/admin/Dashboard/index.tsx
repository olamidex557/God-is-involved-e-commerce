import AdminLayout from "../../../components/admin/AdminLayout";

import CommandCard from "../../../components/admin/CommandCard";

const Dashboard =
  () => {
    return (
      <AdminLayout>
        <div
          className="
          grid
          md:grid-cols-4
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

        <div
          className="
          mt-8
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
          "
        >
          <h2
            className="
            text-2xl
            font-bold
            mb-6
            "
          >
            Live Activity
          </h2>

          <div className="space-y-4">
            <p>
              New Quote Submitted
            </p>

            <p>
              Order #102 Paid
            </p>

            <p>
              Inventory Updated
            </p>

            <p>
              New Customer Registered
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  };

export default Dashboard;