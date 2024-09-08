import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Button,
  Text,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useFirebase } from '../../../../context/firebase';

const UpdateOrderStatus = ({ orderId }) => {
  const firebase = useFirebase();
  const toast = useToast();
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
      toast({
        title: 'Order Status Updated',
        description: 'Order status has been updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error Updating Status',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <Box p={8} maxW="400px" mx="auto" borderWidth="1px" borderRadius="md" boxShadow="md">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Update Order Status</Text>
      {orderData && (
        <Box>
          <Text fontSize="lg" mb={2}><strong>Order ID:</strong> {orderId}</Text>
          <Text fontSize="lg" mb={4}><strong>Current Status:</strong> {orderData.status}</Text>
          <FormControl mb={4}>
            <FormLabel htmlFor="newStatus">New Status</FormLabel>
            <Select
              id="newStatus"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </FormControl>
          <Button colorScheme="blue" onClick={handleStatusChange}>
            Update Status
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UpdateOrderStatus;
