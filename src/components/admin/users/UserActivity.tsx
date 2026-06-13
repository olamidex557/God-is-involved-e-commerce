const activities = [
  "Olamide placed an order",
  "TechHub requested a quote",
  "James completed payment",
  "Sarah registered",
  "David updated profile",
];

const UserActivity = () => {
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
        Customer Activity
      </h2>

      <div className="space-y-4">
        {activities.map(
          (
            activity,
            index
          ) => (
            <div
              key={index}
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

              <p>{activity}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserActivity;