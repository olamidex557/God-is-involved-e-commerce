const transactions = [
  {
    id: "TXN-1001",
    customer: "Olamide",
    amount: "₦250,000",
    status: "Success",
  },
  {
    id: "TXN-1002",
    customer: "James",
    amount: "₦120,000",
    status: "Pending",
  },
  {
    id: "TXN-1003",
    customer: "Sarah",
    amount: "₦450,000",
    status: "Success",
  },
];

const TransactionList = () => {
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
        Recent Transactions
      </h2>

      <div className="space-y-4">
        {transactions.map(
          (item) => (
            <div
              key={item.id}
              className="
              flex
              justify-between
              items-center
              "
            >
              <div>
                <p>{item.customer}</p>

                <p
                  className="
                  text-sm
                  text-white/50
                  "
                >
                  {item.id}
                </p>
              </div>

              <div className="text-right">
                <p>{item.amount}</p>

                <p
                  className="
                  text-sm
                  text-green-500
                  "
                >
                  {item.status}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TransactionList;