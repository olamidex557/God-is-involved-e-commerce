interface User {
  _id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface Props {
  users: User[];
}

const UserActivity = ({
  users,
}: Props) => {
  const recentUsers =
    [...users]
      .sort(
        (a, b) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      )
      .slice(0, 10);

  return (
    <div
      className="
      bg-white/[0.03]
      border
      border-white/10
      rounded-3xl
      p-6
      "
    >
      <h2
        className="
        text-xl
        font-semibold
        mb-6
        "
      >
        Recent Registrations
      </h2>

      <div className="space-y-4">
        {recentUsers.length ===
        0 ? (
          <p className="text-white/50">
            No activity found.
          </p>
        ) : (
          recentUsers.map(
            (user) => (
              <div
                key={
                  user._id
                }
                className="
                flex
                items-center
                gap-3
                "
              >
                <div
                  className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#D4AF37]
                  "
                />

                <div>
                  <p>
                    {
                      user.firstName
                    }{" "}
                    {
                      user.lastName
                    }{" "}
                    registered
                  </p>

                  <p
                    className="
                    text-xs
                    text-white/50
                    "
                  >
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default UserActivity;