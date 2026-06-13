const UserStats = () => {
  return (
    <div
      className="
      grid
      md:grid-cols-4
      gap-6
      "
    >
      {[
        {
          title:
            "Customers",
          value: "842",
        },
        {
          title:
            "VIP Clients",
          value: "43",
        },
        {
          title:
            "New This Month",
          value: "87",
        },
        {
          title:
            "Retention",
          value: "92%",
        },
      ].map((item) => (
        <div
          key={item.title}
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
      ))}
    </div>
  );
};

export default UserStats;