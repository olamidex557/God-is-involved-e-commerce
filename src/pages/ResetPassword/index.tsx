import {
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import AuthLayout from "../../layouts/auth/AuthLayout";

import {
  resetPassword,
} from "../../services/api/auth";

const ResetPassword = () => {
  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const token =
    searchParams.get(
      "token"
    ) || "";

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

        await resetPassword(
          token,
          password
        );

        navigate(
          "/login"
        );
      } catch (
        error: any
      ) {
        setError(
          error?.response?.data
            ?.message ||
            "Reset failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new password."
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-5"
      >
        <input
          type="password"
          placeholder="New Password"
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
          "
        />

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
            ? "Updating..."
            : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;