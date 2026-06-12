import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";

const cartItems = [
  {
    id: 1,
    name: "Walnut MDF Board",
    size: "4ft × 8ft",
    thickness: "18mm",
    price: 25000,
    quantity: 2,
  },
];

const Cart = () => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="pt-32 pb-32">
      <Container>
        {/* HEADER */}

        <div className="mb-16">
          <p className="uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            Shopping Cart
          </p>

          <h1 className="text-5xl md:text-7xl font-bold">
            Your Cart
          </h1>
        </div>

        {/* EMPTY STATE */}

        {cartItems.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-4xl font-bold">
              Your cart is empty
            </h2>

            <p className="text-white/60 mt-6">
              Explore our premium materials collection.
            </p>

            <Link
              to="/materials"
              className="
              inline-block
              mt-8
              bg-[#D4AF37]
              text-black
              px-8
              py-4
              rounded-full
              font-semibold
              "
            >
              Browse Materials
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
            {/* ITEMS */}

            <div>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="
                    border
                    border-white/10
                    rounded-[32px]
                    p-6
                    "
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* IMAGE */}

                      <div
                        className="
                        w-full
                        md:w-40
                        h-40
                        bg-zinc-900
                        rounded-2xl
                        "
                      />

                      {/* INFO */}

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold">
                          {item.name}
                        </h3>

                        <p className="text-white/50 mt-2">
                          {item.size} • {item.thickness}
                        </p>

                        <p className="mt-4 text-xl font-semibold">
                          ₦
                          {item.price.toLocaleString()}
                        </p>

                        {/* QUANTITY */}

                        <div className="flex items-center gap-3 mt-6">
                          <button
                            className="
                            w-10
                            h-10
                            border
                            border-white/10
                            rounded-xl
                            "
                          >
                            −
                          </button>

                          <div
                            className="
                            w-10
                            h-10
                            flex
                            items-center
                            justify-center
                            border
                            border-white/10
                            rounded-xl
                            "
                          >
                            {item.quantity}
                          </div>

                          <button
                            className="
                            w-10
                            h-10
                            border
                            border-white/10
                            rounded-xl
                            "
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="
                          mt-6
                          text-red-400
                          "
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CONTINUE SHOPPING */}

              <Link
                to="/materials"
                className="
                inline-block
                mt-8
                border
                border-white/10
                px-8
                py-4
                rounded-full
                "
              >
                Continue Shopping
              </Link>

              {/* ACCESSORIES */}

              <div className="mt-20">
                <h2 className="text-3xl font-bold mb-8">
                  Frequently Bought Together
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    "Edge Banding",
                    "Handles",
                    "Soft Close Hinges",
                  ].map((item) => (
                    <div
                      key={item}
                      className="
                      border
                      border-white/10
                      rounded-[24px]
                      p-5
                      "
                    >
                      <div className="h-40 bg-zinc-900 rounded-2xl mb-4" />

                      <h3 className="font-semibold">
                        {item}
                      </h3>

                      <p className="text-white/60 mt-2">
                        ₦5,000
                      </p>

                      <button
                        className="
                        mt-4
                        text-[#D4AF37]
                        "
                      >
                        Add To Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SUMMARY */}

            <div>
              <div
                className="
                sticky
                top-32
                border
                border-white/10
                rounded-[32px]
                p-8
                "
              >
                <h2 className="text-2xl font-bold mb-8">
                  Order Summary
                </h2>

                <div className="space-y-5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>

                    <span>
                      ₦
                      {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>

                    <span>Calculated at Checkout</span>
                  </div>

                  <hr className="border-white/10" />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>

                    <span>
                      ₦
                      {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* DELIVERY */}

                <div
                  className="
                  mt-8
                  p-5
                  rounded-2xl
                  bg-zinc-900
                  "
                >
                  <p className="text-sm text-white/60">
                    Delivery fee is calculated using
                    distance from our store at
                    419 Oke-Aro Road.
                  </p>
                </div>

                <Link
                  to="/checkout"
                  className="
                  block
                  text-center
                  mt-8
                  bg-[#D4AF37]
                  text-black
                  py-4
                  rounded-full
                  font-semibold
                  "
                >
                  Proceed To Checkout
                </Link>

                <button
                  className="
                  w-full
                  mt-4
                  border
                  border-white/10
                  py-4
                  rounded-full
                  "
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cart;