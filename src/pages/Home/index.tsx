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
            <p className="text-[#D4AF37] uppercase tracking-[0.3em] mb-6 text-sm md:text-base">
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

            <p className="text-base md:text-xl text-white/70 mt-8 max-w-2xl leading-8">
              Premium plywood, MDF, HDF,
              furniture accessories and interior materials.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-12">
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
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold">
              Featured Projects
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <img
                src={kitchen}
                alt=""
                className="
                h-[350px]
                md:h-[500px]
                w-full
                object-cover
                rounded-[32px]
                "
              />

              <h3 className="mt-6 text-2xl font-bold">
                Luxury Kitchens
              </h3>
            </div>

            <div>
              <img
                src={wardrobe}
                alt=""
                className="
                h-[350px]
                md:h-[500px]
                w-full
                object-cover
                rounded-[32px]
                "
              />

              <h3 className="mt-6 text-2xl font-bold">
                Premium Wardrobes
              </h3>
            </div>

            <div>
              <img
                src={office}
                alt=""
                className="
                h-[350px]
                md:h-[500px]
                w-full
                object-cover
                rounded-[32px]
                "
              />

              <h3 className="mt-6 text-2xl font-bold">
                Executive Offices
              </h3>
            </div>
          </div>
        </Container>
      </Section>

      {/* MATERIAL CATEGORIES */}

      <Section>
        <Container>
          <h2 className="text-4xl md:text-6xl font-bold mb-16">
            Material Categories
          </h2>

          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div className="relative group overflow-hidden rounded-[24px] md:rounded-[32px]">
              <img
                src={mdf}
                alt="MDF Boards"
                className="
          w-full
          h-[180px]
          md:h-[350px]
          lg:h-[400px]
          object-cover
          transition
          duration-500
          group-hover:scale-110
          "
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <h3 className="font-bold text-lg md:text-3xl">
                  MDF
                </h3>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-[24px] md:rounded-[32px]">
              <img
                src={plywood}
                alt="Plywood"
                className="
          w-full
          h-[180px]
          md:h-[350px]
          lg:h-[400px]
          object-cover
          transition
          duration-500
          group-hover:scale-110
          "
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <h3 className="font-bold text-lg md:text-3xl">
                  Plywood
                </h3>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-[24px] md:rounded-[32px]">
              <img
                src={hdf}
                alt="HDF Boards"
                className="
          w-full
          h-[180px]
          md:h-[350px]
          lg:h-[400px]
          object-cover
          transition
          duration-500
          group-hover:scale-110
          "
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <h3 className="font-bold text-lg md:text-3xl">
                  HDF
                </h3>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-[24px] md:rounded-[32px]">
              <img
                src={accessories}
                alt="Accessories"
                className="
          w-full
          h-[180px]
          md:h-[350px]
          lg:h-[400px]
          object-cover
          transition
          duration-500
          group-hover:scale-110
          "
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <h3 className="font-bold text-lg md:text-3xl">
                  Accessories
                </h3>
              </div>
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

              <h2 className="text-4xl md:text-6xl font-bold mt-6">
                419 OKE-ARO
                <br />
                ROAD
              </h2>

              <p className="mt-8 text-white/60">
                Visit our showroom and explore premium materials in person.
              </p>
            </div>

            <div className="h-[300px] md:h-[500px] rounded-[32px] bg-zinc-900"></div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Home;