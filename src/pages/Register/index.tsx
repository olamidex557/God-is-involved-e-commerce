import {
  useState,
} from "react";
import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../../layouts/auth/AuthLayout";

import {
  register,
} from "../../services/api/auth";

const Register = () => {
  const navigate =
    useNavigate();

  const [
    firstName,
    setFirstName,
  ] = useState("");

  const [
    lastName,
    setLastName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
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

      if (
        !firstName ||
        !lastName ||
        !email ||
        !password
      ) {
        setError(
          "Please fill all fields"
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        setError(
          "Passwords do not match"
        );

        return;
      }

      try {
        setLoading(true);

        await register({
          firstName,
          lastName,
          email,
          password,
        });

        navigate(
          `/verify-otp?email=${encodeURIComponent(
            email
          )}`
        );
      } catch (
        error: unknown
      ) {
        setError(
          axios.isAxiosError(
            error
          )
            ? error.response?.data
                ?.message ||
                "Registration failed"
            : "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join thousands of builders, contractors and suppliers using God Is Involved."
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-5"
      >
        <div
          className="
          grid
          md:grid-cols-2
          gap-4
          "
        >
          <input
            type="text"
            placeholder="First Name"
            value={
              firstName
            }
            onChange={(e) =>
              setFirstName(
                e.target.value
              )
            }
            className="
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
            type="text"
            placeholder="Last Name"
            value={
              lastName
            }
            onChange={(e) =>
              setLastName(
                e.target.value
              )
            }
            className="
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
        </div>

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={
            confirmPassword
          }
          onChange={(e) =>
            setConfirmPassword(
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
            ? "Creating Account..."
            : "Create Account"}
        </button>

        <p
          className="
          text-center
          text-white/50
          "
        >
          Already have an
          account?{" "}
          <Link
            to="/login"
            className="
            text-[#D4AF37]
            font-medium
            "
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
