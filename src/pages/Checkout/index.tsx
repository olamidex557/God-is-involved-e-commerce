import Container from "../../components/ui/Container";

const Checkout = () => {
  return (
    <div className="pt-32 pb-32">
      <Container>
        <div className="mb-16">
          <p className="uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            Checkout
          </p>

          <h1 className="text-6xl font-bold">
            Complete
            <br />
            Your Order
          </h1>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
          {/* LEFT */}

          <div className="space-y-8">
            {/* DELIVERY ADDRESS */}

            <div className="border border-white/10 rounded-[32px] p-8">
              <h2 className="text-2xl font-bold mb-8">
                Delivery Address
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="bg-zinc-900 rounded-2xl p-4 outline-none"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="bg-zinc-900 rounded-2xl p-4 outline-none"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-zinc-900 rounded-2xl p-4 outline-none md:col-span-2"
                />

                <input
                  type="text"
                  placeholder="Street Address"
                  className="bg-zinc-900 rounded-2xl p-4 outline-none md:col-span-2"
                />

                <input
                  type="text"
                  placeholder="City"
                  className="bg-zinc-900 rounded-2xl p-4 outline-none"
                />

                <input
                  type="text"
                  placeholder="State"
                  className="bg-zinc-900 rounded-2xl p-4 outline-none"
                />
              </div>
            </div>

            {/* DELIVERY MAP */}

            <div className="border border-white/10 rounded-[32px] p-8">
              <h2 className="text-2xl font-bold mb-6">
                Delivery Location
              </h2>

              <div className="h-[350px] bg-zinc-900 rounded-3xl flex items-center justify-center text-white/40">
                Google Maps Integration Here
              </div>

              <p className="mt-6 text-white/60">
                Delivery fee will be calculated automatically
                based on your location.
              </p>
            </div>

            {/* PAYMENT */}

            <div className="border border-white/10 rounded-[32px] p-8">
              <h2 className="text-2xl font-bold mb-8">
                Payment Method
              </h2>

              <div className="space-y-4">
                <label className="flex items-center gap-4 border border-white/10 rounded-2xl p-5 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked />
                  <span>Paystack</span>
                </label>

                <label className="flex items-center gap-4 border border-white/10 rounded-2xl p-5 cursor-pointer">
                  <input type="radio" name="payment" disabled />
                  <span className="text-white/50">
                    Monnify (Coming Soon)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="sticky top-32 h-fit">
            <div className="border border-white/10 rounded-[32px] p-8">
              <h2 className="text-2xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between">
                  <span>Walnut MDF</span>
                  <span>₦25,000</span>
                </div>

                <div className="flex justify-between">
                  <span>Accessories</span>
                  <span>₦10,000</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>Calculated</span>
                </div>

                <hr className="border-white/10" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₦35,000</span>
                </div>
              </div>

              <button
                className="
                w-full
                mt-10
                bg-[#D4AF37]
                text-black
                py-4
                rounded-full
                font-semibold
                hover:opacity-90
                transition
                "
              >
                Pay Now
              </button>

              <p className="mt-4 text-center text-white/40 text-sm">
                Secure payment powered by Paystack
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;