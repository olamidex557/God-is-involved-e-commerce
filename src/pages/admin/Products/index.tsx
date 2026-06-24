import { useState } from "react";

import ProductToolbar from "../../../components/admin/products/ProductToolbar";
import ProductFilters from "../../../components/admin/products/ProductFilters";
import ProductGrid from "../../../components/admin/products/ProductGrid";
import CreateProductModal from "../../../components/admin/products/CreateProductModal";
import EditProductModal from "../../../components/admin/products/EditProductModal";

import { useAdminProducts } from "../../../hooks/products/useAdminProducts";
import {
  deleteProduct,
} from "../../../services/api/adminProducts";
import type {
  Product,
} from "../../../types/product";

const ProductsAdmin = () => {
  const [open, setOpen] =
    useState(false);

  const [
    editingProduct,
    setEditingProduct,
  ] = useState<Product | null>(
    null
  );

  const {
    products,
    loading,
    fetchProducts,
  } =
    useAdminProducts();

  const handleDelete =
    async (
      id: string
    ) => {
      const confirmed =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmed)
        return;

      try {
        await deleteProduct(
          id
        );

        fetchProducts();
      } catch (
      error
      ) {
        console.error(
          error
        );
      }
    };

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
            onDelete={
              handleDelete
            }
            onEdit={
              setEditingProduct
            }
          />
        )}
      </div>

      <CreateProductModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        onCreated={
          fetchProducts
        }
      />

      <EditProductModal
        open={
          Boolean(
            editingProduct
          )
        }
        product={
          editingProduct
        }
        onClose={() =>
          setEditingProduct(
            null
          )
        }
        onUpdated={
          fetchProducts
        }
      />
    </>
  );
};

export default ProductsAdmin;
