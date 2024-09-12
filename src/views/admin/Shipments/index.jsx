import { useState } from "react";
import { Box, Button, VStack, Heading, HStack } from "@chakra-ui/react";
import SupplierManagement from "./components/supplierManagement";
import StockMonitoring from "./components/stockLevelMonitoring";

const SupplyChainManagement = () => {
  const [selectedView, setSelectedView] = useState("suppliers");

  return (
    <Box p={8} fontFamily="monospace">
      <Heading fontFamily="monospace" mb={6}>Supply Chain Management</Heading>
      <HStack spacing={4} mb={6}>
        <Button
          colorScheme="teal"
          onClick={() => setSelectedView("suppliers")}
          variant={selectedView === "suppliers" ? "solid" : "outline"}
        >
          Manage Suppliers
        </Button>
        <Button
          colorScheme="teal"
          onClick={() => setSelectedView("stocks")}
          variant={selectedView === "stocks" ? "solid" : "outline"}
        >
          Monitor Stocks
        </Button>
      </HStack>
      <Box>
        {selectedView === "suppliers" && <SupplierManagement />}
        {selectedView === "stocks" && <StockMonitoring />}
      </Box>
    </Box>
  );
};

export default SupplyChainManagement;
