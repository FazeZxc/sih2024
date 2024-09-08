import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useFirebase } from "../../../../context/firebase";

const AddDrug = () => {
  const firebase = useFirebase();
  const [drugData, setDrugData] = useState({
    name: "",
    type: "",
    quantity: "",
    batchId: "",
    expirationDate: "",
    supplier: "",
  });
  const toast = useToast();

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
      await addDoc(collection(firebase.firestoreDB, "drugs"), drugData);
      toast({
        title: "Drug added.",
        description: "Drug has been added to inventory.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setDrugData({
        name: "",
        type: "",
        quantity: "",
        batchId: "",
        expirationDate: "",
        supplier: "",
      });
    } catch (error) {
      toast({
        title: "Error adding drug.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} minWidth={500}>
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
            Add Drug
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddDrug;
