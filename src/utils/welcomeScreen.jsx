import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { MdOutlineLocalPharmacy, MdOutlineDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const WelcomeScreen = () => {
  const navigate = useNavigate();
  function clickHandler() {
    navigate("/sign-up");
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.50"
    >
      <VStack spacing={8} textAlign="center">
        <Heading fontSize="4xl" color="teal.500">
          Welcome to Drug Inventory Management System
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="md">
          Streamline your drug distribution with efficient inventory, order, and
          supplier management in real time.
        </Text>

        <HStack spacing={10}>
          <VStack>
            <Icon as={MdOutlineLocalPharmacy} w={16} h={16} color="teal.400" />
            <Text>Manage Inventory</Text>
          </VStack>
          <VStack>
            <Icon as={MdOutlineDashboard} w={16} h={16} color="teal.400" />
            <Text>View Dashboard</Text>
          </VStack>
          <VStack>
            <Icon as={FaUsers} w={16} h={16} color="teal.400" />
            <Text>Manage Users</Text>
          </VStack>
        </HStack>

        <Button
          colorScheme="blue"
          variant="setup"
          onClick={clickHandler}
          mb={4}
        >
          Start Using
        </Button>
      </VStack>
    </Box>
  );
};
