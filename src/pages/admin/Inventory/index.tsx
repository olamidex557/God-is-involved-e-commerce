import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getProducts,
  updateProductStock,
} from "../../../services/api/adminProducts";

const Inventory = () => {
  const [
    products,
    setProducts,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    search,
    setSearch,
  ] = useState("");

  const loadProducts =
    async () => {
      try {
        const response =
          await getProducts();

        setProducts(
          response.products || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadProducts();
  }, []);

const adjustStock =
  async (
    id: string,
    currentStock: number,
    amount: number
  ) => {
    try {
      console.log(
        "Updating",
        id,
        currentStock,
        amount
      );

      const response =
        await updateProductStock(
          id,
          currentStock + amount
        );

      console.log(
        "SUCCESS",
        response
      );

      await loadProducts();
    } catch (error: any) {
      console.error(
        "UPDATE FAILED",
        error?.response?.data ||
          error
      );
    }
  };

  const filteredProducts =
    useMemo(() => {
      return products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [products, search]);

  const totalProducts =
    products.length;

  const healthyProducts =
    products.filter(
      (product) =>
        product.stock > 10
    ).length;

  const lowStockProducts =
    products.filter(
      (product) =>
        product.stock > 0 &&
        product.stock <= 10
    ).length;

  const outOfStockProducts =
    products.filter(
      (product) =>
        product.stock === 0
    ).length;

  const getStatus =
    (stock: number) => {
      if (stock === 0) {
        return {
          label:
            "Out Of Stock",
          color:
            "text-red-400",
          bg:
            "bg-red-500/10",
        };
      }

      if (stock <= 10) {
        return {
          label:
            "Low Stock",
          color:
            "text-yellow-400",
          bg:
            "bg-yellow-500/10",
        };
      }

      return {
        label: "Healthy",
        color:
          "text-green-400",
        bg:
          "bg-green-500/10",
      };
    };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Inventory
        </h1>

        <p className="text-white/50 mt-2">
          Monitor stock levels and
          inventory health.
        </p>
      </div>

      {/* KPI */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-white/50">
            Products
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalProducts}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-white/50">
            Healthy
          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-400">
            {healthyProducts}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-white/50">
            Low Stock
          </p>

          <h2 className="text-4xl font-bold mt-2 text-yellow-400">
            {lowStockProducts}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-white/50">
            Out Of Stock
          </p>

          <h2 className="text-4xl font-bold mt-2 text-red-400">
            {outOfStockProducts}
          </h2>
        </div>
      </div>

      {/* SEARCH */}

      <div className="mt-8">
        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search products..."
          className="
          w-full
          h-14
          px-5
          rounded-2xl
          bg-white/5
          border
          border-white/10
          outline-none
          "
        />
      </div>

      {/* TABLE */}

      <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-5 border-b border-white/10 font-semibold">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <div className="p-6">
            Loading...
          </div>
        ) : filteredProducts.length ===
          0 ? (
          <div className="p-6">
            No products found.
          </div>
        ) : (
          filteredProducts.map(
            (product) => {
              const status =
                getStatus(
                  product.stock
                );

              return (
                <div
                  key={
                    product._id
                  }
                  className="
                  grid
                  grid-cols-6
                  gap-4
                  p-5
                  border-b
                  border-white/10
                  items-center
                  "
                >
                  <span>
                    {
                      product.name
                    }
                  </span>

                  <span>
                    {
                      product.category
                    }
                  </span>

                  <span>
                    ₦
                    {product.price?.toLocaleString()}
                  </span>

                  <span>
                    {
                      product.stock
                    }
                  </span>

                  <span
                    className={`
                    px-3
                    py-2
                    rounded-full
                    text-center
                    ${status.bg}
                    ${status.color}
                    `}
                  >
                    {
                      status.label
                    }
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        adjustStock(
                          product._id,
                          product.stock,
                          10
                        )
                      }
                      className="
                      px-3
                      py-2
                      rounded-xl
                      bg-green-500/20
                      text-green-400
                      "
                    >
                      +10
                    </button>

                    <button
                      onClick={() =>
                        adjustStock(
                          product._id,
                          product.stock,
                          50
                        )
                      }
                      className="
                      px-3
                      py-2
                      rounded-xl
                      bg-blue-500/20
                      "
                    >
                      +50
                    </button>

                    <button
                      onClick={() =>
                        adjustStock(
                          product._id,
                          product.stock,
                          100
                        )
                      }
                      className="
                      px-3
                      py-2
                      rounded-xl
                      bg-[#D4AF37]/20
                      text-[#D4AF37]
                      "
                    >
                      +100
                    </button>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </>
  );
};

export default Inventory;