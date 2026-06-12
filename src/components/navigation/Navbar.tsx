import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";

import logo from "../../assets/images/logo/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-24 flex items-center justify-between">
            <Link to="/">
              <img
                src={logo}
                alt="God Is Involved"
                className="h-16 md:h-20 object-contain"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              <Link
                to="/materials"
                className="hover:text-[#D4AF37] transition"
              >
                Materials
              </Link>

              <Link
                to="/quotation"
                className="hover:text-[#D4AF37] transition"
              >
                Quotations
              </Link>

              <Link
                to="/contact"
                className="hover:text-[#D4AF37] transition"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-5">
              <Link to="/cart">
                <ShoppingBag />
              </Link>

              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden"
              >
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      <div
        className={`
          fixed inset-0 z-[100]
          bg-black
          transition-all duration-300
          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      >
        <div className="h-full flex flex-col p-8">
          <div className="flex justify-between items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-14"
            />

            <button
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-4xl font-bold"
            >
              Home
            </Link>

            <Link
              to="/materials"
              onClick={() => setIsOpen(false)}
              className="text-4xl font-bold"
            >
              Materials
            </Link>

            <Link
              to="/quotation"
              onClick={() => setIsOpen(false)}
              className="text-4xl font-bold"
            >
              Quotations
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="text-4xl font-bold"
            >
              Contact
            </Link>

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
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