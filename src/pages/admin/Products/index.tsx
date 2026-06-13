import { useState } from "react";

import ProductToolbar from "../../../components/admin/products/ProductToolbar";
import ProductFilters from "../../../components/admin/products/ProductFilters";
import ProductGrid from "../../../components/admin/products/ProductGrid";
import CreateProductModal from "../../../components/admin/products/CreateProductModal";

const mockProducts = [
  {
    name: "Walnut MDF",
    category: "Boards",
    price: 25000,
    stock: 120,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
  },
  {
    name: "Oak Veneer",
    category: "Veneers",
    price: 18000,
    stock: 50,
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200",
  },
  {
    name: "Black Edge Tape",
    category: "Accessories",
    price: 3000,
    stock: 400,
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200",
  },
];

const ProductsAdmin = () => {
  const [open, setOpen] =
    useState(false);

  return (
    <>
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

        <ProductGrid
          products={
            mockProducts
          }
        />
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