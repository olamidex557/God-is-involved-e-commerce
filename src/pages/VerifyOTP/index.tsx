import {
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  verifyOTP,
  resendOTP,
} from "../../services/api/auth";

const VerifyOTP = () => {
  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const email =
    searchParams.get(
      "email"
    ) || "";

  const [otp, setOtp] =
    useState("");

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

  const handleVerify =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);
        setError("");

        const response =
          await verifyOTP(
            email,
            otp
          );

        setMessage(
          response.message
        );

        setTimeout(() => {
          navigate(
            "/login"
          );
        }, 1500);
      } catch (
        error: any
      ) {
        setError(
          error?.response?.data
            ?.message ||
            "Verification failed"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleResend =
    async () => {
      try {
        await resendOTP(
          email
        );

        setMessage(
          "OTP resent successfully"
        );
      } catch (
        error: any
      ) {
        setError(
          error?.response?.data
            ?.message ||
            "Unable to resend OTP"
        );
      }
    };

  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      px-6
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        "
      >
        <h1
          className="
          text-4xl
          font-bold
          mb-4
          "
        >
          Verify Email
        </h1>

        <p
          className="
          text-white/60
          mb-8
          "
        >
          Enter the 6-digit code
          sent to:
          <br />
          {email}
        </p>

        <form
          onSubmit={
            handleVerify
          }
          className="
          space-y-4
          "
        >
          <input
            type="text"
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
              )
            }
            placeholder="Enter OTP"
            className="
            w-full
            bg-zinc-900
            rounded-2xl
            p-4
            outline-none
            "
          />

          {error && (
            <p className="text-red-400">
              {error}
            </p>
          )}

          {message && (
            <p className="text-green-400">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={
              loading
            }
            className="
            w-full
            bg-[#D4AF37]
            text-black
            py-4
            rounded-2xl
            font-semibold
            "
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>
        </form>

        <button
          onClick={
            handleResend
          }
          className="
          mt-4
          w-full
          border
          border-white/10
          py-4
          rounded-2xl
          "
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;