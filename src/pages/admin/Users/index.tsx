import UserStats from "../../../components/admin/users/UserStats";
import UserCard from "../../../components/admin/users/UserCard";
import UserActivity from "../../../components/admin/users/UserActivity";

import {
  useUsers,
} from "../../../hooks/admin/useUsers";

const Users = () => {
  const {
    users,
    loading,
  } = useUsers();

  const vipCustomers =
    users.filter(
      (user) =>
        user.totalSpent >=
        500000
    ).length;

  const totalRevenue =
    users.reduce(
      (
        total,
        user
      ) =>
        total +
        (user.totalSpent || 0),
      0
    );

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

  return (
    <>
      <div className="mb-8">
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Customers
        </h1>

        <p className="text-white/50 mt-2">
          Customer relationships
          and activity.
        </p>
      </div>

      <UserStats
        totalUsers={
          users.length
        }
        vipCustomers={
          vipCustomers
        }
        newCustomers={
          newCustomers
        }
        totalRevenue={
          totalRevenue
        }
      />

      {loading ? (
        <div
          className="
          mt-8
          text-white/50
          "
        >
          Loading customers...
        </div>
      ) : (
        <div
          className="
          mt-8
          grid
          lg:grid-cols-3
          gap-6
          "
        >
          {users.map(
            (user) => (
              <UserCard
                key={user._id}
                user={{
                  name: `${user.firstName} ${user.lastName}`,
                  email:
                    user.email,
                  orders:
                    user.totalOrders,
                  quotes: 0,
                  spending: `₦${user.totalSpent.toLocaleString()}`,
                }}
              />
            )
          )}
        </div>
      )}

      <div className="mt-8">
        <UserActivity
          users={users}
        />
      </div>
    </>
  );
};

export default Users;