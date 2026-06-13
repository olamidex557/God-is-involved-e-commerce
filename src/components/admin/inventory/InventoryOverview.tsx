import InventoryCard from "./InventoryCard";

const InventoryOverview =
  () => {
    return (
      <div
        className="
        grid
        md:grid-cols-4
        gap-6
        "
      >
        <InventoryCard
          title="Total SKUs"
          value="942"
          color="bg-green-500"
        />

        <InventoryCard
          title="Healthy"
          value="812"
          color="bg-green-500"
        />

        <InventoryCard
          title="Low Stock"
          value="98"
          color="bg-orange-500"
        />

        <InventoryCard
          title="Critical"
          value="32"
          color="bg-red-500"
        />
      </div>
    );
  };

export default InventoryOverview;