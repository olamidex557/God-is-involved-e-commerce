import Container from "../../components/ui/Container";

const Profile = () => {
  return (
    <div className="pt-32 pb-32">
      <Container>
        <div className="mb-16">
          <p className="uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            Profile
          </p>

          <h1 className="text-6xl font-bold">
            Account
            <br />
            Settings
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
          <div className="border border-white/10 rounded-[32px] p-8">
            <div className="w-24 h-24 rounded-full bg-zinc-800 mb-6" />

            <h3 className="text-2xl font-bold">
              Olamide
            </h3>

            <p className="text-white/50 mt-2">
              olamide@email.com
            </p>
          </div>

          <div className="border border-white/10 rounded-[32px] p-8">
            <h2 className="text-3xl font-bold mb-8">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                placeholder="Full Name"
                className="bg-zinc-900 rounded-2xl p-4"
              />

              <input
                placeholder="Phone Number"
                className="bg-zinc-900 rounded-2xl p-4"
              />

              <input
                placeholder="Email Address"
                className="bg-zinc-900 rounded-2xl p-4 md:col-span-2"
              />

              <textarea
                rows={4}
                placeholder="Address"
                className="bg-zinc-900 rounded-2xl p-4 md:col-span-2"
              />
            </div>

            <button className="mt-8 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-semibold">
              Save Changes
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;