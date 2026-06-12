import Container from "../../components/ui/Container";

const Dashboard = () => {
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
            Dashboard
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            "
          >
            Welcome Back
          </h1>
        </div>

        {/* OVERVIEW CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-white/10 rounded-[32px] p-8">
            <h3 className="text-4xl font-bold">
              12
            </h3>

            <p className="text-white/60 mt-3">
              Orders
            </p>
          </div>

          <div className="border border-white/10 rounded-[32px] p-8">
            <h3 className="text-4xl font-bold">
              4
            </h3>

            <p className="text-white/60 mt-3">
              Saved Quotes
            </p>
          </div>

          <div className="border border-white/10 rounded-[32px] p-8">
            <h3 className="text-4xl font-bold">
              ₦1.2M
            </h3>

            <p className="text-white/60 mt-3">
              Total Purchases
            </p>
          </div>

          <div className="border border-white/10 rounded-[32px] p-8">
            <h3 className="text-4xl font-bold">
              2
            </h3>

            <p className="text-white/60 mt-3">
              Addresses
            </p>
          </div>
        </div>

        {/* RECENT ORDERS */}

        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">
            Recent Orders
          </h2>

          <div className="border border-white/10 rounded-[32px] overflow-hidden">
            <div className="grid grid-cols-4 p-6 border-b border-white/10 font-semibold">
              <span>Order ID</span>
              <span>Date</span>
              <span>Status</span>
              <span>Total</span>
            </div>

            <div className="grid grid-cols-4 p-6 border-b border-white/10">
              <span>#GII001</span>
              <span>12 Jun 2026</span>
              <span className="text-green-400">
                Delivered
              </span>
              <span>₦120,000</span>
            </div>

            <div className="grid grid-cols-4 p-6">
              <span>#GII002</span>
              <span>10 Jun 2026</span>
              <span className="text-yellow-400">
                Processing
              </span>
              <span>₦80,000</span>
            </div>
          </div>
        </div>

        {/* SAVED QUOTATIONS */}

        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">
            Saved Quotations
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-white/10 rounded-[32px] p-8">
              <h3 className="text-xl font-bold">
                Wardrobe Project
              </h3>

              <p className="text-white/60 mt-3">
                Generated on 08 Jun 2026
              </p>

              <button
                className="
                mt-6
                text-[#D4AF37]
                "
              >
                View Quote →
              </button>
            </div>

            <div className="border border-white/10 rounded-[32px] p-8">
              <h3 className="text-xl font-bold">
                Kitchen Project
              </h3>

              <p className="text-white/60 mt-3">
                Generated on 02 Jun 2026
              </p>

              <button
                className="
                mt-6
                text-[#D4AF37]
                "
              >
                View Quote →
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;