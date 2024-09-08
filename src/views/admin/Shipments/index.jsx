import { useState } from "react";
import { Box, Button, VStack, Heading } from "@chakra-ui/react";
import SupplierManagement from "./components/supplierManagement";
import ShipmentTracking from "./components/shipmentTracking";
import StockMonitoring from "./components/stockLevelMonitoring";

const SupplyChainManagement = () => {
  const [selectedView, setSelectedView] = useState("suppliers");

  return (
    <Box p={8} pt={{ base: "130px", md: "80px", xl: "80px" }} >
      <Heading mb={6}>Supply Chain Management</Heading>
      <VStack spacing={4} mb={6}>
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
      </VStack>
      <Box>
        {selectedView === "suppliers" && <SupplierManagement />}
        {selectedView === "shipments" && <ShipmentTracking />}
        {selectedView === "stocks" && <StockMonitoring />}
      </Box>
    </Box>
  );
};

export default SupplyChainManagement;
