import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/Home";
import Materials from "./pages/Materials";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Quotation from "./pages/Quotation";
import OrderSuccess from "./pages/OrderSuccess";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/admin/Dashboard";
import ProductsAdmin from "./pages/admin/Products";

import AdminRouteLayout from "./layouts/AdminRouteLayout";
import OrdersAdmin from "./pages/admin/Orders";

/* PUBLIC LAYOUT */

function PublicLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* PUBLIC WEBSITE */}

      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/materials"
          element={<Materials />}
        />

        <Route
          path="/product/:id"
          element={<Product />}
        />

        <Route
          path="/quotation"
          element={<Quotation />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Route>

      {/* ADMIN */}

      <Route
        element={<AdminRouteLayout />}
      >
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/products"
          element={<ProductsAdmin />}
        />

        <Route
          path="/admin/orders"
          element={<OrdersAdmin />}
        />
      </Route>
    </Routes>
  );
}

export default App;