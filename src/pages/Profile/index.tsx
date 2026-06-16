import {
  useAuth,
} from "../../context/AuthContext";

import Container from "../../components/ui/Container";

const Profile = () => {
  const { user } =
    useAuth();

  return (
    <div className="pt-32 pb-24">
      <Container>
        {/* HEADER */}

        <div className="mb-12">
          <p
            className="
            uppercase
            tracking-[0.3em]
            text-[#D4AF37]
            mb-3
            "
          >
            Account
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            "
          >
            My Profile
          </h1>
        </div>

        <div
          className="
          grid
          lg:grid-cols-[350px_1fr]
          gap-8
          "
        >
          {/* PROFILE CARD */}

          <div
            className="
            border
            border-white/10
            rounded-[32px]
            p-8
            "
          >
            <div
              className="
              w-24
              h-24
              rounded-full
              bg-[#D4AF37]
              text-black
              text-3xl
              font-bold
              flex
              items-center
              justify-center
              "
            >
              {user?.firstName?.[0]}
            </div>

            <h2
              className="
              text-2xl
              font-bold
              mt-6
              "
            >
              {user?.firstName}
              {" "}
              {user?.lastName}
            </h2>

            <p
              className="
              text-white/60
              mt-2
              "
            >
              {user?.email}
            </p>

            <div
              className="
              mt-6
              inline-flex
              px-4
              py-2
              rounded-full
              bg-green-500/20
              text-green-400
              "
            >
              Active Account
            </div>
          </div>

          {/* DETAILS */}

          <div
            className="
            border
            border-white/10
            rounded-[32px]
            p-8
            "
          >
            <h3
              className="
              text-2xl
              font-bold
              mb-8
              "
            >
              Account Details
            </h3>

            <div className="space-y-8">
              <div>
                <p className="text-white/50">
                  First Name
                </p>

                <p className="text-lg mt-2">
                  {user?.firstName}
                </p>
              </div>

              <div>
                <p className="text-white/50">
                  Last Name
                </p>

                <p className="text-lg mt-2">
                  {user?.lastName}
                </p>
              </div>

              <div>
                <p className="text-white/50">
                  Email Address
                </p>

                <p className="text-lg mt-2">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-white/50">
                  Account Type
                </p>

                <p
                  className="
                  text-lg
                  mt-2
                  capitalize
                  "
                >
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;