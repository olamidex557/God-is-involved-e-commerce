import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";
import {
  businessLocation,
} from "../../config/location";

const Footer = () => {
  return (
    <footer
      className="
      mt-20
      border-t
      border-white/10
      bg-black/40
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* MAIN FOOTER */}

        <div className="py-10 md:py-12">
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr_1fr]
            gap-8
            "
          >
            {/* BRAND */}

            <div className="sm:col-span-2 lg:col-span-1">
              <img
                src={logo}
                alt="God Is Involved"
                className="h-12 object-contain"
              />

              <h2
                className="
                text-2xl
                md:text-3xl
                font-bold
                mt-5
                leading-tight
                "
              >
                Premium Building
                <br />
                Materials For
                <br />
                Exceptional Spaces.
              </h2>

              <p
                className="
                text-white/60
                mt-4
                max-w-md
                text-sm
                leading-6
                "
              >
                MDF, HDF, plywood and furniture
                accessories trusted by architects,
                contractors and furniture makers
                across Nigeria.
              </p>
            </div>

            {/* QUICK LINKS */}

            <div>
              <h3
                className="
                font-bold
                text-base
                mb-4
                "
              >
                Quick Links
              </h3>

              <div className="flex flex-col gap-2 text-sm text-white/60">
                <Link to="/">Home</Link>

                <Link to="/materials">
                  Materials
                </Link>

                <Link to="/quotation">
                  Quotation
                </Link>

                <Link to="/contact">
                  Contact
                </Link>

                <Link to="/track-order">
                  Track Order
                </Link>
              </div>
            </div>

            {/* COLLECTIONS */}

            <div>
              <h3
                className="
                font-bold
                text-base
                mb-4
                "
              >
                Collections
              </h3>

              <div className="flex flex-col gap-2 text-sm text-white/60">
                <Link to="/materials">
                  MDF Boards
                </Link>

                <Link to="/materials">
                  HDF Boards
                </Link>

                <Link to="/materials">
                  Plywood
                </Link>

                <Link to="/materials">
                  Accessories
                </Link>
              </div>
            </div>

            {/* LEGAL */}

            <div>
              <h3
                className="
                font-bold
                text-base
                mb-4
                "
              >
                Legal
              </h3>

              <div className="flex flex-col gap-2 text-sm text-white/60">
                <Link to="/privacy-policy">
                  Privacy Policy
                </Link>

                <Link to="/terms">
                  Terms & Conditions
                </Link>

                <Link to="/returns-policy">
                  Returns Policy
                </Link>

                <Link to="/shipping-policy">
                  Shipping Policy
                </Link>
              </div>
            </div>

            {/* CONTACT */}

            <div>
              <h3
                className="
                font-bold
                text-base
                mb-4
                "
              >
                Contact
              </h3>

              <div className="flex flex-col gap-2 text-sm text-white/60">
                <p>
                  {businessLocation.address}
                </p>

                <p>
                  support@godisinvolved.com
                </p>

                <p>
                  +234 XXX XXX XXXX
                </p>

                <a
                  href="https://wa.me/234XXXXXXXXXX"
                  target="_blank"
                  rel="noreferrer"
                  className="
                  text-[#D4AF37]
                  hover:text-white
                  transition
                  "
                >
                  WhatsApp →
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div
          className="
          border-t
          border-white/10
          py-5
          "
        >
          <div
            className="
            flex
            flex-col
            md:flex-row
            gap-4
            justify-between
            items-center
            text-center
            "
          >
            <p className="text-white/50 text-sm">
              © 2026 God Is Involved.
              All Rights Reserved.
            </p>

            <div
              className="
              flex
              flex-wrap
              justify-center
              gap-6
              text-white/50
              text-sm
              "
            >
              <a
                href="#"
                className="hover:text-white transition"
              >
                Instagram
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                Facebook
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
