import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import Heading from "../../components/ui/Heading";
import Button from "../../components/ui/Button";

import heroBg from "../../assets/images/hero/hero-bg.jpg";

import kitchen from "../../assets/images/projects/kitchen.jpg";
import wardrobe from "../../assets/images/projects/wardrobe.jpg";
import office from "../../assets/images/projects/office.jpg";

import mdf from "../../assets/images/categories/mdf.jpg";
import plywood from "../../assets/images/categories/plywood.jpg";
import accessories from "../../assets/images/categories/accessories.jpg";
import hdf from "../../assets/images/categories/hdf.jpg";

const Home = () => {
  return (
    <>
      {/* HERO */}

      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,.25),
              rgba(0,0,0,.45)
            ),
            url(${heroBg})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <div className="max-w-5xl">
            <p className="text-[#D4AF37] uppercase tracking-[0.4em] mb-6">
              Premium Building Materials
            </p>

            <Heading>
              BUILD
              <br />
              SPACES
              <br />
              PEOPLE
              <br />
              REMEMBER.
            </Heading>

            <p className="text-xl text-white/70 mt-8 max-w-2xl leading-8">
              Premium plywood, MDF, HDF,
              furniture accessories and interior materials.
            </p>

            <div className="flex gap-4 mt-12">
              <Button>
                Explore Materials
              </Button>

              <button className="border border-white/20 px-8 py-4 rounded-full">
                Generate Quote
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* PROJECTS */}

      <Section>
        <Container>
          <div className="mb-20">
            <h2 className="text-6xl font-bold">
              Featured Projects
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div>
              <img
                src={kitchen}
                className="h-[500px] w-full object-cover rounded-[32px]"
              />

              <h3 className="mt-6 text-2xl font-bold">
                Luxury Kitchens
              </h3>
            </div>

            <div>
              <img
                src={wardrobe}
                className="h-[500px] w-full object-cover rounded-[32px]"
              />

              <h3 className="mt-6 text-2xl font-bold">
                Premium Wardrobes
              </h3>
            </div>

            <div>
              <img
                src={office}
                className="h-[500px] w-full object-cover rounded-[32px]"
              />

              <h3 className="mt-6 text-2xl font-bold">
                Executive Offices
              </h3>
            </div>
          </div>
        </Container>
      </Section>

      {/* CATEGORIES */}

      <Section>
        <Container>
          <h2 className="text-6xl font-bold mb-16">
            Material Categories
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <img
              src={mdf}
              className="h-[400px] object-cover rounded-[32px]"
            />

            <img
              src={plywood}
              className="h-[400px] object-cover rounded-[32px]"
            />

            <img
              src={hdf}
              className="h-[400px] object-cover rounded-[32px]"
            />

            <img
              src={accessories}
              className="h-[400px] object-cover rounded-[32px]"
            />
          </div>
        </Container>
      </Section>

      {/* STATS */}

      <Section>
        <Container>
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-5xl font-bold">
                500+
              </h3>

              <p className="text-white/60 mt-4">
                Completed Projects
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">
                10+
              </h3>

              <p className="text-white/60 mt-4">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">
                1000+
              </h3>

              <p className="text-white/60 mt-4">
                Customers Served
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">
                24/7
              </h3>

              <p className="text-white/60 mt-4">
                Customer Support
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* BUILD ASSISTANT */}

      <Section>
        <Container>
          <div className="border border-white/10 rounded-[40px] p-20">
            <p className="text-[#D4AF37] uppercase tracking-[0.3em] mb-6">
              Build Assistant
            </p>

            <h2 className="text-6xl font-bold max-w-4xl">
              Tell Us What
              <br />
              You're Building.
            </h2>

            <p className="text-white/60 mt-8 max-w-2xl">
              Get instant material and accessory recommendations.
            </p>

            <div className="mt-10">
              <Button>
                Generate Project Quote
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* LOCATION */}

      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[#D4AF37] uppercase tracking-[0.3em]">
                Visit Us
              </p>

              <h2 className="text-6xl font-bold mt-6">
                419 OKE-ARO
                <br />
                ROAD
              </h2>

              <p className="mt-8 text-white/60">
                Visit our showroom and explore premium materials in person.
              </p>
            </div>

            <div className="h-[500px] rounded-[32px] bg-zinc-900"></div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Home;