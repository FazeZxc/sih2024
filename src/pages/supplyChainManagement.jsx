import { useState } from "react";
import SupplierManagement from "../components/supplyChain/supplierManagement";
import ShipmentTracking from "../components/supplyChain/shipmentTracking";
import StockMonitoring from "../components/supplyChain/stockLevelMonitoring";

const SupplyChainManagement = () => {
  const [selectedView, setSelectedView] = useState("suppliers");

  return (
    <div className="supply-chain-management">
      <h1>Supply Chain Management</h1>
      <div>
        <button onClick={() => setSelectedView("suppliers")}>
          Manage Suppliers
        </button>
        <button onClick={() => setSelectedView("shipments")}>
          Track Shipments
        </button>
        <button onClick={() => setSelectedView("stocks")}>
          Monitor Stocks
        </button>
      </div>
      {selectedView === "suppliers" && <SupplierManagement />}
      {selectedView === "shipments" && <ShipmentTracking />}
      {selectedView === "stocks" && <StockMonitoring />}
    </div>
  );
};

export default SupplyChainManagement;
