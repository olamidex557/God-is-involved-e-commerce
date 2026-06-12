import { useState } from "react";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import {
  calculateWardrobeQuote,
  QuoteResult,
} from "../../data/quoteCalculator";

import { useCartStore } from "../../store/cartStore";

const Quotation = () => {
  const [projectType, setProjectType] =
    useState("Wardrobe");

  const [width, setWidth] = useState("");

  const [height, setHeight] = useState("");

  const [depth, setDepth] = useState("");

  const [quote, setQuote] =
    useState<QuoteResult | null>(null);

  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  const generateQuote = () => {
    if (!width || !height) return;

    const result =
      calculateWardrobeQuote(
        Number(width),
        Number(height)
      );

    setQuote(result);
  };

  const addQuoteToCart = () => {
    if (!quote) return;

    addItem({
      id: "walnut-mdf",
      name: "Walnut MDF Board",
      price: 25000,
      quantity: quote.boards,
    });

    addItem({
      id: "soft-close-hinges",
      name: "Soft Close Hinges",
      price: 1200,
      quantity: quote.hinges,
    });

    addItem({
      id: "premium-handles",
      name: "Premium Handles",
      price: 3500,
      quantity: quote.handles,
    });

    addItem({
      id: "drawer-rails",
      name: "Drawer Rails",
      price: 5000,
      quantity: quote.rails,
    });

    alert(
      "Products added to cart successfully."
    );
  };

  return (
    <div className="pt-32 pb-32">
      <Container>
        {/* HEADER */}

        <div className="max-w-4xl">
          <p
            className="
            uppercase
            tracking-[0.3em]
            text-[#D4AF37]
            mb-4
            "
          >
            AI QUOTATION
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            "
          >
            Generate
            <br />
            Your Project Quote
          </h1>

          <p
            className="
            text-white/60
            text-lg
            mt-8
            "
          >
            Get material recommendations,
            accessories and estimated
            pricing instantly.
          </p>
        </div>

        {/* CONTENT */}

        <div className="grid lg:grid-cols-2 gap-10 mt-20">
          {/* FORM */}

          <div
            className="
            border
            border-white/10
            rounded-[40px]
            p-8
            "
          >
            <h2 className="text-3xl font-bold mb-8">
              Project Details
            </h2>

            <div className="space-y-6">
              <select
                value={projectType}
                onChange={(e) =>
                  setProjectType(
                    e.target.value
                  )
                }
                className="
                w-full
                bg-zinc-900
                rounded-2xl
                p-5
                outline-none
                "
              >
                <option>
                  Wardrobe
                </option>

                <option>
                  Kitchen
                </option>

                <option>
                  TV Console
                </option>

                <option>
                  Office Table
                </option>
              </select>

              <input
                type="number"
                placeholder="Width (mm)"
                value={width}
                onChange={(e) =>
                  setWidth(
                    e.target.value
                  )
                }
                className="
                w-full
                bg-zinc-900
                rounded-2xl
                p-5
                outline-none
                "
              />

              <input
                type="number"
                placeholder="Height (mm)"
                value={height}
                onChange={(e) =>
                  setHeight(
                    e.target.value
                  )
                }
                className="
                w-full
                bg-zinc-900
                rounded-2xl
                p-5
                outline-none
                "
              />

              <input
                type="number"
                placeholder="Depth (mm)"
                value={depth}
                onChange={(e) =>
                  setDepth(
                    e.target.value
                  )
                }
                className="
                w-full
                bg-zinc-900
                rounded-2xl
                p-5
                outline-none
                "
              />

              <Button
                onClick={generateQuote}
                className="w-full"
              >
                Generate Quote
              </Button>
            </div>
          </div>

          {/* RESULT */}

          <div
            className="
            border
            border-white/10
            rounded-[40px]
            p-8
            "
          >
            <h2 className="text-3xl font-bold mb-8">
              Quote Result
            </h2>

            {!quote ? (
              <p className="text-white/50">
                Generate a quote to see
                recommendations.
              </p>
            ) : (
              <>
                {/* PRODUCTS */}

                <div>
                  <h3 className="text-xl font-bold mb-6">
                    Recommended Products
                  </h3>

                  <div className="space-y-5">
                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <div>
                        <p className="font-medium">
                          Walnut MDF Board
                        </p>

                        <p className="text-sm text-white/50">
                          {quote.boards} Sheets ×
                          ₦25,000
                        </p>
                      </div>

                      <p>
                        ₦
                        {quote.totals.boardsTotal.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <div>
                        <p className="font-medium">
                          Soft Close Hinges
                        </p>

                        <p className="text-sm text-white/50">
                          {quote.hinges} Pieces ×
                          ₦1,200
                        </p>
                      </div>

                      <p>
                        ₦
                        {quote.totals.hingesTotal.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <div>
                        <p className="font-medium">
                          Premium Handles
                        </p>

                        <p className="text-sm text-white/50">
                          {quote.handles} Pieces ×
                          ₦3,500
                        </p>
                      </div>

                      <p>
                        ₦
                        {quote.totals.handlesTotal.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          Drawer Rails
                        </p>

                        <p className="text-sm text-white/50">
                          {quote.rails} Sets ×
                          ₦5,000
                        </p>
                      </div>

                      <p>
                        ₦
                        {quote.totals.railsTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-white/10 my-8" />

                {/* PROJECT SUMMARY */}

                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Project Summary
                  </h3>

                  <div className="space-y-3 text-white/70">
                    <div className="flex justify-between">
                      <span>Project</span>
                      <span>{projectType}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Width</span>
                      <span>{width} mm</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Height</span>
                      <span>{height} mm</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Depth</span>
                      <span>{depth} mm</span>
                    </div>
                  </div>
                </div>

                {/* AI RECOMMENDATION */}

                <div
                  className="
                  mt-8
                  border
                  border-[#D4AF37]/20
                  bg-[#D4AF37]/5
                  rounded-[24px]
                  p-6
                  "
                >
                  <h3 className="font-bold mb-3">
                    AI Recommendation
                  </h3>

                  <p className="text-white/70">
                    18mm MDF is recommended
                    for this project size.
                    Soft-close hinges are also
                    recommended for better
                    durability and premium
                    finishing.
                  </p>
                </div>

                <hr className="border-white/10 my-8" />

                {/* TOTAL */}

                <div className="flex justify-between text-2xl font-bold">
                  <span>
                    Estimated Total
                  </span>

                  <span>
                    ₦
                    {quote.estimatedCost.toLocaleString()}
                  </span>
                </div>

                {/* ACTIONS */}

                <div className="grid gap-4 mt-10">
                  <Button
                    className="w-full"
                    onClick={addQuoteToCart}
                  >
                    Add All To Cart
                  </Button>

                  <button
                    className="
                    border
                    border-white/10
                    rounded-full
                    py-4
                    "
                  >
                    Save Quote
                  </button>

                  <button
                    className="
                    border
                    border-white/10
                    rounded-full
                    py-4
                    "
                  >
                    Download PDF
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Quotation;