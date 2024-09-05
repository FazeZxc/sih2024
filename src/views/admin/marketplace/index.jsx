// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "../../admin/marketplace/components/Banner";
import TableTopCreators from "../../admin/marketplace/components/TableTopCreators";
import HistoryItem from "../../admin/marketplace/components/HistoryItem";
import NFT from "../../../components/card/NFT";
import Card from "../../../components/card/Card.jsx";

// Assets
import Nft1 from "../../../assets/img/nfts/Nft1.png";
import Nft2 from "../../../assets/img/nfts/Nft2.png";
import Nft3 from "../../../assets/img/nfts/Nft3.png";
import Nft4 from "../../../assets/img/nfts/Nft4.png";
import Nft5 from "../../../assets/img/nfts/Nft5.png";
import Nft6 from "../../../assets/img/nfts/Nft6.png";
import Avatar1 from "../../../assets/img/avatars/avatar1.png";
import Avatar2 from "../../../assets/img/avatars/avatar2.png";
import Avatar3 from "../../../assets/img/avatars/avatar3.png";
import Avatar4 from "../../../assets/img/avatars/avatar4.png";
import tableDataTopCreators from "../../admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "../../admin/marketplace/variables/tableColumnsTopCreators";
import ColumnTable from "../dataTables.jsx/components/ColumnsTable.jsx";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
            <ColumnTable
          columnsData={tableDataTopCreators}
          tableData={tableDataTopCreators}
        />
      </Grid>
      
      {/* Delete Product */}
    </Box>
  );
}