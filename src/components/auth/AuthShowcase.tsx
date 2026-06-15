import {
  ShieldCheck,
  Truck,
  Package,
  Building2,
} from "lucide-react";

const features = [
  {
    icon: Package,
    text:
      "Premium Building Materials",
  },
  {
    icon: Truck,
    text:
      "Nationwide Delivery",
  },
  {
    icon: ShieldCheck,
    text:
      "Secure Orders",
  },
  {
    icon: Building2,
    text:
      "Trusted Suppliers",
  },
];

const AuthShowcase = () => {
  return (
    <div
      className="
      hidden
      lg:flex
      flex-col
      justify-between
      p-12
      relative
      overflow-hidden
      "
    >
      <div
        className="
        absolute
        top-0
        left-0
        w-96
        h-96
        bg-[#D4AF37]/10
        blur-[120px]
        rounded-full
        "
      />

      <div className="relative z-10">
        <div
          className="
          inline-flex
          items-center
          px-4
          py-2
          rounded-full
          border
          border-[#D4AF37]/30
          bg-[#D4AF37]/10
          text-[#D4AF37]
          text-sm
          "
        >
          GOD IS INVOLVED
        </div>

        <h1
          className="
          mt-8
          text-5xl
          font-bold
          leading-tight
          "
        >
          Building
          <br />
          Materials
          <br />
          Made Simple.
        </h1>

        <p
          className="
          mt-6
          text-lg
          text-white/60
          max-w-md
          "
        >
          Source materials,
          request quotations,
          manage orders and
          grow your projects
          from one platform.
        </p>
      </div>

      <div
        className="
        relative
        z-10
        space-y-4
        "
      >
        {features.map(
          (
            feature,
            index
          ) => {
            const Icon =
              feature.icon;

            return (
              <div
                key={index}
                className="
                flex
                items-center
                gap-4
                "
              >
                <div
                  className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  "
                >
                  <Icon
                    size={20}
                  />
                </div>

                <span
                  className="
                  text-white/80
                  "
                >
                  {feature.text}
                </span>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default AuthShowcase;