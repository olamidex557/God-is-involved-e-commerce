import Container from "../../components/ui/Container";

const Cart = () => {
  return (
    <div className="pt-32 pb-32">
      <Container>
        <div className="mb-16">
          <p className="uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            Shopping Cart
          </p>

          <h1 className="text-6xl font-bold">
            Your Cart
          </h1>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
          {/* CART ITEMS */}

          <div className="space-y-6">
            <div className="border border-white/10 rounded-[32px] p-6 flex gap-6">
              <div className="w-40 h-40 bg-zinc-900 rounded-2xl"></div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold">
                  Walnut MDF
                </h3>

                <p className="text-white/50 mt-2">
                  18mm • 4ft × 8ft
                </p>

                <p className="mt-4 text-xl font-semibold">
                  ₦25,000
                </p>

                <div className="flex gap-3 mt-6">
                  <button className="border border-white/10 px-4 py-2 rounded-xl">
                    -
                  </button>

                  <span className="px-4 py-2">
                    1
                  </span>

                  <button className="border border-white/10 px-4 py-2 rounded-xl">
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-dashed border-white/20 rounded-[32px] p-8">
              <h3 className="text-2xl font-bold mb-4">
                Recommended Accessories
              </h3>

              <p className="text-white/60">
                Edge Banding, Hinges,
                Handles and Adhesives.
              </p>
            </div>
          </div>

          {/* ORDER SUMMARY */}

          <div className="border border-white/10 rounded-[32px] p-8 h-fit sticky top-32">
            <h3 className="text-2xl font-bold mb-8">
              Order Summary
            </h3>

            <div className="space-y-5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦25,000</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>Calculated Later</span>
              </div>

              <hr className="border-white/10" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₦25,000</span>
              </div>
            </div>

            <button className="w-full bg-[#D4AF37] text-black py-4 rounded-full mt-10 font-semibold">
              Proceed To Checkout
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;