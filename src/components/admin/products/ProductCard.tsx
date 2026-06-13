interface ProductCardProps {
  product: {
    name: string;
    category: string;
    price: number;
    stock: number;
    image: string;
  };
}

const ProductCard = ({
  product,
}: ProductCardProps) => {
  return (
    <div
      className="
      group
      bg-white/[0.03]
      border
      border-white/10
      rounded-3xl
      overflow-hidden
      transition-all
      duration-300
      hover:border-[#D4AF37]
      hover:-translate-y-1
      "
    >
      <div className="h-56">
        <img
          src={product.image}
          alt={product.name}
          className="
          w-full
          h-full
          object-cover
          transition
          duration-700
          group-hover:scale-105
          "
        />
      </div>

      <div className="p-5">
        <p className="text-[#D4AF37] text-sm">
          {product.category}
        </p>

        <h3
          className="
          text-lg
          font-semibold
          mt-2
          "
        >
          {product.name}
        </h3>

        <div
          className="
          flex
          justify-between
          mt-4
          "
        >
          <span>
            ₦
            {product.price.toLocaleString()}
          </span>

          <span className="text-white/60">
            {product.stock} pcs
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;