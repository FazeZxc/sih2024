import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Container,
  Heading,
  Flex,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";

// Custom theme
const theme = extendTheme({
  colors: {
    brand: {
      50: "#e5f5ff",
      100: "#b3e0ff",
      200: "#80ccff",
      300: "#4db8ff",
      400: "#1aa3ff",
      500: "#0080ff",
      600: "#0066cc",
      700: "#004d99",
      800: "#003366",
      900: "#001a33",
    },
  },
});

// SVG components
const UserIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill="#0080FF" />
    <path
      d="M20 21C22.7614 21 25 18.7614 25 16C25 13.2386 22.7614 11 20 11C17.2386 11 15 13.2386 15 16C15 18.7614 17.2386 21 20 21Z"
      fill="white"
    />
    <path
      d="M26 28C26 24.6863 23.3137 22 20 22C16.6863 22 14 24.6863 14 28"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const BotIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill="#00CC88" />
    <rect x="10" y="15" width="20" height="15" rx="2" fill="white" />
    <circle cx="15" cy="20" r="2" fill="#00CC88" />
    <circle cx="25" cy="20" r="2" fill="#00CC88" />
    <path
      d="M15 25H25"
      stroke="#00CC88"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Typing indicator component
const TypingIndicator = () => (
  <HStack spacing={2}>
    <Box
      as="span"
      fontSize="4xl"
      lineHeight={1}
      animation="blink 1.4s infinite both"
    >
      •
    </Box>
    <Box
      as="span"
      fontSize="4xl"
      lineHeight={1}
      animation="blink 1.4s 0.2s infinite both"
    >
      •
    </Box>
    <Box
      as="span"
      fontSize="4xl"
      lineHeight={1}
      animation="blink 1.4s 0.4s infinite both"
    >
      •
    </Box>
  </HStack>
);

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setIsTyping(true);
      fetchDrugInfo(input); // Fetch drug information from OpenFDA
    }
  };

  const fetchDrugInfo = async (query) => {
    try {
      const response = await axios.get(
        `https://api.fda.gov/drug/label.json?search=${query}`
      );
      const drugInfo = response.data.results[0]; // Extract relevant information
      const conversationalResponse = `
        Here's what I found about **${drugInfo.openfda.brand_name[0]}**:
        
        ${drugInfo.purpose ? "It's used to treat:" + drugInfo.purpose[0] : ""}.

        ${
          drugInfo.indications_and_usage
            ? "Indications: " + drugInfo.indications_and_usage[0]
            : ""
        }

        You should know: ${
          drugInfo.warnings ? drugInfo.warnings[0] : "No warnings available."
        }

        If you're interested, I can also provide more information on the dosage or side effects. What else would you like to know?
      `;
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: conversationalResponse, sender: "bot" },
      ]);
    } catch (error) {
      console.log(error.message);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I couldn't find any information on that medicine.",
          sender: "bot",
        },
      ]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.md" h="80vh" pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <VStack h="full" spacing={4}>
          <Flex
            w="full"
            alignItems="center"
            p={4}
            bgGradient="linear(to-r, brand.500, brand.300)"
            borderRadius="md"
            boxShadow="md"
          >
            <BotIcon />
            <Heading size="lg" ml={4} color="white">
              Ask Your Drug
            </Heading>
          </Flex>

          <Box
            flex={1}
            w="full"
            overflowY="auto"
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            p={4}
            backgroundImage="url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          >
            <VStack alignItems="stretch" spacing={4}>
              {messages.map((message, index) => (
                <Flex
                  key={index}
                  justifyContent={
                    message.sender === "user" ? "flex-end" : "flex-start"
                  }
                >
                  {message.sender === "bot" && <BotIcon />}
                  <Box
                    maxW="70%"
                    bg={message.sender === "user" ? "brand.500" : "white"}
                    color={message.sender === "user" ? "white" : "black"}
                    borderRadius="lg"
                    px={4}
                    py={2}
                    ml={message.sender === "bot" ? 2 : 0}
                    mr={message.sender === "user" ? 2 : 0}
                    boxShadow="md"
                  >
                    <Text>{message.text}</Text>
                  </Box>
                  {message.sender === "user" && <UserIcon />}
                </Flex>
              ))}
              {isTyping && (
                <Flex>
                  <BotIcon />
                  <Box
                    bg="white"
                    borderRadius="lg"
                    px={4}
                    py={2}
                    ml={2}
                    boxShadow="md"
                  >
                    <TypingIndicator />
                  </Box>
                </Flex>
              )}
              <div ref={messagesEndRef} />
            </VStack>
          </Box>

          <HStack w="full">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              size="lg"
              borderColor="brand.200"
              _hover={{ borderColor: "brand.300" }}
              _focus={{
                borderColor: "brand.400",
                boxShadow: "0 0 0 1px #0080ff",
              }}
            />
            <Button
              colorScheme="brand"
              onClick={handleSend}
              isDisabled={!input.trim()}
              size="lg"
              rightIcon={<ArrowForwardIcon />}
            >
              Send
            </Button>
          </HStack>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default Chatbot;
