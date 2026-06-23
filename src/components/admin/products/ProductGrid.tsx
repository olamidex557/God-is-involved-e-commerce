import ProductCard from "./ProductCard";
import type {
  Product,
} from "../../../types/product";

interface Props {
  products: Product[];
  onDelete: (
    id: string
  ) => void;
}

const ProductGrid = ({
  products,
  onDelete,
}: Props) => {
  return (
    <div
      className="
      grid
      md:grid-cols-2
      xl:grid-cols-3
      gap-6
      "
    >
      {products.map(
        (product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={onDelete}
          />
        )
      )}
    </div>
  );
};

export default ProductGrid;
