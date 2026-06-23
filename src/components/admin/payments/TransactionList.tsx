import type {
  PaymentTransaction,
} from "../../../types/payment";

interface Props {
  transactions: PaymentTransaction[];
}

const TransactionList = ({
  transactions,
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
        Recent Transactions
      </h2>

      <div className="space-y-4">
        {transactions.length ===
        0 ? (
          <p className="text-white/50">
            No transactions.
          </p>
        ) : (
          transactions.map(
            (item) => (
              <div
                key={
                  item._id
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
                      item.orderNumber
                    }
                  </p>

                  <p
                    className="
                    text-sm
                    text-white/50
                    "
                  >
                    {
                      item.status
                    }
                  </p>
                </div>

                <div
                  className="
                  text-right
                  "
                >
                  <p>
                    ₦
                    {item.totalAmount.toLocaleString()}
                  </p>

                  <p
                    className="
                    text-xs
                    text-white/50
                    "
                  >
                    {
                      item.paymentStatus
                    }
                  </p>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default TransactionList;
