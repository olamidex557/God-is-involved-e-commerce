interface Product {
  _id: string;
  name: string;
  stock: number;
}

interface Props {
  products: Product[];
}

const InventoryAlerts = ({
  products,
}: Props) => {
  const criticalItems =
    products.filter(
      (product) =>
        product.stock <= 5
    );

  if (
    criticalItems.length === 0
  ) {
    return (
      <div
        className="
        bg-green-500/10
        border
        border-green-500/20
        rounded-3xl
        p-6
        "
      >
        <h2
          className="
          text-green-400
          font-semibold
          "
        >
          Inventory Status
        </h2>

        <p className="mt-3">
          All inventory levels
          are healthy.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      bg-red-500/10
      border
      border-red-500/20
      rounded-3xl
      p-6
      "
    >
      <h2
        className="
        text-red-400
        font-semibold
        mb-4
        "
      >
        Critical Stock Alert
      </h2>

      <div className="space-y-3">
        {criticalItems.map(
          (product) => (
            <div
              key={
                product._id
              }
              className="
              flex
              justify-between
              "
            >
              <span>
                {
                  product.name
                }
              </span>

              <span>
                {
                  product.stock
                }{" "}
                left
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default InventoryAlerts;