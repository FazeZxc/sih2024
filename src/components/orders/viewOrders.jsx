import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useFirebase } from '../../context/firebase';

const OrderList = () => {
  const firebase = useFirebase()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(firebase.firestoreDB, 'orders'));
        const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [firebase.firestoreDB]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-list">
      <h2>Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <div>
              <strong>Order ID:</strong> {order.id}
            </div>
            <div>
              <strong>Customer ID:</strong> {order.customerId}
            </div>
            <div>
              <strong>Status:</strong> {order.status}
            </div>
            <div>
              <strong>Total Amount:</strong> ${order.totalAmount}
            </div>
            <div>
              <strong>Items:</strong>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Shipping Details:</strong> {order.shippingDetails}
            </div>
            <div>
              <strong>Created At:</strong> {order.createdAt?.toDate().toString()}
            </div>
            <div>
              <strong>Updated At:</strong> {order.updatedAt?.toDate().toString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
