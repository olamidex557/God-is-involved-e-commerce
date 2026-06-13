interface Props {
  user: {
    name: string;
    email: string;
    orders: number;
    quotes: number;
    spending: string;
  };
}

const UserCard = ({
  user,
}: Props) => {
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
        {user.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>

      <h3
        className="
        text-lg
        font-semibold
        mt-4
        "
      >
        {user.name}
      </h3>

      <p className="text-white/50">
        {user.email}
      </p>

      <div
        className="
        mt-6
        grid
        grid-cols-3
        gap-3
        text-center
        "
      >
        <div>
          <p className="font-bold">
            {user.orders}
          </p>

          <p className="text-xs text-white/50">
            Orders
          </p>
        </div>

        <div>
          <p className="font-bold">
            {user.quotes}
          </p>

          <p className="text-xs text-white/50">
            Quotes
          </p>
        </div>

        <div>
          <p className="font-bold">
            {user.spending}
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