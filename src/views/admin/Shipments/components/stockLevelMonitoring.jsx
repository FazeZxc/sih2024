import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc, // Import deleteDoc for deleting documents
} from "firebase/firestore";
import { useFirebase } from "../../../../context/firebase";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  IconButton,
  Skeleton, // Import IconButton
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons"; // Import CloseIcon for delete button

const StockMonitoring = () => {
  const firebase = useFirebase();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newStock, setNewStock] = useState({
    id: "",
    quantity: 0,
    reorderThreshold: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchStockLevels = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firebase.firestoreDB, "stockLevels")
        );
        const stockList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStocks(stockList);
      } catch (error) {
        console.error("Error fetching stock levels:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockLevels();
  }, [firebase.firestoreDB]);

  const handleReorderThresholdChange = async (productId, newThreshold) => {
    try {
      const stockRef = doc(firebase.firestoreDB, "stockLevels", productId);
      await updateDoc(stockRef, { reorderThreshold: newThreshold });
      setStocks(
        stocks.map((stock) =>
          stock.id === productId
            ? { ...stock, reorderThreshold: newThreshold }
            : stock
        )
      );
    } catch (error) {
      console.error("Error updating reorder threshold:", error.message);
    }
  };

  const handleAddStock = async () => {
    try {
      await addDoc(collection(firebase.firestoreDB, "stockLevels"), newStock);
      setStocks([...stocks, newStock]);
      setNewStock({ id: "", quantity: 0, reorderThreshold: 0 });
      onClose();
    } catch (error) {
      console.error("Error adding new stock:", error.message);
    }
  };

  const handleDeleteStock = async (productId) => {
    try {
      const stockRef = doc(firebase.firestoreDB, "stockLevels", productId);
      await deleteDoc(stockRef);
      setStocks(stocks.filter((stock) => stock.id !== productId));
    } catch (error) {
      console.error("Error deleting stock:", error.message);
    }
  };

  if (loading) {
    return <Skeleton height="100vh" />;
  }

  return (
    <Box p={8} fontFamily="monospace">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Stock Monitoring
      </Text>
      <Button onClick={onOpen} colorScheme="teal" mb={4}>
        Add New Stock
      </Button>
      <VStack spacing={4} align="start">
        {stocks.map((stock) => (
          <Box
            key={stock.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            bg="white"
            width="100%"
            position="relative" 
          >
            <IconButton
              icon={<CloseIcon />}
              aria-label="Delete stock"
              size="sm"
              position="absolute"
              top={2}
              right={2}
              onClick={() => handleDeleteStock(stock.id)}
              maxW={12}
            />
            <Text fontSize="lg" fontWeight="bold">
              Product ID: {stock.id}
            </Text>
            <Divider my={2} />
            <Text>
              <strong>Quantity:</strong> {stock.quantity}
            </Text>
            <Text>
              <strong>Reorder Threshold:</strong>
            </Text>
            <Input
              type="number"
              value={stock.reorderThreshold}
              onChange={(e) =>
                handleReorderThresholdChange(stock.id, e.target.value)
              }
              size="sm"
              width="auto"
            />
          </Box>
        ))}
      </VStack>

      {/* Add Stock Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Stock</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              <label>Product ID</label>
              <Input
                placeholder="Product ID"
                value={newStock.id}
                onChange={(e) =>
                  setNewStock({ ...newStock, id: e.target.value })
                }
              />
              <label>Quantity</label>
              <Input
                type="number"
                placeholder="Quantity"
                value={newStock.quantity}
                onChange={(e) =>
                  setNewStock({
                    ...newStock,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
              <label>Reorder Threshold</label>
              <Input
                type="number"
                placeholder="Reorder Threshold"
                value={newStock.reorderThreshold}
                onChange={(e) =>
                  setNewStock({
                    ...newStock,
                    reorderThreshold: parseInt(e.target.value),
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddStock}>
              Add Stock
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StockMonitoring;
