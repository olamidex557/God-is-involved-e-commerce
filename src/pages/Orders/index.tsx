import Container from "../../components/ui/Container";

const Orders = () => {
  return (
    <div className="pt-32 pb-32">
      <Container>
        <div className="mb-16">
          <p className="uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            Orders
          </p>

          <h1 className="text-6xl font-bold">
            Order
            <br />
            History
          </h1>
        </div>

        <div className="space-y-6">
          {[1, 2, 3].map((order) => (
            <div
              key={order}
              className="border border-white/10 rounded-[32px] p-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <p className="text-white/50">
                    Order Number
                  </p>

                  <h3 className="text-2xl font-bold">
                    #GII-2026-00{order}
                  </h3>
                </div>

                <div>
                  <p className="text-white/50">
                    Date
                  </p>

                  <h4>12 June 2026</h4>
                </div>

                <div>
                  <p className="text-white/50">
                    Total
                  </p>

                  <h4>₦250,000</h4>
                </div>

                <div>
                  <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                    Completed
                  </span>
                </div>

                <button className="border border-white/10 px-6 py-3 rounded-full">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Orders;