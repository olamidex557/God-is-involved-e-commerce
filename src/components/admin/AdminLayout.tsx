import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({
  children,
}: Props) => {
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

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;