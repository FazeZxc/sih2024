import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useFirebase } from '../../../../context/firebase';
import {
  Box,
  Button,
  Text,
  VStack,
  Divider,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react';

const ShipmentTracking = () => {
  const firebase = useFirebase();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const querySnapshot = await getDocs(collection(firebase.firestoreDB, 'shipments'));
        const shipmentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setShipments(shipmentList);
      } catch (error) {
        console.error('Error fetching shipments:', error.message);
      } finally {
        setLoading(false);
      }
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

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Shipment Tracking</Text>
      <VStack spacing={4} align="start">
        {shipments.map(shipment => (
          <Box
            key={shipment.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            bg="white"
            width="100%"
          >
            <Text fontSize="lg" fontWeight="bold">Shipment ID: {shipment.id}</Text>
            <Divider my={2} />
            <Text><strong>Supplier ID:</strong> {shipment.supplierId}</Text>
            <Text><strong>Status:</strong> {shipment.status}</Text>
            <Text><strong>Estimated Delivery:</strong> {new Date(shipment.estimatedDelivery.seconds * 1000).toLocaleDateString()}</Text>
            <Text><strong>Items:</strong></Text>
            <List spacing={2}>
              {shipment.items.map((item, index) => (
                <ListItem key={index}>
                  {item.name} - {item.quantity} units
                </ListItem>
              ))}
            </List>
            <Box mt={4}>
              <Button
                colorScheme="teal"
                mr={4}
                onClick={() => handleStatusChange(shipment.id, 'In Transit')}
              >
                Mark as In Transit
              </Button>
              <Button
                colorScheme="teal"
                onClick={() => handleStatusChange(shipment.id, 'Delivered')}
              >
                Mark as Delivered
              </Button>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ShipmentTracking;
