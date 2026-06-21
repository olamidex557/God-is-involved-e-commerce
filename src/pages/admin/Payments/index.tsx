import RevenueCard from "../../../components/admin/payments/RevenueCard";
import TransactionList from "../../../components/admin/payments/TransactionList";
import TopCustomers from "../../../components/admin/payments/TopCustomers";

import {
  usePayments,
} from "../../../hooks/admin/usePayments";

const Payments = () => {
  const {
    stats,
    loading,
  } = usePayments();

  if (loading) {
    return (
      <div>
        Loading payments...
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Payments
        </h1>

        <p className="text-white/50 mt-2">
          Revenue and
          transaction monitoring.
        </p>
      </div>

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
        "
      >
        <RevenueCard
          title="Revenue"
          value={`₦${stats?.totalRevenue?.toLocaleString() || 0}`}
          subtitle="Total revenue"
        />

        <RevenueCard
          title="Transactions"
          value={`${stats?.totalTransactions || 0}`}
          subtitle="Completed orders"
        />

        <RevenueCard
          title="Average Order"
          value={`₦${Math.round(
            stats?.averageOrderValue || 0
          ).toLocaleString()}`}
          subtitle="Average spend"
        />
      </div>

      <div
        className="
        mt-8
        grid
        lg:grid-cols-2
        gap-6
        "
      >
        <TransactionList
          transactions={
            stats?.recentTransactions ||
            []
          }
        />

        <TopCustomers
          customers={
            stats?.topCustomers ||
            []
          }
        />
      </div>
    </>
  );
};

export default Payments;