import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useFirebase } from "../../../../context/firebase";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Stack,
  Text,
  VStack,
  Divider,
  useToast,
} from "@chakra-ui/react";

const SupplierManagement = () => {
  const firebase = useFirebase();
  const toast = useToast();
  const [suppliers, setSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState({
    name: "",
    contactInfo: "",
    address: "",
    products: [],
  });
  const [newProduct, setNewProduct] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firebase.firestoreDB, "suppliers"),
      (querySnapshot) => {
        const supplierList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSuppliers(supplierList);
      },
      (error) => {
        console.error("Error fetching suppliers:", error.message);
        toast({
          title: "Error.",
          description: "There was an error fetching the supplier list.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firebase.firestoreDB, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    setSupplierData({
      ...supplierData,
      products: [...supplierData.products, newProduct],
    });
    setNewProduct("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firebase.firestoreDB, "suppliers"), supplierData);
      toast({
        title: "Supplier added.",
        description: "Supplier has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSupplierData({ name: "", contactInfo: "", address: "", products: [] });
    } catch (error) {
      console.error("Error adding supplier:", error.message);
      toast({
        title: "Error.",
        description: "There was an error adding the supplier.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      await deleteDoc(doc(firebase.firestoreDB, "suppliers", supplierId));
      toast({
        title: "Supplier deleted.",
        description: "Supplier has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting supplier:", error.message);
      toast({
        title: "Error.",
        description: "There was an error deleting the supplier.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Manage Suppliers
      </Text>
      <Box mb={6}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={supplierData.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="contactInfo" isRequired>
              <FormLabel>Contact Info</FormLabel>
              <Input
                type="text"
                name="contactInfo"
                value={supplierData.contactInfo}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                value={supplierData.address}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Products</FormLabel>
              <Stack spacing={2}>
                <Box>
                  <Input
                    type="text"
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                  />
                  <Button m={5} 
                    onClick={handleAddProduct}
                    colorScheme="blue"
                    maxWidth={100}
                  >
                    Add Product
                  </Button>
                </Box>
                <List spacing={2}>
                  {supplierData.products.map((product, index) => (
                    <ListItem key={index}>{product}</ListItem>
                  ))}
                </List>
              </Stack>
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Add Supplier
            </Button>
          </Stack>
        </form>
      </Box>

      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Supplier List
      </Text>
      <VStack spacing={2} align="start">
        {suppliers.map((supplier) => (
          <Box
            key={supplier.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            bg="white"
            width="100%"
          >
            <Text fontSize="lg" fontWeight="bold">
              {supplier.name}
            </Text>
            <Divider my={2} />
            <Text>
              <strong>Contact Info:</strong> {supplier.contactInfo}
            </Text>
            <Text>
              <strong>Address:</strong> {supplier.address}
            </Text>
            <Text>
              <strong>Products:</strong>
            </Text>
            <List spacing={2}>
              {supplier.products.map((product, index) => (
                <ListItem key={index}>{product}</ListItem>
              ))}
            </List>
            <Button
              colorScheme="red"
              mt={4}
              onClick={() => handleDeleteSupplier(supplier.id)}
            >
              Delete Supplier
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default SupplierManagement;
