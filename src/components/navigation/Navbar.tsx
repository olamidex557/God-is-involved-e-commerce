import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";

import logo from "../../assets/images/logo/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="
        fixed
        top-4
        left-0
        right-0
        z-50
        "
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div
            className="
            h-20
            rounded-full
            bg-black/30
            backdrop-blur-2xl
            border
            border-white/10
            px-8
            flex
            items-center
            justify-between
            "
          >
            {/* LOGO */}

            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="God Is Involved"
                className="
                h-20
                sm:h-24
                md:h-28
                lg:h-32
                w-auto
                object-contain
                drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]
                "
              />
            </Link>

            {/* DESKTOP */}

            <nav className="hidden lg:flex items-center gap-10">
              <Link
                to="/"
                className="hover:text-[#D4AF37]"
              >
                Home
              </Link>

              <Link
                to="/materials"
                className="hover:text-[#D4AF37]"
              >
                Materials
              </Link>

              <Link
                to="/quotation"
                className="hover:text-[#D4AF37]"
              >
                Quotations
              </Link>

              <Link
                to="/contact"
                className="hover:text-[#D4AF37]"
              >
                Contact
              </Link>
            </nav>

            {/* RIGHT */}

            <div className="flex items-center gap-5">
              <Link to="/cart">
                <ShoppingBag size={22} />
              </Link>

              <button
                className="lg:hidden"
                onClick={() =>
                  setOpen(true)
                }
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      <div
        className={`
          fixed
          inset-0
          z-[100]
          bg-black
          transition-all
          duration-500
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      >
        <div className="p-8">
          <div className="flex justify-between">
            <img
              src={logo}
              alt=""
              className="h-12"
            />

            <button
              onClick={() =>
                setOpen(false)
              }
            >
              <X size={30} />
            </button>
          </div>

          <div
            className="
            flex
            flex-col
            gap-8
            mt-24
            "
          >
            <Link
              to="/"
              className="text-4xl font-bold"
            >
              Home
            </Link>

            <Link
              to="/materials"
              className="text-4xl font-bold"
            >
              Materials
            </Link>

            <Link
              to="/quotation"
              className="text-4xl font-bold"
            >
              Quotations
            </Link>

            <Link
              to="/contact"
              className="text-4xl font-bold"
            >
              Contact
            </Link>

            <Link
              to="/login"
              className="text-4xl font-bold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;