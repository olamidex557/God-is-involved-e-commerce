import { useState } from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
  ShoppingBag,
  LayoutDashboard,
  User,
  LogOut,
  Package,
} from "lucide-react";

import logo from "../../assets/images/logo/logo.png";

import { useCartStore } from "../../store/cartStore";

import {
  useAuth,
} from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] =
    useState(false);

  const location =
    useLocation();

  const {
    user,
    logout,
  } = useAuth();

  const cartItems =
    useCartStore(
      (state) => state.items
    );

  const totalItems =
    cartItems.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  const navLinks = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Materials",
      path: "/materials",
    },
    {
      label: "Quotation",
      path: "/quotation",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  const handleLogout =
    () => {
      logout();
      setOpen(false);
    };

  return (
    <>
      {/* NAVBAR */}

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
            bg-black/40
            backdrop-blur-2xl
            border
            border-white/10
            px-6
            lg:px-8
            flex
            items-center
            justify-between
            "
          >
            {/* LOGO */}

            <Link
              to="/"
              className="
              flex
              items-center
              "
            >
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

            {/* DESKTOP NAV */}

            <nav
              className="
              hidden
              lg:flex
              items-center
              gap-10
              "
            >
              {navLinks.map(
                (link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      transition
                      hover:text-[#D4AF37]
                      ${
                        location.pathname ===
                        link.path
                          ? "text-[#D4AF37]"
                          : "text-white"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* RIGHT SIDE */}

            <div
              className="
              flex
              items-center
              gap-4
              "
            >
              {/* GUEST */}

              {!user && (
                <>
                  <Link
                    to="/login"
                    className="
                    hidden
                    md:flex
                    text-sm
                    hover:text-[#D4AF37]
                    transition
                    "
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="
                    hidden
                    md:flex
                    items-center
                    justify-center
                    px-5
                    py-2
                    rounded-full
                    bg-[#D4AF37]
                    text-black
                    font-semibold
                    "
                  >
                    Register
                  </Link>
                </>
              )}

              {/* CUSTOMER */}

              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className="
                    hidden
                    md:flex
                    items-center
                    gap-2
                    text-sm
                    hover:text-[#D4AF37]
                    transition
                    "
                  >
                    <User
                      size={18}
                    />

                    <span>
                      {
                        user.firstName
                      }
                    </span>
                  </Link>

                  <Link
                    to="/orders"
                    className="
                    hidden
                    md:flex
                    items-center
                    gap-2
                    text-sm
                    hover:text-[#D4AF37]
                    transition
                    "
                  >
                    <Package
                      size={18}
                    />

                    Orders
                  </Link>

                  {user.role ===
                    "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="
                      hidden
                      md:flex
                      "
                    >
                      <LayoutDashboard
                        size={20}
                      />
                    </Link>
                  )}

                  <button
                    onClick={
                      handleLogout
                    }
                    className="
                    hidden
                    md:flex
                    hover:text-red-400
                    transition
                    "
                  >
                    <LogOut
                      size={20}
                    />
                  </button>
                </>
              )}

              {/* CART */}

              <Link
                to="/cart"
                className="
                relative
                "
              >
                <ShoppingBag
                  size={24}
                />

                {totalItems >
                  0 && (
                  <span
                    className="
                    absolute
                    -top-2
                    -right-2
                    w-5
                    h-5
                    rounded-full
                    bg-[#D4AF37]
                    text-black
                    text-xs
                    font-bold
                    flex
                    items-center
                    justify-center
                    "
                  >
                    {
                      totalItems
                    }
                  </span>
                )}
              </Link>

              {/* MOBILE MENU */}

              <button
                className="
                lg:hidden
                "
                onClick={() =>
                  setOpen(true)
                }
              >
                <Menu
                  size={28}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}

      <div
        className={`
          fixed
          inset-0
          z-[100]
          bg-black
          transition-all
          duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      >
        <div className="p-8">
          {/* TOP */}

          <div
            className="
            flex
            justify-between
            items-center
            "
          >
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
              <X
                size={30}
              />
            </button>
          </div>

          {/* LINKS */}

          <div
            className="
            flex
            flex-col
            gap-8
            mt-20
            "
          >
            {navLinks.map(
              (link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                  text-4xl
                  font-bold
                  "
                >
                  {link.label}
                </Link>
              )
            )}

            <Link
              to="/cart"
              onClick={() =>
                setOpen(false)
              }
              className="
              text-4xl
              font-bold
              "
            >
              Cart
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                  text-4xl
                  font-bold
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                  text-4xl
                  font-bold
                  text-[#D4AF37]
                  "
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                  text-4xl
                  font-bold
                  "
                >
                  Dashboard
                </Link>

                <Link
                  to="/orders"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                  text-4xl
                  font-bold
                  "
                >
                  Orders
                </Link>

                <Link
                  to="/profile"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                  text-4xl
                  font-bold
                  "
                >
                  Profile
                </Link>

                {user.role ===
                  "admin" && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() =>
                      setOpen(false)
                    }
                    className="
                    text-4xl
                    font-bold
                    "
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={
                    handleLogout
                  }
                  className="
                  text-left
                  text-4xl
                  font-bold
                  text-red-400
                  "
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;