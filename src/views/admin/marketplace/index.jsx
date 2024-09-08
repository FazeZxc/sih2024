import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Text,
  Button,
  VStack,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useFirebase } from "../../../context/firebase";
import CreateOrder from "./components/createOrders";
import OrderList from "./components/viewOrders";

const MarketPlace = () => {
  const firebase = useFirebase();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firebase.firestoreDB, "orders")
        );
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [firebase.firestoreDB]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    onOpen();
  };

  const handleStatusChange = async () => {
    try {
      await updateDoc(doc(firebase.firestoreDB, "orders", selectedOrder.id), {
        status: newStatus,
        updatedAt: new Date(),
      });
      alert("Order status updated successfully.");
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      onClose();
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Order List
          </Text>
          <HStack>
            <VStack spacing={4} align="start" mt={4}>
              {orders.length > 0 ? (
                <OrderList />
              ) : (
                <Text>No orders available.</Text>
              )}
            </VStack>
          </HStack>
        </Box>

        {selectedOrder && (
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Order Details
            </Text>
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              bg="white"
              mt={4}
            >
              <Text>
                <strong>Order ID:</strong> {selectedOrder.id}
              </Text>
              <Text>
                <strong>Customer ID:</strong> {selectedOrder.customerId}
              </Text>
              <Text>
                <strong>Status:</strong> {selectedOrder.status}
              </Text>
              <Text>
                <strong>Total Amount:</strong> ${selectedOrder.totalAmount}
              </Text>
              <Text>
                <strong>Shipping Details:</strong>{" "}
                {selectedOrder.shippingDetails}
              </Text>
              <Text>
                <strong>Created At:</strong>{" "}
                {selectedOrder.createdAt?.toDate().toString()}
              </Text>
              <Text>
                <strong>Updated At:</strong>{" "}
                {selectedOrder.updatedAt?.toDate().toString()}
              </Text>
              <Divider my={4} />
              <Button colorScheme="blue" onClick={onOpen}>
                Update Status
              </Button>
            </Box>
          </Box>
        )}
      </Grid>

      {selectedOrder && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Order Status</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="md">
                <strong>Order ID:</strong> {selectedOrder.id}
              </Text>
              <Text fontSize="md">
                <strong>Current Status:</strong> {selectedOrder.status}
              </Text>
              <Divider my={2} />
              <Text fontSize="md">New Status:</Text>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleStatusChange}>
                Update Status
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default MarketPlace;
