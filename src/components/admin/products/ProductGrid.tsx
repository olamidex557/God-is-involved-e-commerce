import ProductCard from "./ProductCard";

interface Props {
  products: any[];
}

const ProductGrid = ({
  products,
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
        (product, index) => (
          <ProductCard
            key={index}
            product={product}
          />
        )
      )}
    </div>
  );
};

export default ProductGrid;