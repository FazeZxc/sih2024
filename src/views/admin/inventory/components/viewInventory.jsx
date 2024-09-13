import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Skeleton,
  HStack,
} from "@chakra-ui/react";
import { useFirebase } from "../../../../context/firebase";
import AddDrug from "./addInventory";

const InventoryList = ({ onUpdateClick }) => {
  const firebase = useFirebase();
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    isOpen: isCreateDrugOpen,
    onOpen: onCreateDrugOpen,
    onClose: onCreateDrugClose,
  } = useDisclosure();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firebase.firestoreDB, "drugs"),
      (querySnapshot) => {
        const drugList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDrugs(drugList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching inventory:", error.message);
        setLoading(false);
      }
    );

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, [firebase.firestoreDB]);

  const deleteDrug = async (id) => {
    try {
      await deleteDoc(doc(firebase.firestoreDB, "drugs", id));
    } catch (error) {
      console.error("Error deleting drug:", error.message);
    }
  };

  if (loading) {
    return <Skeleton height="100vh" />;
  }

  return (
    <Box overflowX="auto" fontFamily="monospace">
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={onCreateDrugOpen}
        mb={4}
      >
        Create List
      </Button>
      {drugs.length === 0 ? (
        <Text>No drugs in inventory.</Text>
      ) : (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Quantity</Th>
              <Th>Batch ID</Th>
              <Th>Expiration Date</Th>
              <Th>Supplier</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {drugs.map((drug) => (
              <Tr key={drug.id}>
                <Td>{drug.name}</Td>
                <Td>{drug.type}</Td>
                <Td>{drug.quantity}</Td>
                <Td>{drug.batchId}</Td>
                <Td>{drug.expirationDate}</Td>
                <Td>{drug.supplier}</Td>
                <Td>
                  <HStack>
                    <Button
                      colorScheme="blue"
                      onClick={() => onUpdateClick(drug.id)}
                      mr={2}
                      variant="brand"
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => deleteDrug(drug.id)}
                      variant="solid"
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {isCreateDrugOpen && (
        <CreateDrugModal
          isOpen={isCreateDrugOpen}
          onClose={onCreateDrugClose}
        />
      )}
    </Box>
  );
};

const CreateDrugModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="2xl">
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <AddDrug />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default InventoryList;
