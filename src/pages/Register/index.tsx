const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold mb-10">
          Create Account
        </h1>

        <div className="space-y-4">
          <input
            placeholder="Full Name"
            className="w-full bg-zinc-900 p-4 rounded-2xl"
          />

          <input
            placeholder="Email"
            className="w-full bg-zinc-900 p-4 rounded-2xl"
          />

          <input
            placeholder="Phone Number"
            className="w-full bg-zinc-900 p-4 rounded-2xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-900 p-4 rounded-2xl"
          />

          <button className="w-full bg-[#D4AF37] text-black py-4 rounded-full font-semibold">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;