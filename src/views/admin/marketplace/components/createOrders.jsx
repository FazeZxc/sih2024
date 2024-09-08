import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Textarea,
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useFirebase } from '../../../../context/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const CreateOrder = () => {
  const firebase = useFirebase();
  const toast = useToast();
  const [orderData, setOrderData] = useState({
    customerId: '',
    items: [],
    totalAmount: 0,
    status: 'Pending',
    shippingDetails: '',
  });
  const [item, setItem] = useState({ name: '', quantity: 0, price: 0 });
  const [error, setError] = useState('');

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleAddItem = () => {
    setOrderData({
      ...orderData,
      items: [...orderData.items, item],
      totalAmount: orderData.totalAmount + item.quantity * item.price,
    });
    setItem({ name: '', quantity: 0, price: 0 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (orderData.items.length === 0) {
      setError('You must add at least one item to the order.');
      return;
    }

    try {
      await addDoc(collection(firebase.firestoreDB, 'orders'), {
        ...orderData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({
        title: 'Order Created',
        description: 'Order has been created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setOrderData({
        customerId: '',
        items: [],
        totalAmount: 0,
        status: 'Pending',
        shippingDetails: '',
      });
    } catch (error) {
      setError('Error creating order: ' + error.message);
    }
  };

  return (
    <Box p={8} maxW="600px" mx="auto">
      <VStack spacing={6} align="start">
        <Text fontSize="2xl" fontWeight="bold">Create Order</Text>
        {error && (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        )}
        <form onSubmit={handleFormSubmit}>
          <VStack spacing={4} align="start">
            <FormControl id="customerId" isRequired>
              <FormLabel>Customer ID</FormLabel>
              <Input
                type="text"
                name="customerId"
                value={orderData.customerId}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="shippingDetails" isRequired>
              <FormLabel>Shipping Details</FormLabel>
              <Textarea
                name="shippingDetails"
                value={orderData.shippingDetails}
                onChange={handleInputChange}
              />
            </FormControl>
            <Box width="100%">
              <Text fontSize="lg" fontWeight="semibold">Add Item</Text>
              <HStack spacing={4}>
                <FormControl id="itemName">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={handleItemChange}
                  />
                </FormControl>
                <FormControl id="itemQuantity">
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={handleItemChange}
                  />
                </FormControl>
                <FormControl id="itemPrice">
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={handleItemChange}
                  />
                </FormControl>
                <Button colorScheme="blue" onClick={handleAddItem}>
                  Add Item
                </Button>
              </HStack>
            </Box>
            <Box width="100%">
              <Text fontSize="lg" fontWeight="semibold">Order Items</Text>
              <VStack spacing={2} align="start">
                {orderData.items.length === 0 ? (
                  <Text>No items added yet.</Text>
                ) : (
                  orderData.items.map((item, index) => (
                    <Text key={index}>
                      {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
                    </Text>
                  ))
                )}
              </VStack>
            </Box>
            <FormControl id="totalAmount">
              <FormLabel>Total Amount</FormLabel>
              <Input
                type="number"
                name="totalAmount"
                value={orderData.totalAmount}
                readOnly
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Create Order
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default CreateOrder;
