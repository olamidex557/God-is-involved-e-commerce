import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
import QuoteButton from "../components/common/QuoteButton";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <WhatsAppButton />
      <QuoteButton />
    </>
  );
};

export default MainLayout;