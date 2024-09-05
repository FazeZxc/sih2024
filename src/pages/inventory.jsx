import { useState } from 'react';
import InventoryList from '../components/inventory/viewInventory';
import AddDrug from '../components/inventory/addInventory';
import UpdateDrug from '../components/inventory/updateInventory';

const InventoryManagement = () => {
  const [selectedDrugId, setSelectedDrugId] = useState(null);

  const handleUpdateClick = (drugId) => {
    setSelectedDrugId(drugId);
  };
  return (
    <div className="inventory-management">
      <h1>Inventory Management</h1>
      <InventoryList onUpdateClick={handleUpdateClick} />
      {selectedDrugId ? (
        <UpdateDrug drugId={selectedDrugId} />
      ) : (
        <AddDrug />
      )}
    </div>
  );
};

export default InventoryManagement;
