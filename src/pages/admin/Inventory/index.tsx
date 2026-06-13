import InventoryOverview from "../../../components/admin/inventory/InventoryOverview";
import StockHealth from "../../../components/admin/inventory/StockHealth";

const Inventory = () => {
  return (
    <>
      <div className="mb-8">
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Inventory
        </h1>

        <p className="text-white/50 mt-2">
          Monitor stock levels
          and inventory health.
        </p>
      </div>

      <InventoryOverview />

      <div className="mt-8">
        <StockHealth />
      </div>
    </>
  );
};

export default Inventory;