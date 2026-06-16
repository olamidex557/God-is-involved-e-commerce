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
import VerifyOTP from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/admin/Dashboard";
import ProductsAdmin from "./pages/admin/Products";
import OrdersAdmin from "./pages/admin/Orders";
import Inventory from "./pages/admin/Inventory";
import Quotations from "./pages/admin/Quotations";
import Users from "./pages/admin/Users";
import Payments from "./pages/admin/Payments";
import Delivery from "./pages/admin/Delivery";
import Settings from "./pages/admin/Settings";

import AdminRouteLayout from "./layouts/AdminRouteLayout";

import ProtectedAdminRoute
  from "./routes/ProtectedAdminRoute";

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
      {/* AUTH PAGES */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/verify-otp"
        element={<VerifyOTP />}
      />

      <Route
        path="/forgot-password"
        element={
          <ForgotPassword />
        }
      />

      <Route
        path="/reset-password"
        element={
          <ResetPassword />
        }
      />

      {/* PUBLIC WEBSITE */}

      <Route
        element={<PublicLayout />}
      >
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
        element={
          <ProtectedAdminRoute />
        }
      >
        <Route
          element={
            <AdminRouteLayout />
          }
        >
          <Route
            path="/admin/dashboard"
            element={
              <AdminDashboard />
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProductsAdmin />
            }
          />

          <Route
            path="/admin/inventory"
            element={
              <Inventory />
            }
          />

          <Route
            path="/admin/orders"
            element={
              <OrdersAdmin />
            }
          />

          <Route
            path="/admin/quotations"
            element={
              <Quotations />
            }
          />

          <Route
            path="/admin/users"
            element={<Users />}
          />

          <Route
            path="/admin/payments"
            element={
              <Payments />
            }
          />

          <Route
            path="/admin/delivery"
            element={
              <Delivery />
            }
          />

          <Route
            path="/admin/settings"
            element={
              <Settings />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;