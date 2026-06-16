interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
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
        (
          a,
          b
        ) =>
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
        Recent Customer Activity
      </h2>

      {recentUsers.length ===
      0 ? (
        <p className="text-white/50">
          No customer activity.
        </p>
      ) : (
        <div className="space-y-4">
          {recentUsers.map(
            (user) => (
              <div
                key={
                  user._id
                }
                className="
                flex
                items-start
                gap-4
                border-b
                border-white/10
                pb-4
                "
              >
                <div
                  className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#D4AF37]
                  text-black
                  font-bold
                  flex
                  items-center
                  justify-center
                  "
                >
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>

                <div>
                  <p className="font-medium">
                    {
                      user.firstName
                    }{" "}
                    {
                      user.lastName
                    }
                  </p>

                  <p
                    className="
                    text-sm
                    text-white/50
                    "
                  >
                    {
                      user.email
                    }
                  </p>

                  <p
                    className="
                    text-xs
                    text-[#D4AF37]
                    mt-1
                    "
                  >
                    Registered{" "}
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UserActivity;