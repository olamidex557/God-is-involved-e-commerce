import { useState } from "react";

import ProductToolbar from "../../../components/admin/products/ProductToolbar";
import ProductFilters from "../../../components/admin/products/ProductFilters";
import ProductGrid from "../../../components/admin/products/ProductGrid";
import CreateProductModal from "../../../components/admin/products/CreateProductModal";

import { useAdminProducts } from "../../../hooks/products/useAdminProducts";

const ProductsAdmin = () => {
  const [open, setOpen] =
    useState(false);

  const {
    products,
    loading,
  } =
    useAdminProducts();

  return (
    <>
      <div className="mb-8">
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Products
        </h1>

        <p className="text-white/50 mt-2">
          Manage products,
          boards, fittings,
          accessories and
          inventory.
        </p>
      </div>

      <div
        className="
        flex
        flex-col
        gap-6
        "
      >
        <ProductToolbar
          onCreate={() =>
            setOpen(true)
          }
        />

        <ProductFilters />

        {loading ? (
          <div
            className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
            "
          >
            {[...Array(6)].map(
              (_, index) => (
                <div
                  key={index}
                  className="
                  h-[320px]
                  rounded-3xl
                  bg-white/5
                  animate-pulse
                  "
                />
              )
            )}
          </div>
        ) : (
          <ProductGrid
            products={products}
          />
        )}
      </div>

      <CreateProductModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </>
  );
};

export default ProductsAdmin;