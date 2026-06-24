import {
  useMemo,
  useState,
} from "react";
import type {
  FormEvent,
} from "react";
import axios from "axios";
import {
  Check,
  PackageCheck,
  Search,
} from "lucide-react";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import {
  trackOrder,
} from "../../services/api/orders";
import type {
  Order,
} from "../../types/order";

const timelineSteps = [
  {
    key: "received",
    label: "Order Received",
  },
  {
    key: "paid",
    label: "Payment Confirmed",
  },
  {
    key: "processing",
    label: "Processing",
  },
  {
    key: "shipped",
    label: "Shipped",
  },
  {
    key: "delivered",
    label: "Delivered",
  },
] as const;

const getCompletedSteps =
  (
    order: Order
  ) => {
    if (
      order.status ===
      "cancelled"
    ) {
      return [
        "received",
      ];
    }

    const completed =
      new Set<string>([
        "received",
      ]);

    if (
      order.paymentStatus ===
      "paid"
    ) {
      completed.add(
        "paid"
      );
    }

    if (
      [
        "processing",
        "shipped",
        "delivered",
      ].includes(
        order.status
      )
    ) {
      completed.add(
        "processing"
      );
    }

    if (
      [
        "shipped",
        "delivered",
      ].includes(
        order.status
      )
    ) {
      completed.add(
        "shipped"
      );
    }

    if (
      order.status ===
      "delivered"
    ) {
      completed.add(
        "delivered"
      );
    }

    return [
      ...completed,
    ];
  };

const TrackOrder = () => {
  const [
    orderNumber,
    setOrderNumber,
  ] = useState("");

  const [
    order,
    setOrder,
  ] =
    useState<Order | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const completedSteps =
    useMemo(
      () =>
        order
          ? getCompletedSteps(
              order
            )
          : [],
      [
        order,
      ]
    );

  const handleSubmit =
    async (
      event: FormEvent
    ) => {
      event.preventDefault();

      const normalized =
        orderNumber
          .trim()
          .toUpperCase();

      if (!normalized) {
        setError(
          "Enter your order number."
        );
        return;
      }

      try {
        setLoading(true);
        setError("");
        setOrder(null);

        const response =
          await trackOrder(
            normalized
          );

        setOrder(
          response.order
        );
      } catch (
        requestError: unknown
      ) {
        setError(
          axios.isAxiosError(
            requestError
          )
            ? requestError.response?.data
                ?.message ||
                "Order not found."
            : "Order not found."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p
              className="
              uppercase
              tracking-[0.3em]
              text-[#D4AF37]
              mb-4
              "
            >
              Order Tracking
            </p>

            <h1
              className="
              text-5xl
              md:text-7xl
              font-bold
              "
            >
              Track Your Order
            </h1>

            <p className="text-white/60 mt-6">
              Enter your order number to see payment,
              fulfilment, and delivery progress.
            </p>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="
            border
            border-white/10
            rounded-[32px]
            bg-white/[0.03]
            p-5
            md:p-6
            "
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-white/40
                  "
                  size={20}
                />

                <input
                  value={
                    orderNumber
                  }
                  onChange={(
                    event
                  ) =>
                    setOrderNumber(
                      event.target.value
                    )
                  }
                  placeholder="ORD-1782012354369"
                  className="
                  w-full
                  rounded-full
                  bg-zinc-950
                  border
                  border-white/10
                  py-4
                  pl-14
                  pr-5
                  outline-none
                  focus:border-[#D4AF37]/70
                  "
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="md:w-auto"
              >
                {loading
                  ? "Tracking..."
                  : "Track Order"}
              </Button>
            </div>

            {error && (
              <p className="text-red-400 mt-4">
                {error}
              </p>
            )}
          </form>

          {order && (
            <div className="mt-10 space-y-8">
              <div
                className="
                border
                border-white/10
                rounded-[32px]
                bg-white/[0.03]
                p-6
                md:p-8
                "
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div>
                    <p className="text-white/50">
                      Order Number
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                      {order.orderNumber}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span
                      className="
                      rounded-full
                      bg-[#D4AF37]/15
                      px-4
                      py-2
                      text-sm
                      capitalize
                      text-[#D4AF37]
                      "
                    >
                      {order.status}
                    </span>

                    <span
                      className="
                      rounded-full
                      bg-white/10
                      px-4
                      py-2
                      text-sm
                      capitalize
                      text-white/80
                      "
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5 mt-8">
                  <div>
                    <p className="text-white/50">
                      Customer
                    </p>

                    <p className="mt-2 font-medium">
                      {order.shippingAddress
                        .fullName ||
                        "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-white/50">
                      Created Date
                    </p>

                    <p className="mt-2 font-medium">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-white/50">
                      Amount
                    </p>

                    <p className="mt-2 font-medium">
                      ₦
                      {order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="
                border
                border-white/10
                rounded-[32px]
                bg-white/[0.03]
                p-6
                md:p-8
                "
              >
                <h3 className="text-2xl font-bold mb-8">
                  Timeline
                </h3>

                <div className="grid md:grid-cols-5 gap-5">
                  {timelineSteps.map(
                    (
                      step,
                      index
                    ) => {
                      const completed =
                        completedSteps.includes(
                          step.key
                        );

                      return (
                        <div
                          key={
                            step.key
                          }
                          className="
                          relative
                          flex
                          md:flex-col
                          gap-4
                          "
                        >
                          <div
                            className={`
                            h-12
                            w-12
                            shrink-0
                            rounded-full
                            border
                            flex
                            items-center
                            justify-center
                            ${completed
                              ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                              : "border-white/15 bg-zinc-950 text-white/40"
                            }
                            `}
                          >
                            {completed ? (
                              <Check size={20} />
                            ) : (
                              <PackageCheck
                                size={20}
                              />
                            )}
                          </div>

                          {index <
                            timelineSteps.length -
                              1 && (
                            <div
                              className={`
                              hidden
                              md:block
                              absolute
                              top-6
                              left-12
                              right-[-20px]
                              h-px
                              ${completed
                                ? "bg-[#D4AF37]"
                                : "bg-white/10"
                              }
                              `}
                            />
                          )}

                          <div>
                            <p
                              className={`
                              font-semibold
                              ${completed
                                ? "text-white"
                                : "text-white/45"
                              }
                              `}
                            >
                              {step.label}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div
                className="
                border
                border-white/10
                rounded-[32px]
                bg-white/[0.03]
                p-6
                md:p-8
                "
              >
                <h3 className="text-2xl font-bold mb-6">
                  Products
                </h3>

                <div className="space-y-4">
                  {order.items.map(
                    (
                      item
                    ) => (
                      <div
                        key={`${item.productId}-${item.name}`}
                        className="
                        flex
                        justify-between
                        gap-6
                        border-b
                        border-white/10
                        pb-4
                        last:border-0
                        last:pb-0
                        "
                      >
                        <div>
                          <p className="font-medium">
                            {item.name}
                          </p>

                          <p className="text-white/50 text-sm">
                            {item.color ?? "Default"} / {item.size ?? "Standard"}
                          </p>

                          <p className="text-white/50 text-sm">
                            Qty {item.quantity}
                          </p>
                        </div>

                        <p className="text-right">
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
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TrackOrder;
