import { Link } from "react-router-dom";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import { useCartStore } from "../../store/cartStore";

const Cart = () => {
  const items = useCartStore(
    (state) => state.items
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const updateQuantity =
    useCartStore(
      (state) =>
        state.updateQuantity
    );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const subtotal =
    items.reduce(
      (total, item) =>
        total +
        (item.unitPrice ??
          item.price) *
          item.quantity,
      0
    );

  return (
    <div className="pt-32 pb-32">
      <Container>
        {/* HEADER */}

        <div className="mb-16">
          <p
            className="
            uppercase
            tracking-[0.3em]
            text-[#D4AF37]
            mb-4
            "
          >
            Shopping Cart
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            "
          >
            Your Cart
          </h1>
        </div>

        {/* EMPTY CART */}

        {items.length === 0 ? (
          <div
            className="
            text-center
            py-24
            border
            border-white/10
            rounded-[40px]
            "
          >
            <h2 className="text-4xl font-bold">
              Your Cart Is Empty
            </h2>

            <p className="text-white/60 mt-6">
              Start exploring our
              premium materials.
            </p>

            <div className="mt-8">
              <Link to="/materials">
                <Button>
                  Browse Materials
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
            {/* ITEMS */}

            <div>
              <div className="space-y-6">
                {items.map((item) => (
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
                        md:w-36
                        h-36
                        rounded-2xl
                        bg-zinc-900
                        "
                      />

                      {/* INFO */}

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold">
                          {item.name}
                        </h3>

                        <p className="text-white/60 mt-2">
                          ₦
                          {(
                            item.unitPrice ??
                            item.price
                          ).toLocaleString()}
                        </p>

                        <p className="text-white/45 text-sm mt-1">
                          {item.color ?? "Default"} / {item.size ?? "Standard"}
                        </p>

                        {/* QUANTITY */}

                        <div className="flex items-center gap-3 mt-6">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity -
                                  1
                              )
                            }
                            className="
                            w-10
                            h-10
                            rounded-xl
                            border
                            border-white/10
                            "
                          >
                            -
                          </button>

                          <div
                            className="
                            w-12
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
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity +
                                  1
                              )
                            }
                            className="
                            w-10
                            h-10
                            rounded-xl
                            border
                            border-white/10
                            "
                          >
                            +
                          </button>
                        </div>

                        {/* TOTAL */}

                        <p className="mt-6 font-bold">
                          ₦
                          {(
                            (item.unitPrice ??
                              item.price) *
                            item.quantity
                          ).toLocaleString()}
                        </p>

                        {/* REMOVE */}

                        <button
                          onClick={() =>
                            removeItem(
                              item.id
                            )
                          }
                          className="
                          mt-4
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

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/materials">
                  <button
                    className="
                    border
                    border-white/10
                    rounded-full
                    px-8
                    py-4
                    "
                  >
                    Continue Shopping
                  </button>
                </Link>

                <button
                  onClick={clearCart}
                  className="
                  border
                  border-red-500/20
                  text-red-400
                  rounded-full
                  px-8
                  py-4
                  "
                >
                  Clear Cart
                </button>
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

                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="
                      flex
                      justify-between
                      text-sm
                      "
                    >
                      <span>
                        {item.name}
                      </span>

                      <span>
                        ₦
                        {(
                          (item.unitPrice ??
                            item.price) *
                          item.quantity
                        ).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="border-white/10 my-8" />

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>
                      Subtotal
                    </span>

                    <span>
                      ₦
                      {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Delivery
                    </span>

                    <span>
                      Calculated Later
                    </span>
                  </div>
                </div>

                <hr className="border-white/10 my-8" />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>

                  <span>
                    ₦
                    {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="mt-8">
                  <Link to="/checkout">
                    <Button className="w-full">
                      Proceed To Checkout
                    </Button>
                  </Link>
                </div>

                <p
                  className="
                  text-white/50
                  text-sm
                  mt-6
                  "
                >
                  Delivery charges will
                  be calculated based on
                  your location.
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cart;
