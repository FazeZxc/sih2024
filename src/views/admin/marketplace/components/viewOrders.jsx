/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import {
  Box,
  Button,
  UnorderedList,
  ListItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Skeleton,
} from "@chakra-ui/react";
import { useFirebase } from "../../../../context/firebase";
import CreateOrder from "./createOrders";
import UpdateOrderStatus from "./updateOrders";

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date.toDate()).toLocaleString(); // Format to date and time
};

const OrderList = () => {
  const firebase = useFirebase();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { isOpen: isCreateOrderOpen, onOpen: onCreateOrderOpen, onClose: onCreateOrderClose } = useDisclosure();
  const { isOpen: isUpdateOrderOpen, onOpen: onUpdateOrderOpen, onClose: onUpdateOrderClose } = useDisclosure();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firebase.firestoreDB, "orders"),
      (querySnapshot) => {
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching orders:", error.message);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firebase.firestoreDB]);

  const handleUpdateClick = (orderId) => {
    setSelectedOrderId(orderId);
    onUpdateOrderOpen();
  };

  if (loading) {
    return <Skeleton height="100vh"/>;
  }

  return (
    <Box p={4} backgroundColor="white" fontFamily="monospace">
      <Button colorScheme="blue" variant="setup" onClick={onCreateOrderOpen} mb={4}>
        Create Order
      </Button>

      <TableContainer >
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Customer ID</Th>
              <Th>Status</Th>
              <Th>Total Amount</Th>
              <Th>Items</Th>
              <Th>Shipping Details</Th>
              <Th>Created At</Th>
              <Th>Updated At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.customerId}</Td>
                <Td>{order.status}</Td>
                <Td>${order.totalAmount}</Td>
                <Td>
                  <UnorderedList>
                    {order.items.map((item, index) => (
                      <ListItem key={index}>
                        {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Td>
                <Td>{order.shippingDetails}</Td>
                <Td>{formatDate(order.createdAt)}</Td>
                <Td>{formatDate(order.updatedAt)}</Td>
                <Td>
                  <Button colorScheme="yellow" variant="action" onClick={() => handleUpdateClick(order.id)}>
                    Update
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Create Order Modal */}
      {isCreateOrderOpen && (
        <CreateOrderModal isOpen={isCreateOrderOpen} onClose={onCreateOrderClose} />
      )}

      {/* Update Order Status Modal */}
      {isUpdateOrderOpen && (
        <UpdateOrderStatusModal
          isOpen={isUpdateOrderOpen}
          onClose={onUpdateOrderClose}
          orderId={selectedOrderId}
        />
      )}
    </Box>
  );
};

// Create Order Modal Component
const CreateOrderModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Create Order</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CreateOrder />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

// Update Order Status Modal Component
const UpdateOrderStatusModal = ({ isOpen, onClose, orderId }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Update Order Status</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <UpdateOrderStatus orderId={orderId} />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default OrderList;
