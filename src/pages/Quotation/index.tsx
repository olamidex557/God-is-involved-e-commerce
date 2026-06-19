import Container from "../../components/ui/Container";

const Quotation = () => {
  return (
    <div className="pt-32 pb-32">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div
            className="
            rounded-[40px]
            border
            border-[#D4AF37]/20
            bg-[#D4AF37]/5
            p-12
            text-center
            "
          >
            <div
              className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              bg-[#D4AF37]/10
              border
              border-[#D4AF37]/20
              text-[#D4AF37]
              text-sm
              mb-6
              "
            >
              🚀 Launching Soon
            </div>

            <p className="text-[#D4AF37] uppercase tracking-[0.3em]">
              AI QUOTATION
            </p>

            <h1 className="text-5xl md:text-7xl font-bold mt-6">
              Coming Soon
            </h1>

            <p className="text-white/60 text-lg mt-8 max-w-2xl mx-auto">
              We are building an intelligent
              project estimation engine that
              will generate accurate material
              recommendations, pricing
              estimates and project
              quotations.
            </p>

            <div className="mt-12 space-y-4 text-white/70">
              <p>✓ Instant project estimates</p>
              <p>✓ Material recommendations</p>
              <p>✓ Smart cost calculations</p>
              <p>✓ Save and manage quotations</p>
              <p>✓ Convert quotations into orders</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Quotation;