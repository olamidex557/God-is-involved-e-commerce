import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Walnut MDF",
    price: "₦25,000",
    slug: "walnut-mdf",
  },
  {
    id: 2,
    name: "White Ash MDF",
    price: "₦28,000",
    slug: "white-ash-mdf",
  },
  {
    id: 3,
    name: "Premium Plywood",
    price: "₦30,000",
    slug: "premium-plywood",
  },
  {
    id: 4,
    name: "HDF Board",
    price: "₦27,000",
    slug: "hdf-board",
  },
];

const Materials = () => {
  return (
    <div className="pt-32 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="mb-20">
        <p className="uppercase tracking-[0.3em] text-white/50 mb-4">
          Materials
        </p>

        <h1 className="text-6xl font-bold">
          Explore
          <br />
          Premium Materials
        </h1>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            className="
            group
            block
            border
            border-white/10
            rounded-[32px]
            overflow-hidden
            hover:border-[#D4AF37]
            transition
            "
          >
            <div
              className="
              h-[350px]
              bg-zinc-900
              overflow-hidden
              "
            >
              <div
                className="
                w-full
                h-full
                bg-zinc-800
                group-hover:scale-110
                transition
                duration-500
                "
              />
            </div>

            <div className="p-6">
              <h3 className="font-bold text-xl">
                {product.name}
              </h3>

              <p className="text-white/50 mt-2">
                {product.price}
              </p>

              <p className="mt-6 text-[#D4AF37]">
                View Product →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Materials;