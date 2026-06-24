import type {
  Product,
} from "../../../types/product";
import {
  getProductStartingPrice,
  getProductTotalStock,
} from "../../../types/product";

interface Props {
  product: Product;
  onDelete: (
    id: string
  ) => void;
  onEdit: (
    product: Product
  ) => void;
}

const ProductCard = ({
  product,
  onDelete,
  onEdit,
}: Props) => {
  const totalStock =
    getProductTotalStock(
      product
    );

  const startingPrice =
    getProductStartingPrice(
      product
    );

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

        <p className="mt-3 text-sm text-white/45">
          {totalStock} units across variants
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
            {startingPrice.toLocaleString()}
          </span>

          <div
            className="
    flex
    gap-2
    "
          >
            <button
              onClick={() =>
                onEdit(
                  product
                )
              }
              className="
      px-3
      py-1
      rounded-lg
      bg-blue-500/20
      text-blue-400
      text-sm
      "
            >
              Edit
            </button>

            <button
              onClick={() =>
                onDelete(
                  product._id
                )
              }
              className="
  px-3
  py-1
  rounded-lg
  bg-red-500/20
  text-red-400
  text-sm
  "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
