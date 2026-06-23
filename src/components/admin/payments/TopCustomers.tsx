import type {
  PaymentCustomer,
} from "../../../types/payment";

interface Props {
  customers: PaymentCustomer[];
}

const TopCustomers = ({
  customers,
}: Props) => {
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
      <h2
        className="
        text-xl
        font-semibold
        mb-6
        "
      >
        Top Customers
      </h2>

      <div className="space-y-4">
        {customers.length === 0 ? (
          <p className="text-white/50">
            No customer data.
          </p>
        ) : (
          customers.map(
            (customer) => (
              <div
                key={
                  customer.email
                }
                className="
                flex
                justify-between
                items-center
                "
              >
                <div>
                  <p>
                    {
                      customer.name
                    }
                  </p>

                  <p
                    className="
                    text-xs
                    text-white/50
                    "
                  >
                    {
                      customer.orders
                    }{" "}
                    orders
                  </p>
                </div>

                <p
                  className="
                  text-[#D4AF37]
                  "
                >
                  ₦
                  {customer.totalSpent.toLocaleString()}
                </p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default TopCustomers;
