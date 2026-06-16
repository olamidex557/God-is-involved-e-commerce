import {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import AuthLayout from "../../layouts/auth/AuthLayout";

import {
  forgotPassword,
} from "../../services/api/auth";

const ForgotPassword = () => {
  const [
    email,
    setEmail,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);
        setError("");

        const response =
          await forgotPassword(
            email
          );

        setMessage(
          response.message
        );
      } catch (
        error: any
      ) {
        setError(
          error?.response?.data
            ?.message ||
            "Unable to send reset email"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address and we'll send a reset link."
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-5"
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
          "
        />

        {message && (
          <div className="text-green-400">
            {message}
          </div>
        )}

        {error && (
          <div className="text-red-400">
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
          "
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        <div className="text-center">
          <Link
            to="/login"
            className="
            text-[#D4AF37]
            "
          >
            Back To Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;