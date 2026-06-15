import {
  Building2,
  ShieldCheck,
  Package,
  Truck,
} from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const features = [
  {
    icon: Package,
    title:
      "Premium Materials",
  },
  {
    icon: Truck,
    title:
      "Nationwide Delivery",
  },
  {
    icon: ShieldCheck,
    title:
      "Secure Orders",
  },
  {
    icon: Building2,
    title:
      "Trusted Suppliers",
  },
];

const AuthLayout = ({
  children,
  title,
  subtitle,
}: AuthLayoutProps) => {
  return (
    <div
      className="
      min-h-screen
      bg-[#050505]
      text-white
      "
    >
      <div
        className="
        grid
        lg:grid-cols-[60%_40%]
        min-h-screen
        "
      >
        {/* LEFT */}

        <div
          className="
          relative
          hidden
          lg:flex
          flex-col
          justify-between
          p-16
          overflow-hidden
          "
        >
          <div
            className="
            absolute
            top-0
            left-0
            w-[500px]
            h-[500px]
            rounded-full
            bg-[#D4AF37]/10
            blur-[160px]
            "
          />

          <div className="relative z-10">
            <div
              className="
              inline-flex
              items-center
              gap-3
              "
            >

            </div>

            <h1
              className="
              text-7xl
              font-bold
              leading-[1]
              mt-16
              max-w-3xl
              "
            >
              Building
              Materials
              Made For
              Professionals.
            </h1>

            <p
              className="
              text-xl
              text-white/60
              mt-8
              max-w-xl
              "
            >
              Source materials,
              request quotations,
              track deliveries and
              manage procurement
              from one platform.
            </p>
          </div>

          {/* MOCK ILLUSTRATION */}

          

          <div
            className="
            relative
            z-10
            grid
            grid-cols-2
            gap-5
            "
          >
            {features.map(
              (
                item,
                index
              ) => {
                const Icon =
                  item.icon;

                return (
                  <div
                    key={index}
                    className="
                    bg-white/[0.03]
                    border
                    border-white/10
                    rounded-3xl
                    p-5
                    "
                  >
                    <Icon
                      size={24}
                      className="
                      text-[#D4AF37]
                      "
                    />

                    <p
                      className="
                      mt-4
                      font-medium
                      "
                    >
                      {item.title}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="
          flex
          items-center
          justify-center
          px-6
          py-12
          "
        >
          <div
            className="
            w-full
            max-w-xl
            "
          >
            <div
              className="
              bg-white/[0.04]
              border
              border-white/10
              rounded-[40px]
              p-10
              backdrop-blur-xl
              shadow-2xl
              "
            >
              <h2
                className="
                text-5xl
                font-bold
                "
              >
                {title}
              </h2>

              <p
                className="
                mt-4
                text-white/50
                "
              >
                {subtitle}
              </p>

              <div className="mt-10">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;