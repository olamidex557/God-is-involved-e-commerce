import { NavLink } from "react-router-dom";

import {
  Home,
  Package,
  ShoppingBag,
  Boxes,
  Users,
  CreditCard,
  Truck,
  Settings,
  FileText,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/admin/dashboard",
  },
  {
    name: "Products",
    icon: Package,
    href: "/admin/products",
  },
  {
    name: "Inventory",
    icon: Boxes,
    href: "/admin/inventory",
  },
  {
    name: "Orders",
    icon: ShoppingBag,
    href: "/admin/orders",
  },
  {
    name: "Payments",
    icon: CreditCard,
    href: "/admin/payments",
  },
  {
    name: "Delivery",
    icon: Truck,
    href: "/admin/delivery",
  },
  {
    name: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
  {
  name: "Quotes",
  icon: FileText,
  href: "/admin/quotations",
},
];

const AdminSidebar = () => {
  return (
    <aside
      className="
      fixed
      left-0
      top-0
      h-screen
      w-20
      border-r
      border-white/10
      bg-[#050505]
      flex
      flex-col
      items-center
      py-6
      gap-4
      z-50
      overflow-visible
      "
    >
      {/* LOGO */}

      <div
        className="
        w-12
        h-12
        rounded-2xl
        bg-[#D4AF37]
        flex
        items-center
        justify-center
        font-bold
        text-black
        shadow-lg
        "
      >
        GI
      </div>

      {/* NAVIGATION */}

      <div
        className="
        flex
        flex-col
        gap-3
        mt-4
        "
      >
        {links.map(
          (Item, index) => {
            const Icon =
              Item.icon;

            return (
              <NavLink
                key={index}
                to={Item.href}
              >
                {({
                  isActive,
                }) => (
                  <div
                    className={`
                      group
                      relative
                      w-12
                      h-12
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? `
                            bg-[#D4AF37]
                            text-black
                            shadow-lg
                            shadow-[#D4AF37]/20
                          `
                          : `
                            text-white/70
                            hover:text-white
                            hover:bg-white/10
                          `
                      }
                    `}
                  >
                    <Icon
                      size={20}
                    />

                    {/* ACTIVE INDICATOR */}

                    {isActive && (
                      <span
                        className="
                        absolute
                        -right-[21px]
                        top-1/2
                        -translate-y-1/2
                        h-6
                        w-1
                        rounded-full
                        bg-[#D4AF37]
                        "
                      />
                    )}

                    {/* HOVER LABEL */}

                    <span
                      className="
                      absolute
                      left-16
                      whitespace-nowrap
                      px-3
                      py-2
                      rounded-xl
                      bg-zinc-900
                      border
                      border-white/10
                      text-sm
                      text-white
                      opacity-0
                      translate-x-2
                      pointer-events-none
                      transition-all
                      duration-300
                      shadow-xl
                      group-hover:opacity-100
                      group-hover:translate-x-0
                      "
                    >
                      {Item.name}
                    </span>
                  </div>
                )}
              </NavLink>
            );
          }
        )}
      </div>

      {/* USER AVATAR */}

      <div className="mt-auto">
        <div
          className="
          w-10
          h-10
          rounded-full
          bg-white/10
          border
          border-white/10
          flex
          items-center
          justify-center
          text-sm
          font-medium
          "
        >
          OA
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;