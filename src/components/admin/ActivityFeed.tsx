import WorkspaceCard from "./WorkspaceCard";

const activities = [
  "New quotation submitted",
  "Order #102 paid",
  "Inventory updated",
  "Customer registered",
  "Delivery completed",
];

const ActivityFeed = () => {
  return (
    <WorkspaceCard
      title="Live Activity"
    >
      <div className="space-y-4">
        {activities.map(
          (
            item,
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

              <p>{item}</p>
            </div>
          )
        )}
      </div>
    </WorkspaceCard>
  );
};

export default ActivityFeed;