import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import { useCartStore } from "../../store/cartStore";

const Checkout = () => {
  const items = useCartStore(
    (state) => state.items
  );

  const subtotal =
    items.reduce(
      (total, item) =>
        total +
        item.price *
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
            Checkout
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            "
          >
            Complete
            <br />
            Your Order
          </h1>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
          {/* CUSTOMER FORM */}

          <div
            className="
            border
            border-white/10
            rounded-[40px]
            p-8
            "
          >
            <h2 className="text-3xl font-bold mb-8">
              Customer Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                className="
                bg-zinc-900
                rounded-2xl
                p-5
                outline-none
                "
              />

              <input
                type="text"
                placeholder="Last Name"
                className="
                bg-zinc-900
                rounded-2xl
                p-5
                outline-none
                "
              />

              <input
                type="email"
                placeholder="Email Address"
                className="
                bg-zinc-900
                rounded-2xl
                p-5
                outline-none
                md:col-span-2
                "
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="
                bg-zinc-900
                rounded-2xl
                p-5
                outline-none
                md:col-span-2
                "
              />

              <textarea
                rows={5}
                placeholder="Delivery Address"
                className="
                bg-zinc-900
                rounded-2xl
                p-5
                outline-none
                md:col-span-2
                "
              />

              <select
                className="
                bg-zinc-900
                rounded-2xl
                p-5
                outline-none
                md:col-span-2
                "
              >
                <option>
                  Lagos
                </option>

                <option>
                  Abuja
                </option>

                <option>
                  Port Harcourt
                </option>

                <option>
                  Ibadan
                </option>
              </select>
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
              rounded-[40px]
              p-8
              "
            >
              <h2 className="text-2xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-4">
                {items.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="
                      flex
                      justify-between
                      "
                    >
                      <div>
                        <p>
                          {item.name}
                        </p>

                        <p
                          className="
                          text-sm
                          text-white/50
                          "
                        >
                          Qty:
                          {" "}
                          {
                            item.quantity
                          }
                        </p>
                      </div>

                      <p>
                        ₦
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  )
                )}
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
                    Calculated
                    Later
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
                <Button className="w-full">
                  Pay With Paystack
                </Button>
              </div>

              <p
                className="
                text-white/50
                text-sm
                mt-6
                "
              >
                Secure payment powered
                by Paystack.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;