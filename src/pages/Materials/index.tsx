import { Link } from "react-router-dom";

import Container from "../../components/ui/Container";
import { useProducts } from "../../hooks/useProducts";

const Materials = () => {
  const {
    products,
    loading,
  } = useProducts();

  return (
    <div className="pt-32 pb-32">
      <Container>
        {/* HEADER */}

        <div className="mb-20">
          <p
            className="
            uppercase
            tracking-[0.3em]
            text-[#D4AF37]
            mb-4
            "
          >
            Premium Collection
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            "
          >
            Materials
          </h1>

          <p
            className="
            text-white/60
            mt-6
            max-w-2xl
            "
          >
            Explore premium boards,
            fittings, accessories and
            materials curated for
            luxury interior projects.
          </p>
        </div>

        {/* LOADING */}

        {loading && (
          <div
            className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-6
            "
          >
            {[...Array(8)].map(
              (_, index) => (
                <div
                  key={index}
                  className="
                  h-[320px]
                  rounded-[32px]
                  bg-zinc-900
                  animate-pulse
                  "
                />
              )
            )}
          </div>
        )}

        {/* EMPTY STATE */}

        {!loading &&
          products.length === 0 && (
            <div
              className="
              text-center
              py-24
              border
              border-white/10
              rounded-[40px]
              "
            >
              <h2 className="text-3xl font-bold">
                No Products Yet
              </h2>

              <p className="text-white/60 mt-4">
                Products will appear here
                once added from the admin
                dashboard.
              </p>
            </div>
          )}

        {/* PRODUCTS */}

        {!loading &&
          products.length > 0 && (
            <div
              className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-6
              "
            >
              {products.map(
                (product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="
                    group
                    "
                  >
                    <div
                      className="
                      border
                      border-white/10
                      rounded-[32px]
                      overflow-hidden
                      bg-zinc-950
                      transition
                      duration-300
                      hover:border-[#D4AF37]
                      "
                    >
                      {/* IMAGE */}

                      <div
                        className="
                        h-[250px]
                        overflow-hidden
                        "
                      >
                        <img
                          src={
                            product
                              .images?.[0] ||
                            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
                          }
                          alt={
                            product.name
                          }
                          className="
                          w-full
                          h-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-110
                          "
                        />
                      </div>

                      {/* CONTENT */}

                      <div className="p-5">
                        <p
                          className="
                          text-[#D4AF37]
                          text-sm
                          mb-2
                          "
                        >
                          {
                            product.category
                          }
                        </p>

                        <h3
                          className="
                          text-lg
                          font-semibold
                          "
                        >
                          {product.name}
                        </h3>

                        <p
                          className="
                          text-white/60
                          text-sm
                          mt-2
                          line-clamp-2
                          "
                        >
                          {
                            product.description
                          }
                        </p>

                        <div className="mt-5 flex justify-between items-center">
                          <span
                            className="
                            text-xl
                            font-bold
                            "
                          >
                            ₦
                            {product.price.toLocaleString()}
                          </span>

                          <span
                            className="
                            text-sm
                            text-white/50
                            "
                          >
                            View →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
      </Container>
    </div>
  );
};

export default Materials;
