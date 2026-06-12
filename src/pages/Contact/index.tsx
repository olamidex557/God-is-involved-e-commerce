import Container from "../../components/ui/Container";

const Contact = () => {
  return (
    <div className="pt-32 pb-32">
      <Container>
        <div className="mb-20">
          <p className="uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            Contact
          </p>

          <h1 className="text-6xl md:text-7xl font-bold">
            Let's Talk
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Address
                </h3>

                <p className="text-white/60">
                  419 Oke-Aro Road
                  <br />
                  Lagos, Nigeria
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Phone
                </h3>

                <p className="text-white/60">
                  +234 XXX XXX XXXX
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Email
                </h3>

                <p className="text-white/60">
                  support@godisinvolved.com
                </p>
              </div>
            </div>

            <div className="mt-12 h-[400px] bg-zinc-900 rounded-[32px]">
              Google Maps Here
            </div>
          </div>

          <div className="border border-white/10 rounded-[32px] p-10">
            <h2 className="text-3xl font-bold mb-8">
              Send Message
            </h2>

            <div className="space-y-5">
              <input
                placeholder="Full Name"
                className="w-full bg-zinc-900 rounded-2xl p-4"
              />

              <input
                placeholder="Email Address"
                className="w-full bg-zinc-900 rounded-2xl p-4"
              />

              <input
                placeholder="Phone Number"
                className="w-full bg-zinc-900 rounded-2xl p-4"
              />

              <textarea
                rows={6}
                placeholder="Message"
                className="w-full bg-zinc-900 rounded-2xl p-4"
              />

              <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-semibold">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;