import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useFirebase } from '../../../../context/firebase';

const UpdateDrug = ({ drugId }) => {
  const firebase = useFirebase();
  const [drugData, setDrugData] = useState({
    name: '',
    type: '',
    quantity: '',
    batchId: '',
    expirationDate: '',
    supplier: '',
  });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const drugDoc = await getDoc(doc(firebase.firestoreDB, 'drugs', drugId));
        if (drugDoc.exists()) {
          setDrugData(drugDoc.data());
        }
      } catch (error) {
        toast({
          title: 'Error fetching drug.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDrug();
  }, [firebase.firestoreDB, drugId, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDrugData({
      ...drugData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(firebase.firestoreDB, 'drugs', drugId), drugData, { merge: true });
      toast({
        title: 'Drug updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating drug.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading as="h2" size="lg" mb={4}>
        Update Drug
      </Heading>
      <form onSubmit={handleFormSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={drugData.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="type">
            <FormLabel>Type</FormLabel>
            <Input
              type="text"
              name="type"
              value={drugData.type}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="quantity" isRequired>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              name="quantity"
              value={drugData.quantity}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="batchId">
            <FormLabel>Batch ID</FormLabel>
            <Input
              type="text"
              name="batchId"
              value={drugData.batchId}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="expirationDate" isRequired>
            <FormLabel>Expiration Date</FormLabel>
            <Input
              type="date"
              name="expirationDate"
              value={drugData.expirationDate}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="supplier">
            <FormLabel>Supplier</FormLabel>
            <Input
              type="text"
              name="supplier"
              value={drugData.supplier}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg">
            Update Drug
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UpdateDrug;
