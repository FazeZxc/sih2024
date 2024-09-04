import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useFirebase } from '../../context/firebase';

const ShipmentTracking = () => {
  const firebase = useFirebase();
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      const querySnapshot = await getDocs(collection(firebase.firestoreDB, 'shipments'));
      const shipmentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShipments(shipmentList);
    };

    fetchShipments();
  }, [firebase.firestoreDB]);

  const handleStatusChange = async (shipmentId, newStatus) => {
    try {
      const shipmentRef = doc(firebase.firestoreDB, 'shipments', shipmentId);
      await updateDoc(shipmentRef, { status: newStatus, updatedAt: new Date() });
      setShipments(shipments.map(shipment =>
        shipment.id === shipmentId ? { ...shipment, status: newStatus } : shipment
      ));
    } catch (error) {
      console.error('Error updating shipment status:', error.message);
    }
  };

  return (
    <div className="shipment-tracking">
      <h2>Shipment Tracking</h2>
      <ul>
        {shipments.map((shipment) => (
          <li key={shipment.id}>
            <div>
              <strong>Shipment ID:</strong> {shipment.id}
            </div>
            <div>
              <strong>Supplier ID:</strong> {shipment.supplierId}
            </div>
            <div>
              <strong>Status:</strong> {shipment.status}
            </div>
            <div>
              <strong>Estimated Delivery:</strong> {new Date(shipment.estimatedDelivery.seconds * 1000).toDateString()}
            </div>
            <div>
              <strong>Items:</strong>
              <ul>
                {shipment.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} units
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button onClick={() => handleStatusChange(shipment.id, 'In Transit')}>Mark as In Transit</button>
              <button onClick={() => handleStatusChange(shipment.id, 'Delivered')}>Mark as Delivered</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentTracking;
