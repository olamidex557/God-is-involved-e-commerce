const customers = [
  {
    name: "Olamide",
    spending: "₦1.2M",
  },
  {
    name: "Sarah",
    spending: "₦980K",
  },
  {
    name: "TechHub Ltd",
    spending: "₦760K",
  },
];

const TopCustomers = () => {
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
        {customers.map(
          (
            customer,
            index
          ) => (
            <div
              key={index}
              className="
              flex
              justify-between
              "
            >
              <p>
                {customer.name}
              </p>

              <p
                className="
                text-[#D4AF37]
                "
              >
                {
                  customer.spending
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TopCustomers;