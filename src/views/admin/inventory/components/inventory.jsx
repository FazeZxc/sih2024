import { useState } from "react";
import InventoryList from "./viewInventory";
import AddDrug from "./addInventory";
import UpdateDrug from "./updateInventory";
import {
  Box,
  Heading,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
} from "@chakra-ui/react";

const InventoryManagement = () => {
  const [selectedDrugId, setSelectedDrugId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateClick = (drugId) => {
    setSelectedDrugId(drugId);
    onOpen(); // Opens the modal when a drug is selected for update
  };

  return (
    <Box p={8}>
      <HStack spacing={8}>
        <Box flex="1" p={4} bg="gray.50" borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="lg" mb={4}>
            Add New Drug
          </Heading>
          <AddDrug />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Drug</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <UpdateDrug drugId={selectedDrugId} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Box minBlockSize={720} minWidth="auto" flex="2" p={4} bg="gray.50" borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="lg" mb={4}>
            Inventory List
          </Heading>
          <InventoryList onUpdateClick={handleUpdateClick} />
        </Box>
      </HStack>
    </Box>
  );
};

export default InventoryManagement;
