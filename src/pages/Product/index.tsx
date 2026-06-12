import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import mockProduct from "../../data/mockProduct";

const Product = () => {
  const { slug } = useParams();

console.log(slug);

  // Later:
  // const { data: product } = useProduct(slug);

  const product = mockProduct;

  const [activeImage, setActiveImage] = useState(
    product.images[0]
  );

  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]
  );

  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0]
  );

  const [selectedThickness, setSelectedThickness] =
    useState(product.thicknesses[0]);

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="pt-32 pb-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* GALLERY */}

          <div>
            <div className="overflow-hidden rounded-[32px] border border-white/10">
              <img
                src={activeImage}
                alt={product.name}
                className="
                w-full
                h-[400px]
                md:h-[650px]
                object-cover
                transition
                duration-500
                hover:scale-110
                cursor-zoom-in
                "
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-5">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(image)}
                  className={`
                    overflow-hidden
                    rounded-2xl
                    border
                    ${
                      activeImage === image
                        ? "border-[#D4AF37]"
                        : "border-white/10"
                    }
                  `}
                >
                  <img
                    src={image}
                    alt=""
                    className="
                    h-24
                    w-full
                    object-cover
                    "
                  />
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT INFO */}

          <div>
            <p className="uppercase tracking-[0.3em] text-[#D4AF37]">
              Premium Collection
            </p>

            <h1 className="text-4xl md:text-6xl font-bold mt-4">
              {product.name}
            </h1>

            <p className="text-3xl font-bold mt-8">
              ₦{product.price.toLocaleString()}
            </p>

            <p className="text-white/60 mt-8 leading-8">
              {product.description}
            </p>

            {/* COLOR */}

            <div className="mt-12">
              <h3 className="font-semibold mb-4">
                Colour
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setSelectedColor(color)
                    }
                    className={`
                      px-5
                      py-3
                      rounded-full
                      border
                      transition
                      ${
                        selectedColor === color
                          ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                          : "border-white/10"
                      }
                    `}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE */}

            <div className="mt-10">
              <h3 className="font-semibold mb-4">
                Sheet Size
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSize(size)
                    }
                    className={`
                      px-5
                      py-3
                      rounded-full
                      border
                      transition
                      ${
                        selectedSize === size
                          ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                          : "border-white/10"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* THICKNESS */}

            <div className="mt-10">
              <h3 className="font-semibold mb-4">
                Thickness
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.thicknesses.map(
                  (thickness) => (
                    <button
                      key={thickness}
                      onClick={() =>
                        setSelectedThickness(
                          thickness
                        )
                      }
                      className={`
                        px-5
                        py-3
                        rounded-full
                        border
                        transition
                        ${
                          selectedThickness ===
                          thickness
                            ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                            : "border-white/10"
                        }
                      `}
                    >
                      {thickness}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* QUANTITY */}

            <div className="mt-10">
              <h3 className="font-semibold mb-4">
                Quantity
              </h3>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    quantity > 1 &&
                    setQuantity(quantity - 1)
                  }
                  className="
                  w-12
                  h-12
                  rounded-xl
                  border
                  border-white/10
                  "
                >
                  −
                </button>

                <div
                  className="
                  w-12
                  h-12
                  rounded-xl
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  "
                >
                  {quantity}
                </div>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="
                  w-12
                  h-12
                  rounded-xl
                  border
                  border-white/10
                  "
                >
                  +
                </button>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <button
                className="
                bg-[#D4AF37]
                text-black
                px-8
                py-4
                rounded-full
                font-semibold
                "
              >
                Add To Cart
              </button>

              <button
                className="
                border
                border-white/10
                px-8
                py-4
                rounded-full
                "
              >
                Generate Quote
              </button>
            </div>

            {/* TRUST */}

            <div className="mt-12 space-y-3 text-white/60">
              <p>✓ Nationwide Delivery</p>
              <p>✓ Secure Payment</p>
              <p>✓ Quality Guaranteed</p>
              <p>✓ Professional Support</p>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}

        <div className="mt-32">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">
            Product Details
          </h2>

          <div className="border border-white/10 rounded-[32px] p-8">
            <p className="text-white/70 leading-8">
              {product.description}
            </p>
          </div>
        </div>

        {/* SPECIFICATIONS */}

        <div className="mt-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">
            Specifications
          </h2>

          <div className="border border-white/10 rounded-[32px] overflow-hidden">
            <div className="grid grid-cols-2 p-6 border-b border-white/10">
              <span>Material Type</span>
              <span>MDF Board</span>
            </div>

            <div className="grid grid-cols-2 p-6 border-b border-white/10">
              <span>Selected Colour</span>
              <span>{selectedColor}</span>
            </div>

            <div className="grid grid-cols-2 p-6 border-b border-white/10">
              <span>Selected Size</span>
              <span>{selectedSize}</span>
            </div>

            <div className="grid grid-cols-2 p-6">
              <span>Thickness</span>
              <span>{selectedThickness}</span>
            </div>
          </div>
        </div>

        {/* ACCESSORIES */}

        <div className="mt-32">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">
            Frequently Bought Together
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Edge Banding",
              "Soft Close Hinges",
              "Handles",
            ].map((item) => (
              <div
                key={item}
                className="
                border
                border-white/10
                rounded-[32px]
                p-6
                "
              >
                <div className="h-48 bg-zinc-900 rounded-2xl mb-5" />

                <h3 className="font-bold text-xl">
                  {item}
                </h3>

                <p className="text-white/60 mt-2">
                  ₦5,000
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;