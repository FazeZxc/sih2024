import { useState } from 'react';
import CreateOrder from '../components/orders/createOrders';
import OrderList from '../components/orders/viewOrders';
import UpdateOrderStatus from '../components/orders/updateOrders';

const OrderManagement = () => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleUpdateClick = (orderId) => {
    setSelectedOrderId(orderId);
  };

  return (
    <div className="order-management">
      <h1>Order Management</h1>
      <CreateOrder />
      <OrderList onUpdateClick={handleUpdateClick} />
      {selectedOrderId && <UpdateOrderStatus orderId={selectedOrderId} />}
    </div>
  );
};

export default OrderManagement;
