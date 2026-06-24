import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getProducts,
  updateProductStock,
} from "../../../services/api/adminProducts";
import type {
  Product,
} from "../../../types/product";
import {
  getProductVariantSizes,
} from "../../../types/product";

interface InventoryRow {
  productId: string;
  productName: string;
  category: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
}

const Inventory = () => {
  const [
    products,
    setProducts,
  ] = useState<Product[]>([]);

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

  const rows =
    useMemo<InventoryRow[]>(
      () =>
        products.flatMap(
          (
            product
          ) =>
            getProductVariantSizes(
              product
            ).map(
              (
                size
              ) => ({
                productId:
                  product._id,
                productName:
                  product.name,
                category:
                  product.category,
                color:
                  size.color,
                size:
                  size.size,
                price:
                  size.price,
                stock:
                  size.stock,
                lowStockThreshold:
                  size.lowStockThreshold,
              })
            )
        ),
      [products]
    );

  const filteredRows =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return rows;
      }

      return rows.filter(
        (
          row
        ) =>
          [
            row.productName,
            row.category,
            row.color,
            row.size,
          ].some(
            (
              value
            ) =>
              value
                .toLowerCase()
                .includes(
                  query
                )
          )
      );
    }, [rows, search]);

  const adjustStock =
    async (
      row: InventoryRow,
      amount: number
    ) => {
      try {
        await updateProductStock(
          row.productId,
          Math.max(
            0,
            row.stock + amount
          ),
          row.color,
          row.size,
          row.lowStockThreshold
        );

        await loadProducts();
      } catch (error) {
        console.error(error);
      }
    };

  const setStockValue =
    async (
      row: InventoryRow
    ) => {
      const value =
        window.prompt(
          "Enter stock quantity",
          String(row.stock)
        );

      if (value === null) {
        return;
      }

      const stock =
        Number(value);

      if (
        !Number.isFinite(stock) ||
        stock < 0
      ) {
        window.alert(
          "Stock must be zero or greater."
        );

        return;
      }

      await updateProductStock(
        row.productId,
        stock,
        row.color,
        row.size,
        row.lowStockThreshold
      );

      await loadProducts();
    };

  const setThresholdValue =
    async (
      row: InventoryRow
    ) => {
      const value =
        window.prompt(
          "Enter low stock threshold",
          String(
            row.lowStockThreshold
          )
        );

      if (value === null) {
        return;
      }

      const threshold =
        Number(value);

      if (
        !Number.isFinite(
          threshold
        ) ||
        threshold < 0
      ) {
        window.alert(
          "Threshold must be zero or greater."
        );

        return;
      }

      await updateProductStock(
        row.productId,
        row.stock,
        row.color,
        row.size,
        threshold
      );

      await loadProducts();
    };

  const getStatus =
    (
      row: InventoryRow
    ) => {
      if (row.stock === 0) {
        return {
          label:
            "Out Of Stock",
          color:
            "text-red-400",
          bg:
            "bg-red-500/10",
        };
      }

      if (
        row.stock <=
        row.lowStockThreshold
      ) {
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

  const healthy =
    rows.filter(
      (
        row
      ) =>
        row.stock >
        row.lowStockThreshold
    ).length;

  const lowStock =
    rows.filter(
      (
        row
      ) =>
        row.stock > 0 &&
        row.stock <=
          row.lowStockThreshold
    ).length;

  const outOfStock =
    rows.filter(
      (
        row
      ) => row.stock === 0
    ).length;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Inventory
        </h1>

        <p className="mt-2 text-white/50">
          Monitor stock by product, color and size.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          [
            "Variant Sizes",
            rows.length,
            "text-white",
          ],
          [
            "Healthy",
            healthy,
            "text-green-400",
          ],
          [
            "Low Stock",
            lowStock,
            "text-yellow-400",
          ],
          [
            "Out Of Stock",
            outOfStock,
            "text-red-400",
          ],
        ].map(
          (
            [
              label,
              value,
              color,
            ]
          ) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-white/50">
                {label}
              </p>

              <h2
                className={`mt-2 text-4xl font-bold ${color}`}
              >
                {value}
              </h2>
            </div>
          )
        )}
      </div>

      <div className="mt-8">
        <input
          value={search}
          onChange={(
            event
          ) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Search product, color or size..."
          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 outline-none"
        />
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="grid gap-4 border-b border-white/10 p-5 font-semibold lg:grid-cols-7">
          <span>Product</span>
          <span>Color</span>
          <span>Size</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <div className="p-6">
            Loading...
          </div>
        ) : filteredRows.length ===
          0 ? (
          <div className="p-6">
            No inventory found.
          </div>
        ) : (
          filteredRows.map(
            (
              row
            ) => {
              const status =
                getStatus(
                  row
                );

              return (
                <div
                  key={`${row.productId}-${row.color}-${row.size}`}
                  className="grid gap-4 border-b border-white/10 p-5 last:border-0 lg:grid-cols-7 lg:items-center"
                >
                  <span>
                    {row.productName}
                    <span className="block text-sm text-white/45">
                      {row.category}
                    </span>
                  </span>

                  <span>
                    {row.color}
                  </span>

                  <span>
                    {row.size}
                  </span>

                  <span>
                    ₦
                    {row.price.toLocaleString()}
                  </span>

                  <span>
                    {row.stock} / threshold {row.lowStockThreshold}
                  </span>

                  <span
                    className={`rounded-full px-3 py-2 text-center ${status.bg} ${status.color}`}
                  >
                    {status.label}
                  </span>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        adjustStock(
                          row,
                          -10
                        )
                      }
                      className="rounded-xl bg-white/10 px-3 py-2 text-white/70"
                    >
                      -10
                    </button>

                    {[10, 50, 100].map(
                      (
                        amount
                      ) => (
                        <button
                          key={amount}
                          onClick={() =>
                            adjustStock(
                              row,
                              amount
                            )
                          }
                          className="rounded-xl bg-[#D4AF37]/20 px-3 py-2 text-[#D4AF37]"
                        >
                          +{amount}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        setStockValue(
                          row
                        )
                      }
                      className="rounded-xl border border-white/10 px-3 py-2 text-white/70"
                    >
                      Set Stock
                    </button>

                    <button
                      onClick={() =>
                        setThresholdValue(
                          row
                        )
                      }
                      className="rounded-xl border border-white/10 px-3 py-2 text-white/70"
                    >
                      Set Threshold
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
