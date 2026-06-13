import RevenueCard from "../../../components/admin/payments/RevenueCard";
import TransactionList from "../../../components/admin/payments/TransactionList";
import TopCustomers from "../../../components/admin/payments/TopCustomers";

const Payments = () => {
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
        md:grid-cols-4
        gap-6
        "
      >
        <RevenueCard
          title="Revenue"
          value="₦24.8M"
          growth="+12%"
        />

        <RevenueCard
          title="Pending"
          value="₦2.1M"
          growth="+4%"
        />

        <RevenueCard
          title="Successful"
          value="₦22.4M"
          growth="+18%"
        />

        <RevenueCard
          title="Refunds"
          value="₦320K"
          growth="-2%"
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
        <TransactionList />

        <TopCustomers />
      </div>
    </>
  );
};

export default Payments;