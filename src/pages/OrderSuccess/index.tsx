import {
  useEffect,
  useState,
} from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import {
  verifyPayment,
} from "../../services/api/payments";
import {
  useCartStore,
} from "../../store/cartStore";
import type {
  Order,
} from "../../types/order";

type PaymentState =
  | "verifying"
  | "success"
  | "failed";

const OrderSuccess = () => {
  const [
    searchParams,
  ] =
    useSearchParams();

  const clearCart =
    useCartStore(
      (
        state
      ) =>
        state.clearCart
    );

  const [
    paymentState,
    setPaymentState,
  ] =
    useState<PaymentState>(
      "verifying"
    );

  const [
    order,
    setOrder,
  ] =
    useState<Order | null>(
      null
    );

  const [
    message,
    setMessage,
  ] =
    useState(
      "Confirming your Paystack payment..."
    );

  useEffect(() => {
    const reference =
      searchParams.get(
        "reference"
      ) ||
      searchParams.get(
        "trxref"
      );

    if (!reference) {
      setPaymentState(
        "failed"
      );
      setMessage(
        "Payment reference missing. Please contact support if you were charged."
      );
      return;
    }

    const confirmPayment =
      async () => {
        try {
          const response =
            await verifyPayment(
              reference
            );

          setOrder(
            response.order
          );

          if (
            response.success
          ) {
            clearCart();
            setPaymentState(
              "success"
            );
            setMessage(
              response.message
            );
          } else {
            setPaymentState(
              "failed"
            );
            setMessage(
              response.message
            );
          }
        } catch (
          error: unknown
        ) {
          setPaymentState(
            "failed"
          );
          setMessage(
            axios.isAxiosError(
              error
            )
              ? error.response?.data
                  ?.message ||
                  "Unable to verify payment."
              : "Unable to verify payment."
          );
        }
      };

    confirmPayment();
  }, [
    clearCart,
    searchParams,
  ]);

  const isSuccess =
    paymentState ===
    "success";

  return (
    <div className="pt-32 pb-32">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div
            className={`
            border
            ${isSuccess
              ? "border-green-500/20 bg-green-500/5"
              : "border-red-500/20 bg-red-500/5"
            }
            rounded-[40px]
            p-10
            md:p-16
            text-center
            `}
          >
            <div
              className={`
              w-24
              h-24
              rounded-full
              ${isSuccess
                ? "bg-green-500/10 border-green-500/20"
                : "bg-red-500/10 border-red-500/20"
              }
              border
              flex
              items-center
              justify-center
              mx-auto
              `}
            >
              <span className="text-5xl">
                {paymentState ===
                "verifying"
                  ? "..."
                  : isSuccess
                    ? "✓"
                    : "!"}
              </span>
            </div>

            <p
              className={`
              uppercase
              tracking-[0.3em]
              mt-8
              ${isSuccess
                ? "text-green-400"
                : "text-red-400"
              }
              `}
            >
              {paymentState ===
              "verifying"
                ? "Verifying Payment"
                : isSuccess
                  ? "Payment Successful"
                  : "Payment Failed"}
            </p>

            <h1
              className="
              text-5xl
              md:text-7xl
              font-bold
              mt-6
              "
            >
              {isSuccess
                ? "Order Confirmed"
                : "Payment Review"}
            </h1>

            <p
              className="
              text-white/60
              mt-8
              text-lg
              "
            >
              {message}
            </p>

            {order && (
              <div
                className="
                mt-12
                border
                border-white/10
                rounded-[24px]
                p-6
                "
              >
                <p className="text-white/50">
                  Order Number
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {order.orderNumber}
                </h2>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4 mt-10">
              <div
                className="
                border
                border-white/10
                rounded-[24px]
                p-5
                "
              >
                <h3 className="font-bold">
                  Payment
                </h3>

                <p
                  className={`
                  mt-2
                  ${isSuccess
                    ? "text-green-400"
                    : "text-red-400"
                  }
                  `}
                >
                  {order?.paymentStatus ||
                    paymentState}
                </p>
              </div>

              <div
                className="
                border
                border-white/10
                rounded-[24px]
                p-5
                "
              >
                <h3 className="font-bold">
                  Order
                </h3>

                <p className="text-yellow-400 mt-2">
                  {order?.status ||
                    "Pending"}
                </p>
              </div>

              <div
                className="
                border
                border-white/10
                rounded-[24px]
                p-5
                "
              >
                <h3 className="font-bold">
                  Delivery
                </h3>

                <p className="text-white/60 mt-2">
                  Pending
                </p>
              </div>
            </div>

            <div className="grid gap-4 mt-12">
              <Link to="/dashboard">
                <Button className="w-full">
                  View Orders
                </Button>
              </Link>

              <Link to="/materials">
                <button
                  className="
                  w-full
                  border
                  border-white/10
                  rounded-full
                  py-4
                  "
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderSuccess;
