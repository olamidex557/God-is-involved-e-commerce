import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../../layouts/auth/AuthLayout";

import {
  login,
} from "../../services/api/auth";

import {
  useAuth,
} from "../../context/AuthContext";

const Login = () => {
  const navigate =
    useNavigate();

  const {
    login: loginUser,
  } = useAuth();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      setError("");

      try {
        setLoading(true);

        const response =
          await login(
            email,
            password
          );

        loginUser(
          response.token,
          response.user
        );

        if (
          response.user.role ===
          "admin"
        ) {
          navigate(
            "/admin/dashboard"
          );

          return;
        }

        navigate("/");
      } catch (
        error: any
      ) {
        setError(
          error?.response?.data
            ?.message ||
            "Invalid email or password"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to manage quotations, orders, deliveries and inventory."
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="
        space-y-5
        "
      >
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
          w-full
          h-14
          px-5
          rounded-2xl
          bg-white/5
          border
          border-white/10
          outline-none
          focus:border-[#D4AF37]
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={
            password
          }
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
          w-full
          h-14
          px-5
          rounded-2xl
          bg-white/5
          border
          border-white/10
          outline-none
          focus:border-[#D4AF37]
          "
        />

        {error && (
          <div
            className="
            text-red-400
            text-sm
            "
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={
            loading
          }
          className="
          w-full
          h-14
          rounded-2xl
          bg-[#D4AF37]
          text-black
          font-semibold
          hover:opacity-90
          transition
          "
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

        <div
          className="
          flex
          items-center
          justify-center
          gap-2
          text-white/50
          "
        >
          <span>
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="
            text-[#D4AF37]
            font-medium
            "
          >
            Create Account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;