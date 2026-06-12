const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold mb-10">
          Welcome Back
        </h1>

        <div className="space-y-4">
          <input
            placeholder="Email"
            className="w-full bg-zinc-900 p-4 rounded-2xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-900 p-4 rounded-2xl"
          />

          <button className="w-full bg-[#D4AF37] text-black py-4 rounded-full font-semibold">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;