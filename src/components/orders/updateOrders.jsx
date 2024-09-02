/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirebase } from '../../context/firebase';

const UpdateOrderStatus = ({ orderId }) => {
  const firebase = useFirebase();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDoc = await getDoc(doc(firebase.firestoreDB, 'orders', orderId));
        if (orderDoc.exists()) {
          setOrderData(orderDoc.data());
          setNewStatus(orderDoc.data().status);
        }
      } catch (error) {
        console.error('Error fetching order:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [firebase.firestoreDB, orderId]);

  const handleStatusChange = async () => {
    try {
      await updateDoc(doc(firebase.firestoreDB, 'orders', orderId), {
        status: newStatus,
        updatedAt: new Date(),
      });
      alert('Order status updated successfully.');
    } catch (error) {
      console.error('Error updating order status:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-order-status">
      <h2>Update Order Status</h2>
      {orderData && (
        <div>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Current Status:</strong> {orderData.status}</p>
          <div className="form-group">
            <label htmlFor="newStatus">New Status:</label>
            <select
              id="newStatus"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <button onClick={handleStatusChange}>Update Status</button>
        </div>
      )}
    </div>
  );
};

export default UpdateOrderStatus;
