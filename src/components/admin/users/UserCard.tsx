import type {
  User,
} from "../../../types/user";

interface Props {
  user: User;
}

const UserCard = ({
  user,
}: Props) => {
  const initials =
    `${user.firstName[0] ?? ""}${
      user.lastName[0] ?? ""
    }`;

  return (
    <div
      className="
      bg-white/[0.03]
      border
      border-white/10
      rounded-3xl
      p-6
      hover:border-[#D4AF37]
      transition
      "
    >
      <div
        className="
        w-14
        h-14
        rounded-full
        bg-[#D4AF37]
        text-black
        flex
        items-center
        justify-center
        font-bold
        text-lg
        "
      >
        {initials}
      </div>

      <h3
        className="
        text-lg
        font-semibold
        mt-4
        "
      >
        {user.firstName}{" "}
        {user.lastName}
      </h3>

      <p className="text-white/50">
        {user.email}
      </p>

      <p
        className="
        mt-2
        text-xs
        uppercase
        text-[#D4AF37]
        "
      >
        {user.role}
      </p>

      <div
        className="
        mt-6
        grid
        grid-cols-2
        gap-4
        text-center
        "
      >
        <div>
          <p className="font-bold">
            {user.totalOrders ||
              0}
          </p>

          <p className="text-xs text-white/50">
            Orders
          </p>
        </div>

        <div>
          <p className="font-bold">
            ₦
            {(user.totalSpent ||
              0).toLocaleString()}
          </p>

          <p className="text-xs text-white/50">
            Spent
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
