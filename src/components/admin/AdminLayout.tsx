import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = () => {
  return (
    <div
      className="
      min-h-screen
      bg-[#0A0A0A]
      text-white
      flex
      "
    >
      <AdminSidebar />

      <main
        className="
        flex-1
        ml-20
        "
      >
        <AdminTopbar />

        <div className="p-8 pt-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;