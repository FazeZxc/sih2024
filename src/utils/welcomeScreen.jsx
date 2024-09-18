import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Image,
} from "@chakra-ui/react";
import { MdOutlineLocalPharmacy, MdOutlineDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import welcomeScreenImg from "./../assets/img/welcomeScreen.png";

export const WelcomeScreen = () => {
  const navigate = useNavigate();
  function clickHandler() {
    navigate("/sign-up");
  }
  return (
    <Box display="flex" height="100vh" bg="black" fontFamily="monospace">
      <HStack width="100vw" display="flex" justifyContent="space-around">
        <Box
          width="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <VStack spacing={8} textAlign="center" paddingLeft={100}>
            <Heading
              fontSize="6xl"
              color="White"
              fontFamily="monospace"
              fontWeight="bold"
            >
              Drug Inventory Management System
            </Heading>
            <Text fontSize="lg" color="gold" maxW="md" textAlign="center">
              Streamline your drug distribution with efficient inventory, order,
              and supplier management in real time.
            </Text>

            <HStack spacing={10} color="white">
              <VStack>
                <Icon
                  as={MdOutlineLocalPharmacy}
                  w={16}
                  h={16}
                  color="teal.400"
                />
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

            <Button variant="solid" onClick={clickHandler} mb={4}>
              Start Using
            </Button>
          </VStack>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="90vw"
          height="100vh"
          backgroundSize="contain"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          borderRadius={20}
          margin={100}
          backgroundColor="green"
          backgroundImage="radial-gradient(circle at center, #0E5239 , black 75%)"
        >
          <Image
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            src={welcomeScreenImg}
            className="welcomeScreenImg"
            draggable={false}
          ></Image>
        </Box>
      </HStack>
    </Box>
  );
};
