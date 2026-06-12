import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import showroom from "../../assets/images/location/showroom.jpg";

const Contact = () => {
  return (
    <div className="pt-32 pb-32">
      <Container>
        {/* HERO */}

        <div className="text-center max-w-4xl mx-auto">
          <p
            className="
            uppercase
            tracking-[0.3em]
            text-[#D4AF37]
            mb-4
            "
          >
            Contact Us
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            "
          >
            Let's Talk About
            <br />
            Your Project.
          </h1>

          <p
            className="
            text-white/60
            text-lg
            mt-8
            "
          >
            Need materials, accessories or a project
            quotation? We're here to help.
          </p>
        </div>

        {/* SHOWROOM */}

        <div
          className="
          mt-20
          relative
          overflow-hidden
          rounded-[40px]
          "
        >
          <img
            src={showroom}
            alt="Showroom"
            className="
            w-full
            h-[300px]
            md:h-[600px]
            object-cover
            "
          />

          <div className="absolute inset-0 bg-black/40" />

          <div
            className="
            absolute
            bottom-8
            left-8
            "
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              Visit Our Showroom
            </h2>

            <p className="text-white/70 mt-3">
              419 Oke-Aro Road
            </p>
          </div>
        </div>

        {/* CONTACT DETAILS */}

        <div className="grid lg:grid-cols-3 gap-8 mt-20">
          <div
            className="
            bg-white/[0.03]
            border
            border-white/10
            rounded-[32px]
            p-8
            "
          >
            <h3 className="text-2xl font-bold">
              Phone
            </h3>

            <p className="text-white/60 mt-4">
              +234 XXX XXX XXXX
            </p>
          </div>

          <div
            className="
            bg-white/[0.03]
            border
            border-white/10
            rounded-[32px]
            p-8
            "
          >
            <h3 className="text-2xl font-bold">
              Email
            </h3>

            <p className="text-white/60 mt-4">
              support@godisinvolved.com
            </p>
          </div>

          <div
            className="
            bg-white/[0.03]
            border
            border-white/10
            rounded-[32px]
            p-8
            "
          >
            <h3 className="text-2xl font-bold">
              WhatsApp
            </h3>

            <p className="text-white/60 mt-4">
              Instant Support Available
            </p>
          </div>
        </div>

        {/* CONTACT FORM */}

        <div
          className="
          mt-20
          border
          border-white/10
          rounded-[40px]
          p-8
          md:p-16
          "
        >
          <h2 className="text-4xl font-bold mb-10">
            Send A Message
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
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
              "
            />

            <input
              type="text"
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
              rows={7}
              placeholder="Tell us about your project..."
              className="
              bg-zinc-900
              rounded-2xl
              p-5
              outline-none
              md:col-span-2
              "
            />

            <div className="md:col-span-2">
              <Button>
                Send Message
              </Button>
            </div>
          </div>
        </div>

        {/* MAP */}

        <div
          className="
          mt-20
          border
          border-white/10
          rounded-[40px]
          overflow-hidden
          "
        >
          <div
            className="
            h-[400px]
            bg-zinc-900
            flex
            items-center
            justify-center
            text-white/40
            "
          >
            Google Maps Integration Here
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;