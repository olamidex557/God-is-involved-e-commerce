import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import { useCartStore } from "../../store/cartStore";
import { useAuth } from "../../context/AuthContext";

import { createOrder } from "../../services/api/orders";

const Checkout = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const items = useCartStore(
    (state) => state.items
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [state, setState] =
    useState("Lagos");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const subtotal = items.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  const shippingFee = 0;

  const total =
    subtotal + shippingFee;

  const handleCheckout =
    async () => {
      try {
        setError("");

        if (!user) {
          setError(
            "Please login before placing an order."
          );

          navigate("/login");

          return;
        }

        if (
          !firstName ||
          !lastName ||
          !email ||
          !phone ||
          !address
        ) {
          setError(
            "Please complete all required fields."
          );

          return;
        }

        if (items.length === 0) {
          setError(
            "Your cart is empty."
          );

          return;
        }

        setLoading(true);

        const payload = {
          items: items.map(
            (item) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              quantity:
                item.quantity,
              image:
                item.image ?? "",
            })
          ),

          subtotal,

          shippingFee,

          totalAmount: total,

          paymentMethod:
            "paystack",

          shippingAddress: {
            fullName:
              `${firstName} ${lastName}`,
            phone,
            address,
            city: state,
            state,
          },
        };

        const response =
          await createOrder(
            payload
          );

        if (
          response.success
        ) {
          clearCart();

          navigate(
            "/order-success"
          );
        }
      } catch (
        error: any
      ) {
        console.error(
          error
        );

        setError(
          error?.response?.data
            ?.message ||
            "Unable to create order."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="pt-32 pb-32">
      <Container>
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

        <div
          className="
          grid
          lg:grid-cols-[2fr_1fr]
          gap-10
          "
        >
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
                value={
                  firstName
                }
                onChange={(e) =>
                  setFirstName(
                    e.target.value
                  )
                }
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
                value={
                  lastName
                }
                onChange={(e) =>
                  setLastName(
                    e.target.value
                  )
                }
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
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
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
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
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
                value={address}
                onChange={(e) =>
                  setAddress(
                    e.target.value
                  )
                }
                className="
                bg-zinc-900
                rounded-2xl
                p-5
                outline-none
                md:col-span-2
                "
              />

              <select
                value={state}
                onChange={(e) =>
                  setState(
                    e.target.value
                  )
                }
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

            {error && (
              <div
                className="
                mt-6
                text-red-400
                "
              >
                {error}
              </div>
            )}
          </div>

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
                    ₦0
                  </span>
                </div>
              </div>

              <hr className="border-white/10 my-8" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>

                <span>
                  ₦
                  {total.toLocaleString()}
                </span>
              </div>

              <div className="mt-8">
                <Button
                  className="w-full"
                  onClick={
                    handleCheckout
                  }
                >
                  {loading
                    ? "Creating Order..."
                    : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;