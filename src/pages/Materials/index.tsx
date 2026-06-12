import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Walnut MDF",
    price: "₦25,000",
    category: "MDF",
    slug: "walnut-mdf",
  },
  {
    id: 2,
    name: "White Ash MDF",
    price: "₦28,000",
    category: "MDF",
    slug: "white-ash-mdf",
  },
  {
    id: 3,
    name: "Premium Plywood",
    price: "₦30,000",
    category: "Plywood",
    slug: "premium-plywood",
  },
  {
    id: 4,
    name: "HDF Board",
    price: "₦27,000",
    category: "HDF",
    slug: "hdf-board",
  },
];

const Materials = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* HEADER */}

        <div className="mb-16">
          <p className="uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            Materials Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-bold">
            Premium
            <br />
            Materials
          </h1>

          <p className="text-white/60 mt-8 max-w-2xl">
            Explore MDF, HDF, plywood and furniture
            accessories for your next project.
          </p>
        </div>

        {/* SEARCH */}

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search materials..."
            className="
            w-full
            bg-zinc-900
            border
            border-white/10
            rounded-2xl
            p-5
            outline-none
            "
          />
        </div>

        {/* FILTERS */}

        <div className="flex gap-3 overflow-x-auto pb-4 mb-10">
          <button className="px-5 py-3 rounded-full bg-[#D4AF37] text-black whitespace-nowrap">
            All
          </button>

          <button className="px-5 py-3 rounded-full border border-white/10 whitespace-nowrap">
            MDF
          </button>

          <button className="px-5 py-3 rounded-full border border-white/10 whitespace-nowrap">
            HDF
          </button>

          <button className="px-5 py-3 rounded-full border border-white/10 whitespace-nowrap">
            Plywood
          </button>

          <button className="px-5 py-3 rounded-full border border-white/10 whitespace-nowrap">
            Accessories
          </button>
        </div>

        {/* PRODUCT COUNT */}

        <div className="mb-10 text-white/50">
          Showing {products.length} Products
        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="
              group
              block
              "
            >
              <div
                className="
                overflow-hidden
                rounded-[24px]
                border
                border-white/10
                "
              >
                <div
                  className="
                  h-[220px]
                  md:h-[320px]
                  bg-zinc-900
                  group-hover:scale-105
                  transition
                  duration-500
                  "
                />
              </div>

              <div className="mt-4">
                <p className="text-[#D4AF37] text-sm">
                  {product.category}
                </p>

                <h3 className="font-bold text-lg mt-1">
                  {product.name}
                </h3>

                <p className="text-white/60 mt-2">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}

        <div className="mt-24 border border-white/10 rounded-[40px] p-8 md:p-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Need Help Choosing
            Materials?
          </h2>

          <p className="text-white/60 mt-6 max-w-2xl">
            Generate a project quotation and get
            recommendations instantly.
          </p>

          <button
            className="
            mt-8
            bg-[#D4AF37]
            text-black
            px-8
            py-4
            rounded-full
            font-semibold
            "
          >
            Generate Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Materials;