import UserStats from "../../../components/admin/users/UserStats";
import UserCard from "../../../components/admin/users/UserCard";
import UserActivity from "../../../components/admin/users/UserActivity";

const users = [
  {
    name:
      "Olamide Adebayo",
    email:
      "olamide@gmail.com",
    orders: 12,
    quotes: 5,
    spending:
      "₦450K",
  },
  {
    name:
      "James David",
    email:
      "james@gmail.com",
    orders: 7,
    quotes: 2,
    spending:
      "₦180K",
  },
  {
    name:
      "Sarah Johnson",
    email:
      "sarah@gmail.com",
    orders: 14,
    quotes: 6,
    spending:
      "₦720K",
  },
];

const Users = () => {
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

      <UserStats />

      <div
        className="
        mt-8
        grid
        lg:grid-cols-3
        gap-6
        "
      >
        {users.map(
          (
            user,
            index
          ) => (
            <UserCard
              key={index}
              user={user}
            />
          )
        )}
      </div>

      <div className="mt-8">
        <UserActivity />
      </div>
    </>
  );
};

export default Users;