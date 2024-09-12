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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

const SupplierManagement = () => {
  const firebase = useFirebase();
  const toast = useToast();
  const [suppliers, setSuppliers] = useState([]);

  const {
    isOpen: isCreateSupplierOpen,
    onOpen: onCreateSupplierOpen, // Renamed correctly
    onClose: onCreateSupplierClose,
  } = useDisclosure();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firebase.firestoreDB, "suppliers"),
      (querySnapshot) => {
        const supplierList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(supplierList); // Log for debugging
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

    return () => unsubscribe();
  }, [firebase.firestoreDB, toast]);

  const handleDeleteSupplier = async (supplierId) => {
    try {
      console.log("Deleting supplier with ID:", supplierId); // Log for debugging
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
    <Box p={8} fontFamily="monospace">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Manage Suppliers
      </Text>

      <Box mb={6}>
        <Button
          colorScheme="teal"
          variant="outline" 
          onClick={onCreateSupplierOpen}
          mb={4}
        >
          Create Supplier
        </Button>
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

      <CreateSupplierModal
        isOpen={isCreateSupplierOpen}
        onClose={onCreateSupplierClose}
      />
    </Box>
  );
};

const CreateSupplierModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="2xl">
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <CreateSupplier onClose={onClose} />
      </ModalBody>
    </ModalContent>
  </Modal>
);

const CreateSupplier = ({ onClose }) => {
  const [supplierData, setSupplierData] = useState({
    name: "",
    contactInfo: "",
    address: "",
    products: [],
  });
  const toast = useToast();
  const firebase = useFirebase();
  const [newProduct, setNewProduct] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    if (newProduct.trim() === "") return; // Prevent empty product addition
    setSupplierData({
      ...supplierData,
      products: [...supplierData.products, newProduct],
    });
    setNewProduct("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Adding supplier data:", supplierData); // Log for debugging
      await addDoc(collection(firebase.firestoreDB, "suppliers"), supplierData);
      toast({
        title: "Supplier added.",
        description: "Supplier has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSupplierData({ name: "", contactInfo: "", address: "", products: [] });
      onClose();
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

  return (
    <Box fontFamily="monospace">
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
                <Button
                  m={5}
                  onClick={handleAddProduct}
                  colorScheme="blue"
                  maxWidth={200}
                  variant="action"
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

          <Button type="submit" colorScheme="teal" >
            Add Supplier
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SupplierManagement;
