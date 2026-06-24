import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Container from "../../components/ui/Container";

import Button from "../../components/ui/Button";

import {
  useProduct,
} from "../../hooks/useProduct";
import {
  getProductVariants,
} from "../../types/product";

import {
  useCartStore,
} from "../../store/cartStore";

import toast
  from "react-hot-toast";

const Product = () => {
  const { id } =
    useParams();

  const {
    product,
    loading,
  } = useProduct(
    id as string
  );

  const addToCart =
    useCartStore(
      (state) =>
        state.addItem
    );

  const [
    activeImage,
    setActiveImage,
  ] = useState(0);

  const [
    selectedColor,
    setSelectedColor,
  ] = useState("");

  const [
    selectedSize,
    setSelectedSize,
  ] = useState("");

  const variants =
    useMemo(
      () =>
        product
          ? getProductVariants(
              product
            )
          : [],
      [product]
    );

  const selectedVariant =
    variants.find(
      (
        variant
      ) =>
        variant.color ===
        selectedColor
    ) ?? variants[0];

  const selectedSizeOption =
    selectedVariant?.sizes.find(
      (
        size
      ) =>
        size.size ===
        selectedSize
    ) ?? selectedVariant?.sizes[0];

  useEffect(() => {
    if (
      !selectedColor &&
      variants[0]
    ) {
      setSelectedColor(
        variants[0].color
      );
    }
  }, [selectedColor, variants]);

  useEffect(() => {
    if (
      selectedVariant &&
      !selectedVariant.sizes.some(
        (
          size
        ) =>
          size.size ===
          selectedSize
      )
    ) {
      setSelectedSize(
        selectedVariant.sizes[0]
          ?.size ?? ""
      );
    }
  }, [
    selectedSize,
    selectedVariant,
  ]);

  if (loading) {
    return (
      <div className="pt-32 text-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 text-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32">
      <Container>
        <div
          className="
          grid
          lg:grid-cols-2
          gap-12
          "
        >
          {/* GALLERY */}

          <div>
            <div
              className="
              overflow-hidden
              rounded-[40px]
              border
              border-white/10
              "
            >
              <img
                src={
                  product.images?.[
                  activeImage
                  ] ||
                  "https://picsum.photos/1000"
                }
                alt={
                  product.name
                }
                className="
                w-full
                h-[600px]
                object-cover
                hover:scale-110
                transition
                duration-700
                "
              />
            </div>

            <div
              className="
              flex
              gap-4
              mt-4
              overflow-x-auto
              "
            >
              {product.images?.map(
                (
                  image: string,
                  index: number
                ) => (
                  <button
                    key={index}
                    onClick={() =>
                      setActiveImage(
                        index
                      )
                    }
                    className={`
                      w-24
                      h-24
                      rounded-xl
                      overflow-hidden
                      border
                      ${activeImage ===
                        index
                        ? "border-[#D4AF37]"
                        : "border-white/10"
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt=""
                      className="
                      w-full
                      h-full
                      object-cover
                      "
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* INFO */}

          <div>
            <p
              className="
              text-[#D4AF37]
              uppercase
              tracking-[0.2em]
              "
            >
              {
                product.category
              }
            </p>

            <h1
              className="
              text-5xl
              font-bold
              mt-4
              "
            >
              {product.name}
            </h1>

            <p
              className="
              text-4xl
              font-bold
              mt-6
              "
            >
              ₦
              {(
                selectedSizeOption?.price ??
                product.price
              ).toLocaleString()}
            </p>

            <p
              className="
              text-white/60
              mt-8
              leading-relaxed
              "
            >
              {
                product.description
              }
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/45">
                  Color
                </p>

                <div className="flex flex-wrap gap-3">
                  {variants.map(
                    (
                      variant
                    ) => (
                      <button
                        key={
                          variant.color
                        }
                        type="button"
                        onClick={() =>
                          setSelectedColor(
                            variant.color
                          )
                        }
                        className={`
                        rounded-full
                        border
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        transition
                        ${selectedColor ===
                          variant.color
                          ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                          : "border-white/10 text-white hover:border-[#D4AF37]/60"
                        }
                        `}
                      >
                        {variant.color}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/45">
                  Size
                </p>

                <div className="flex flex-wrap gap-3">
                  {selectedVariant?.sizes.map(
                    (
                      size
                    ) => (
                      <button
                        key={
                          size.size
                        }
                        type="button"
                        onClick={() =>
                          setSelectedSize(
                            size.size
                          )
                        }
                        className={`
                        rounded-full
                        border
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        transition
                        ${selectedSize ===
                          size.size
                          ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                          : "border-white/10 text-white hover:border-[#D4AF37]/60"
                        }
                        `}
                      >
                        {size.size}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <span
                className={
                  selectedSizeOption &&
                  selectedSizeOption.stock >
                    0
                    ? "text-green-500"
                    : "text-red-400"
                }
              >
                {selectedSizeOption &&
                selectedSizeOption.stock >
                  0
                  ? "In Stock"
                  : "Out Of Stock"}
              </span>

              {" • "}

              <span>
                {
                  selectedSizeOption?.stock ??
                  0
                }{" "}
                available
              </span>

              {selectedSizeOption &&
                selectedSizeOption.stock >
                  0 &&
                selectedSizeOption.stock <=
                  selectedSizeOption.lowStockThreshold && (
                  <p className="mt-2 text-sm text-yellow-400">
                    Low stock for this color and size.
                  </p>
                )}
            </div>

            <div
              className="
              mt-10
              "
            >
              <Button
                disabled={
                  !selectedSizeOption ||
                  selectedSizeOption.stock <=
                    0
                }
                onClick={() => {
                  if (
                    !selectedVariant ||
                    !selectedSizeOption
                  ) {
                    return;
                  }

                  addToCart({
                    id: `${product._id}-${selectedVariant.color}-${selectedSizeOption.size}`,
                    productId:
                      product._id,
                    name: product.name,
                    color:
                      selectedVariant.color,
                    size:
                      selectedSizeOption.size,
                    unitPrice:
                      selectedSizeOption.price,
                    price:
                      selectedSizeOption.price,
                    image:
                      product.images?.[0],
                    quantity: 1,
                  });

                  toast.success(
                    `${product.name} added to cart`
                  );
                }}
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;
