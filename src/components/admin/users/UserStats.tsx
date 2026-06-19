interface User {
  _id: string;
  role: string;
  totalSpent: number;
  createdAt: string;
}

interface Props {
  users: User[];
}

const UserStats = ({
  users,
}: Props) => {
  const totalUsers =
    users.length;

  const vipCustomers =
    users.filter(
      (user) =>
        user.totalSpent >=
        100000
    ).length;

  const currentMonth =
    new Date().getMonth();

  const currentYear =
    new Date().getFullYear();

  const newCustomers =
    users.filter(
      (user) => {
        const date =
          new Date(
            user.createdAt
          );

        return (
          date.getMonth() ===
            currentMonth &&
          date.getFullYear() ===
            currentYear
        );
      }
    ).length;

  const totalRevenue =
    users.reduce(
      (
        total,
        user
      ) =>
        total +
        user.totalSpent,
      0
    );

  const stats = [
    {
      title:
        "Customers",
      value:
        totalUsers,
    },
    {
      title:
        "VIP Clients",
      value:
        vipCustomers,
    },
    {
      title:
        "New This Month",
      value:
        newCustomers,
    },
    {
      title:
        "Customer Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
    },
  ];

  return (
    <div
      className="
      grid
      md:grid-cols-4
      gap-6
      "
    >
      {stats.map(
        (item) => (
          <div
            key={
              item.title
            }
            className="
            bg-white/[0.03]
            border
            border-white/10
            rounded-3xl
            p-6
            "
          >
            <p className="text-white/50">
              {item.title}
            </p>

            <h3
              className="
              text-4xl
              font-bold
              mt-3
              "
            >
              {item.value}
            </h3>
          </div>
        )
      )}
    </div>
  );
};

export default UserStats;