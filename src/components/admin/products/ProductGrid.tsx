import ProductCard from "./ProductCard";

interface Props {
  products: any[];
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