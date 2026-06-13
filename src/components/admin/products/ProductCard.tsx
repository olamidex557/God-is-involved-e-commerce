interface Props {
  product: any;
}

const ProductCard = ({
  product,
}: Props) => {
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
      <div
        className="
        h-56
        overflow-hidden
        "
      >
        <img
          src={
            product.images?.[0] ||
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
          }
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
        <p
          className="
          text-[#D4AF37]
          text-sm
          "
        >
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

        <p
          className="
          text-white/60
          text-sm
          mt-2
          line-clamp-2
          "
        >
          {product.description}
        </p>

        <div
          className="
          mt-5
          flex
          justify-between
          items-center
          "
        >
          <span
            className="
            text-xl
            font-bold
            "
          >
            ₦
            {product.price?.toLocaleString()}
          </span>

          <span
            className="
            text-white/50
            text-sm
            "
          >
            {product.stock} pcs
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;