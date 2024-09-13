import { useState } from "react";
import InventoryList from "./viewInventory";
import UpdateDrug from "./updateInventory";
import {
  Box,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
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
    <Box fontFamily="monospace">
      <HStack spacing={8}>
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <UpdateDrug drugId={selectedDrugId} />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box
          minBlockSize={720}
          minWidth="auto"
          flex="2"
          p={4}
          bg="gray.50"
          boxShadow="md"
          borderRadius={20}
        >
          <Heading as="h2" size="lg" mb={4} fontFamily="monospace">
            Inventory List
          </Heading>
          <InventoryList onUpdateClick={handleUpdateClick} />
        </Box>
      </HStack>
    </Box>
  );
};

export default InventoryManagement;
