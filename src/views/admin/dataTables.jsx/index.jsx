// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "../dataTables.jsx/components/DevelopmentTable";
import CheckTable from "./components/checkTable";
import ColumnsTable from "../dataTables.jsx/components/ColumnsTable";
import ComplexTable from "../dataTables.jsx/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "../../admin/dataTables.jsx/variables/columnsData";
import tableDataDevelopment from "../../admin/dataTables.jsx/variables/tableDataDevelopment.json";
import tableDataCheck from "../../admin/dataTables.jsx/variables/tableDataCheck.json";
import tableDataColumns from "../../admin/dataTables.jsx/variables/tableDataColumns.json";
import tableDataComplex from "../../admin/dataTables.jsx/variables/tableDataComplex.json";
import InventoryList from "../../../components/inventory/viewInventory";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>   
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        <InventoryList />
      </SimpleGrid>
    </Box>
  );
}
