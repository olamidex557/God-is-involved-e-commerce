import {
  Bell,
  Search,
} from "lucide-react";

const AdminTopbar =
  () => {
    return (
      <header
        className="
        h-20
        border-b
        border-white/10
        px-8
        flex
        items-center
        justify-between
        "
      >
        <div>
          <h1
            className="
            text-2xl
            font-bold
            "
          >
            Control Center
          </h1>
        </div>

        <div
          className="
          flex
          items-center
          gap-4
          "
        >
          <div
            className="
            flex
            items-center
            gap-2
            bg-white/5
            px-4
            py-2
            rounded-xl
            "
          >
            <Search
              size={18}
            />

            <input
              placeholder="Search..."
              className="
              bg-transparent
              outline-none
              "
            />
          </div>

          <button
            className="
            w-10
            h-10
            rounded-xl
            bg-white/5
            flex
            items-center
            justify-center
            "
          >
            <Bell
              size={18}
            />
          </button>
        </div>
      </header>
    );
  };

export default AdminTopbar;