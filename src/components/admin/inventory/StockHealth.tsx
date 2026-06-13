const products = [
  {
    name: "Walnut MDF",
    stock: 120,
    status: "Healthy",
    color: "bg-green-500",
  },
  {
    name: "Oak Veneer",
    stock: 25,
    status: "Medium",
    color: "bg-yellow-500",
  },
  {
    name: "Black Edge Tape",
    stock: 8,
    status: "Low",
    color: "bg-orange-500",
  },
  {
    name: "Gloss Panel",
    stock: 2,
    status: "Critical",
    color: "bg-red-500",
  },
];

const StockHealth = () => {
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
        Stock Health
      </h2>

      <div className="space-y-4">
        {products.map(
          (
            product,
            index
          ) => (
            <div
              key={index}
              className="
              flex
              justify-between
              items-center
              "
            >
              <div>
                <p>
                  {
                    product.name
                  }
                </p>

                <p
                  className="
                  text-sm
                  text-white/50
                  "
                >
                  {
                    product.stock
                  }{" "}
                  units
                </p>
              </div>

              <div
                className="
                flex
                items-center
                gap-2
                "
              >
                <span
                  className={`
                  w-3
                  h-3
                  rounded-full
                  ${product.color}
                  `}
                />

                <span>
                  {
                    product.status
                  }
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StockHealth;