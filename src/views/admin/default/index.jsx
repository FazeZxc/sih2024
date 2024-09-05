// Chakra imports
import {
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    Select,
    SimpleGrid,
    useColorModeValue,
  } from "@chakra-ui/react";
  // Assets
  import Usa from "../../../assets/img/dashboards/usa.png";
  // Custom components
  import MiniCalendar from "../../../components/calendar/MiniCalendar";
  import MiniStatistics from "../../../components/card/MiniStatistics";
  import IconBox from "../../../components/icons/IconBox";
  import {
    MdAddTask,
    MdAttachMoney,
    MdBarChart,
    MdFileCopy,
  } from "react-icons/md";
  import CheckTable from "../../admin/default/components/CheckTable";
  import ComplexTable from "../../admin/default/components/ComplexTable";
  import DailyTraffic from "../../admin/default/components/DailyTraffic";
  import PieCard from "../../admin/default/components/PieCard";
  import Tasks from "../../admin/default/components/Tasks";
  import TotalSpent from "../../admin/default/components/TotalSpent";
  import WeeklyRevenue from "../../admin/default/components/WeeklyRevenue";
  import {
    columnsDataCheck,
    columnsDataComplex,
  } from "../../admin/default/variables/columnsData";
  import tableDataCheck from "../../admin/default/variables/tableDataCheck.json";
  import tableDataComplex from "../../admin/default/variables/tableDataComplex.json";
  
  export default function UserReports() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
          gap='20px'
          mb='20px'>
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
                }
              />
            }
            name='Total Inventory'
            value='12500'
          />
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                }
              />
            }
            name='Revenue'
            value='$12313'
          />
          <MiniStatistics growth='+2' name='Pending Orders' value='23' />
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
                }
              />
            }
            name='Total Users'
            value='2935'
          />
        </SimpleGrid>
      </Box>
    );
  }
  