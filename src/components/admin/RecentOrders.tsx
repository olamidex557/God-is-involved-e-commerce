import WorkspaceCard from "./WorkspaceCard";

const RecentOrders = () => {
  return (
    <WorkspaceCard
      title="Recent Orders"
    >
      <div className="space-y-3">
        <p>#102 • ₦45,000</p>
        <p>#101 • ₦22,000</p>
        <p>#100 • ₦89,000</p>
      </div>
    </WorkspaceCard>
  );
};

export default RecentOrders;