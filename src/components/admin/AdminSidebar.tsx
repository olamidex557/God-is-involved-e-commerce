import {
  Home,
  Package,
  ShoppingBag,
  Boxes,
  Users,
  CreditCard,
  Truck,
  Settings,
} from "lucide-react";

const links = [
  {
    icon: Home,
    href:
      "/admin/dashboard",
  },
  {
    icon: Package,
    href:
      "/admin/products",
  },
  {
    icon: Boxes,
    href:
      "/admin/inventory",
  },
  {
    icon: ShoppingBag,
    href:
      "/admin/orders",
  },
  {
    icon: CreditCard,
    href:
      "/admin/payments",
  },
  {
    icon: Truck,
    href:
      "/admin/delivery",
  },
  {
    icon: Users,
    href:
      "/admin/users",
  },
  {
    icon: Settings,
    href:
      "/admin/settings",
  },
];

const AdminSidebar =
  () => {
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
        bg-black
        flex
        flex-col
        items-center
        py-6
        gap-5
        z-50
        "
      >
        <div
          className="
          w-12
          h-12
          rounded-xl
          bg-[#D4AF37]
          flex
          items-center
          justify-center
          font-bold
          text-black
          "
        >
          GI
        </div>

        {links.map(
          (
            Item,
            index
          ) => {
            const Icon =
              Item.icon;

            return (
              <a
                key={index}
                href={
                  Item.href
                }
                className="
                w-12
                h-12
                rounded-xl
                flex
                items-center
                justify-center
                hover:bg-white/10
                transition
                "
              >
                <Icon
                  size={
                    20
                  }
                />
              </a>
            );
          }
        )}
      </aside>
    );
  };

export default AdminSidebar;