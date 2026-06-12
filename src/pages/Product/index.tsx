import { useState } from "react";
import Container from "../../components/ui/Container";

const Product = () => {
  const [selectedColor, setSelectedColor] =
    useState("Walnut");

  const [selectedSize, setSelectedSize] =
    useState("4ft × 8ft");

  const [selectedThickness, setSelectedThickness] =
    useState("18mm");

  const colors = [
    "Walnut",
    "White Ash",
    "Oak",
    "Mahogany",
    "Black",
  ];

  const sizes = [
    "4ft × 8ft",
    "4ft × 6ft",
    "4ft × 4ft",
    "4ft × 2ft",
    "2ft × 8ft",
  ];

  const thicknesses = [
    "3mm",
    "6mm",
    "9mm",
    "12mm",
    "18mm",
    "25mm",
  ];

  return (
    <div className="pt-32 pb-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT */}

          <div>
            <div className="h-[650px] bg-zinc-900 rounded-[32px]" />

            <div className="grid grid-cols-4 gap-4 mt-5">
              <div className="h-28 bg-zinc-900 rounded-2xl" />
              <div className="h-28 bg-zinc-900 rounded-2xl" />
              <div className="h-28 bg-zinc-900 rounded-2xl" />
              <div className="h-28 bg-zinc-900 rounded-2xl" />
            </div>
          </div>

          {/* RIGHT */}

          <div>
            <p className="uppercase tracking-[0.3em] text-[#D4AF37]">
              Premium Material
            </p>

            <h1 className="text-6xl font-bold mt-4">
              Walnut MDF
            </h1>

            <p className="text-3xl font-bold mt-6">
              ₦25,000
            </p>

            <p className="text-white/60 mt-8 leading-8">
              Premium quality MDF board ideal for
              wardrobes, kitchen cabinets, TV consoles,
              office furniture and interior projects.
            </p>

            {/* COLOR */}

            <div className="mt-12">
              <h3 className="font-semibold mb-4">
                Color
              </h3>

              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setSelectedColor(color)
                    }
                    className={`px-5 py-3 rounded-full border ${
                      selectedColor === color
                        ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                        : "border-white/10"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE */}

            <div className="mt-10">
              <h3 className="font-semibold mb-4">
                Size
              </h3>

              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSize(size)
                    }
                    className={`px-5 py-3 rounded-full border ${
                      selectedSize === size
                        ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                        : "border-white/10"
                    }`}
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
                {thicknesses.map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      setSelectedThickness(item)
                    }
                    className={`px-5 py-3 rounded-full border ${
                      selectedThickness === item
                        ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                        : "border-white/10"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}

            <div className="mt-10">
              <h3 className="font-semibold mb-4">
                Quantity
              </h3>

              <div className="flex gap-4">
                <button className="w-12 h-12 border border-white/10 rounded-xl">
                  -
                </button>

                <div className="w-12 h-12 border border-white/10 rounded-xl flex items-center justify-center">
                  1
                </div>

                <button className="w-12 h-12 border border-white/10 rounded-xl">
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-4 mt-12">
              <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-semibold">
                Add To Cart
              </button>

              <button className="border border-white/10 px-8 py-4 rounded-full">
                Generate Quote
              </button>
            </div>
          </div>
        </div>

        {/* SPECIFICATIONS */}

        <div className="mt-32">
          <h2 className="text-5xl font-bold mb-12">
            Specifications
          </h2>

          <div className="border border-white/10 rounded-[32px] overflow-hidden">
            <div className="grid grid-cols-2 border-b border-white/10 p-6">
              <span>Material Type</span>
              <span>MDF Board</span>
            </div>

            <div className="grid grid-cols-2 border-b border-white/10 p-6">
              <span>Color</span>
              <span>{selectedColor}</span>
            </div>

            <div className="grid grid-cols-2 border-b border-white/10 p-6">
              <span>Size</span>
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
          <h2 className="text-5xl font-bold mb-12">
            Frequently Bought Together
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-white/10 rounded-[32px] p-8">
              <div className="h-48 bg-zinc-900 rounded-2xl mb-6" />

              <h3 className="text-xl font-bold">
                Edge Banding
              </h3>

              <p className="text-white/60 mt-2">
                ₦5,000
              </p>
            </div>

            <div className="border border-white/10 rounded-[32px] p-8">
              <div className="h-48 bg-zinc-900 rounded-2xl mb-6" />

              <h3 className="text-xl font-bold">
                Handles
              </h3>

              <p className="text-white/60 mt-2">
                ₦7,500
              </p>
            </div>

            <div className="border border-white/10 rounded-[32px] p-8">
              <div className="h-48 bg-zinc-900 rounded-2xl mb-6" />

              <h3 className="text-xl font-bold">
                Hinges
              </h3>

              <p className="text-white/60 mt-2">
                ₦12,000
              </p>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}

        <div className="mt-32">
          <h2 className="text-5xl font-bold mb-12">
            Related Materials
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="border border-white/10 rounded-[32px] p-6"
              >
                <div className="h-56 bg-zinc-900 rounded-2xl mb-6" />

                <h3 className="font-bold">
                  Premium MDF
                </h3>

                <p className="text-white/60 mt-2">
                  ₦25,000
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