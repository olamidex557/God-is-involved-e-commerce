import { Link } from "react-router-dom";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

const OrderSuccess = () => {
  const orderNumber =
    "GII-" +
    Math.floor(
      Math.random() * 100000
    );

  return (
    <div className="pt-32 pb-32">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* SUCCESS CARD */}

          <div
            className="
            border
            border-green-500/20
            bg-green-500/5
            rounded-[40px]
            p-10
            md:p-16
            text-center
            "
          >
            {/* ICON */}

            <div
              className="
              w-24
              h-24
              rounded-full
              bg-green-500/10
              border
              border-green-500/20
              flex
              items-center
              justify-center
              mx-auto
              "
            >
              <span className="text-5xl">
                ✓
              </span>
            </div>

            <p
              className="
              uppercase
              tracking-[0.3em]
              text-green-400
              mt-8
              "
            >
              Payment Successful
            </p>

            <h1
              className="
              text-5xl
              md:text-7xl
              font-bold
              mt-6
              "
            >
              Order
              <br />
              Confirmed
            </h1>

            <p
              className="
              text-white/60
              mt-8
              text-lg
              "
            >
              Thank you for your purchase.
              Your order has been received
              and is being processed.
            </p>

            {/* ORDER NUMBER */}

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
                {orderNumber}
              </h2>
            </div>

            {/* STATUS */}

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

                <p className="text-green-400 mt-2">
                  Completed
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
                  Processing
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

            {/* ACTIONS */}

            <div className="grid gap-4 mt-12">
              <Link to="/dashboard">
                <Button className="w-full">
                  View Orders
                </Button>
              </Link>

              <button
                className="
                border
                border-white/10
                rounded-full
                py-4
                "
              >
                Download Invoice
              </button>

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