import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import Heading from "../../components/ui/Heading";
import Button from "../../components/ui/Button";

import heroKitchen from "../../assets/images/hero/hero-kitchen.jpg";
import heroWardrobe from "../../assets/images/hero/hero-wardrobe.jpg";
import heroOffice from "../../assets/images/hero/hero-office.jpg";
import herobg from "../../assets/images/hero/hero-bg.jpg";

import kitchenProject from "../../assets/images/projects/kitchen.jpg";
import wardrobeProject from "../../assets/images/projects/wardrobe.jpg";
import officeProject from "../../assets/images/projects/office.jpg";

import mdf from "../../assets/images/categories/mdf.jpg";
import plywood from "../../assets/images/categories/plywood.jpg";
import hdf from "../../assets/images/categories/hdf.jpg";
import accessories from "../../assets/images/categories/accessories.jpg";

import {
  businessLocation,
} from "../../config/location";

const GoogleLocationMap =
  lazy(
    () =>
      import(
        "../../components/maps/GoogleLocationMap"
      )
  );

const Home = () => {
  const heroSlides = [
    herobg,
    heroKitchen,
    heroWardrobe,
    heroOffice,
  ];

  const [currentSlide, setCurrentSlide] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1
          ? 0
          : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO */}

      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`
              absolute
              inset-0
              transition-opacity
              duration-1000
              ${currentSlide === index
                ? "opacity-100"
                : "opacity-0"
              }
            `}
          >
            <img
              src={slide}
              alt=""
              className="
              w-full
              h-full
              object-cover
              "
            />

            <div
              className="
              absolute
              inset-0
              bg-black/45
              "
            />
          </div>
        ))}

        <Container>
          <div
            className="
            relative
            z-10
            h-screen
            flex
            items-center
            "
          >
            <div className="max-w-5xl">
              <p
                className="
                text-[#D4AF37]
                uppercase
                tracking-[0.4em]
                mb-6
                text-sm
                md:text-base
                "
              >
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

              <p
                className="
                text-base
                md:text-xl
                text-white/70
                max-w-2xl
                mt-8
                leading-8
                "
              >
                Premium MDF, HDF, plywood and
                furniture accessories trusted by
                architects, contractors and furniture
                makers.
              </p>

              <div
                className="
                flex
                flex-col
                sm:flex-row
                gap-4
                mt-12
                "
              >
                <Link to="/materials">
                  <Button>
                    Explore Materials
                  </Button>
                </Link>

                <Link to="/quotation">
                  <button
                    className="
                    px-8
                    py-4
                    rounded-full
                    border
                    border-white/20
                    backdrop-blur-xl
                    hover:bg-white/10
                    transition
                    "
                  >
                    Generate Quote
                  </button>
                </Link>
              </div>

              {/* SLIDER INDICATORS */}

              <div className="flex gap-3 mt-12">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentSlide(index)
                    }
                    className={`
                      h-2
                      rounded-full
                      transition-all
                      duration-500
                      ${currentSlide === index
                        ? "w-12 bg-[#D4AF37]"
                        : "w-6 bg-white/40"
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED SPACES */}

      <Section>
        <Container>
          <div className="mb-16">
            <p
              className="
              uppercase
              tracking-[0.3em]
              text-[#D4AF37]
              mb-4
              "
            >
              Featured Spaces
            </p>

            <h2
              className="
              text-4xl
              md:text-6xl
              font-bold
              "
            >
              Spaces Built
              <br />
              With Our Materials
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group">
              <div
                className="
                overflow-hidden
                rounded-[32px]
                "
              >
                <img
                  src={kitchenProject}
                  alt=""
                  className="
                  h-[350px]
                  md:h-[500px]
                  w-full
                  object-cover
                  transition
                  duration-700
                  group-hover:scale-110
                  "
                />
              </div>

              <h3
                className="
                text-2xl
                font-bold
                mt-6
                "
              >
                Luxury Kitchens
              </h3>

              <Link
                to="/materials"
                className="
                text-[#D4AF37]
                mt-3
                inline-block
                "
              >
                View Materials →
              </Link>
            </div>

            <div className="group">
              <div
                className="
                overflow-hidden
                rounded-[32px]
                "
              >
                <img
                  src={wardrobeProject}
                  alt=""
                  className="
                  h-[350px]
                  md:h-[500px]
                  w-full
                  object-cover
                  transition
                  duration-700
                  group-hover:scale-110
                  "
                />
              </div>

              <h3
                className="
                text-2xl
                font-bold
                mt-6
                "
              >
                Premium Wardrobes
              </h3>

              <Link
                to="/materials"
                className="
                text-[#D4AF37]
                mt-3
                inline-block
                "
              >
                View Materials →
              </Link>
            </div>

            <div className="group">
              <div
                className="
                overflow-hidden
                rounded-[32px]
                "
              >
                <img
                  src={officeProject}
                  alt=""
                  className="
                  h-[350px]
                  md:h-[500px]
                  w-full
                  object-cover
                  transition
                  duration-700
                  group-hover:scale-110
                  "
                />
              </div>

              <h3
                className="
                text-2xl
                font-bold
                mt-6
                "
              >
                Executive Offices
              </h3>

              <Link
                to="/materials"
                className="
                text-[#D4AF37]
                mt-3
                inline-block
                "
              >
                View Materials →
              </Link>
            </div>
          </div>
        </Container>
      </Section>

            {/* MATERIAL COLLECTION */}

      <Section>
        <Container>
          <div className="mb-16">
            <p
              className="
              uppercase
              tracking-[0.3em]
              text-[#D4AF37]
              mb-4
              "
            >
              Materials Collection
            </p>

            <h2
              className="
              text-4xl
              md:text-6xl
              font-bold
              "
            >
              Curated For
              <br />
              Exceptional Projects
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <Link
              to="/materials"
              className="group relative overflow-hidden rounded-[24px] md:rounded-[40px]"
            >
              <img
                src={mdf}
                alt="MDF"
                className="
                w-full
                h-[220px]
                md:h-[450px]
                object-cover
                transition
                duration-700
                group-hover:scale-110
                "
              />

              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                <p className="text-[#D4AF37] text-sm mb-2">
                  Collection
                </p>

                <h3 className="font-bold text-lg md:text-3xl">
                  MDF Boards
                </h3>

                <p className="hidden md:block text-white/70 mt-2">
                  Furniture Grade Panels
                </p>
              </div>
            </Link>

            <Link
              to="/materials"
              className="group relative overflow-hidden rounded-[24px] md:rounded-[40px]"
            >
              <img
                src={plywood}
                alt="Plywood"
                className="
                w-full
                h-[220px]
                md:h-[450px]
                object-cover
                transition
                duration-700
                group-hover:scale-110
                "
              />

              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                <p className="text-[#D4AF37] text-sm mb-2">
                  Collection
                </p>

                <h3 className="font-bold text-lg md:text-3xl">
                  Plywood
                </h3>

                <p className="hidden md:block text-white/70 mt-2">
                  Premium Structural Panels
                </p>
              </div>
            </Link>

            <Link
              to="/materials"
              className="group relative overflow-hidden rounded-[24px] md:rounded-[40px]"
            >
              <img
                src={hdf}
                alt="HDF"
                className="
                w-full
                h-[220px]
                md:h-[450px]
                object-cover
                transition
                duration-700
                group-hover:scale-110
                "
              />

              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                <p className="text-[#D4AF37] text-sm mb-2">
                  Collection
                </p>

                <h3 className="font-bold text-lg md:text-3xl">
                  HDF Boards
                </h3>

                <p className="hidden md:block text-white/70 mt-2">
                  High Density Solutions
                </p>
              </div>
            </Link>

            <Link
              to="/materials"
              className="group relative overflow-hidden rounded-[24px] md:rounded-[40px]"
            >
              <img
                src={accessories}
                alt="Accessories"
                className="
                w-full
                h-[220px]
                md:h-[450px]
                object-cover
                transition
                duration-700
                group-hover:scale-110
                "
              />

              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                <p className="text-[#D4AF37] text-sm mb-2">
                  Collection
                </p>

                <h3 className="font-bold text-lg md:text-3xl">
                  Accessories
                </h3>

                <p className="hidden md:block text-white/70 mt-2">
                  Handles, Hinges & More
                </p>
              </div>
            </Link>
          </div>
        </Container>
      </Section>

      {/* BUILD ASSISTANT */}

      <Section>
        <Container>
          <div
            className="
            border
            border-white/10
            rounded-[40px]
            p-10
            md:p-20
            bg-gradient-to-br
            from-zinc-900
            to-black
            "
          >
            <p
              className="
              text-[#D4AF37]
              uppercase
              tracking-[0.3em]
              mb-6
              "
            >
              Build Assistant
            </p>

            <h2
              className="
              text-4xl
              md:text-6xl
              font-bold
              max-w-4xl
              "
            >
              Tell Us What
              <br />
              You're Building.
            </h2>

            <p
              className="
              text-white/60
              mt-8
              max-w-2xl
              text-lg
              "
            >
              Generate quotations instantly and get
              recommendations for materials and accessories
              required for your project.
            </p>

            <div className="mt-10">
              <Link to="/quotation">
                <Button>
                  Generate Project Quote
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* WHY CHOOSE US */}

      <Section>
        <Container>
          <div className="text-center mb-16">
            <p
              className="
              uppercase
              tracking-[0.3em]
              text-[#D4AF37]
              mb-4
              "
            >
              Why Choose Us
            </p>

            <h2
              className="
              text-4xl
              md:text-6xl
              font-bold
              "
            >
              Trusted By Furniture Makers,
              <br />
              Architects & Contractors
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/[0.03] rounded-[32px] p-8 border border-white/5">
              <h3 className="text-xl font-bold mb-4">
                Premium Quality
              </h3>

              <p className="text-white/60">
                Carefully sourced materials with
                consistent finishing.
              </p>
            </div>

            <div className="bg-white/[0.03] rounded-[32px] p-8 border border-white/5">
              <h3 className="text-xl font-bold mb-4">
                Nationwide Delivery
              </h3>

              <p className="text-white/60">
                Reliable logistics across Nigeria.
              </p>
            </div>

            <div className="bg-white/[0.03] rounded-[32px] p-8 border border-white/5">
              <h3 className="text-xl font-bold mb-4">
                Instant Quotations
              </h3>

              <p className="text-white/60">
                Generate estimates in minutes.
              </p>
            </div>

            <div className="bg-white/[0.03] rounded-[32px] p-8 border border-white/5">
              <h3 className="text-xl font-bold mb-4">
                Expert Support
              </h3>

              <p className="text-white/60">
                Get guidance before purchasing.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* STATS */}

      <Section>
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-white/10 rounded-[32px] p-8">
              <h3 className="text-4xl md:text-6xl font-bold">
                500+
              </h3>

              <p className="text-white/60 mt-3">
                Completed Projects
              </p>
            </div>

            <div className="border border-white/10 rounded-[32px] p-8">
              <h3 className="text-4xl md:text-6xl font-bold">
                10+
              </h3>

              <p className="text-white/60 mt-3">
                Years Experience
              </p>
            </div>

            <div className="border border-white/10 rounded-[32px] p-8">
              <h3 className="text-4xl md:text-6xl font-bold">
                1000+
              </h3>

              <p className="text-white/60 mt-3">
                Customers Served
              </p>
            </div>

            <div className="border border-white/10 rounded-[32px] p-8">
              <h3 className="text-4xl md:text-6xl font-bold">
                24/7
              </h3>

              <p className="text-white/60 mt-3">
                Customer Support
              </p>
            </div>
          </div>
        </Container>
      </Section>

            {/* SHOWROOM EXPERIENCE */}

      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p
                className="
                uppercase
                tracking-[0.3em]
                text-[#D4AF37]
                mb-4
                "
              >
                Visit Our Showroom
              </p>

              <h2
                className="
                text-4xl
                md:text-6xl
                font-bold
                "
              >
                Experience
                <br />
                Materials
                <br />
                In Person.
              </h2>

              <p
                className="
                text-white/60
                mt-8
                text-lg
                leading-8
                "
              >
                Explore our collection of MDF, HDF,
                plywood and furniture accessories.
                See textures, colours and finishes
                before making your purchase.
              </p>

              <div className="mt-10 space-y-4">
                <div>
                  <span className="text-[#D4AF37]">
                    Address
                  </span>

                  <p className="text-white/70 mt-1">
                    {businessLocation.address}
                  </p>
                </div>

                <div>
                  <span className="text-[#D4AF37]">
                    Business Hours
                  </span>

                  <p className="text-white/70 mt-1">
                    Monday - Saturday
                    <br />
                    8:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <Link to="/contact">
                  <Button>
                    Visit Contact Page
                  </Button>
                </Link>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="h-[520px] rounded-[32px] border border-white/10 bg-zinc-900" />
              }
            >
              <GoogleLocationMap />
            </Suspense>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}

      <Section>
        <Container>
          <div
            className="
            relative
            overflow-hidden
            rounded-[50px]
            border
            border-white/10
            p-12
            md:p-24
            text-center
            "
          >
            <div
              className="
              absolute
              inset-0
              bg-gradient-to-br
              from-[#D4AF37]/10
              via-transparent
              to-transparent
              "
            />

            <div className="relative z-10">
              <p
                className="
                uppercase
                tracking-[0.3em]
                text-[#D4AF37]
                "
              >
                Ready To Build?
              </p>

              <h2
                className="
                text-4xl
                md:text-7xl
                font-bold
                mt-8
                "
              >
                Let's Create
                <br />
                Something Exceptional.
              </h2>

              <p
                className="
                text-white/60
                max-w-2xl
                mx-auto
                mt-8
                text-lg
                "
              >
                Get premium materials,
                professional recommendations
                and accurate project quotations.
              </p>

              <div
                className="
                flex
                flex-col
                sm:flex-row
                justify-center
                gap-4
                mt-12
                "
              >
                <Link to="/quotation">
                  <Button>
                    Generate Quote
                  </Button>
                </Link>

                <Link to="/materials">
                  <button
                    className="
                    px-8
                    py-4
                    rounded-full
                    border
                    border-white/20
                    hover:bg-white/10
                    transition
                    "
                  >
                    Explore Materials
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Home;
