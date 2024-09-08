import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import Dashboard from "./views/admin/default";
import Marketplace from "./views/admin/marketplace";
import InventoryManagement from "./views/admin/inventory";
import Chatbot from "./views/admin/chatbot/index.jsx";
import { ChatIcon, RepeatIcon } from "@chakra-ui/icons";
import UserProfile from "./views/admin/profile";
import SupplyChainManagement from "./views/admin/Shipments/index.jsx";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <Dashboard />,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "/orders",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <Marketplace />,
    secondary: true,
  },
  {
    name: "Inventory",
    layout: "/admin",
    icon: <Icon as={RepeatIcon} width="20px" height="20px" color="inherit" />,
    path: "/inventory",
    component: <InventoryManagement />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <UserProfile />,
  },
  {
    name: "Supply Chain",
    layout: "/admin",
    path: "/supply-chain",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: <SupplyChainManagement />,
  },
  {
    name: "ChatBot",
    layout: "/admin",
    path: "/chatbot",
    icon: <Icon as={ChatIcon} width="20px" height="14px" color="inherit" />,
    component: <Chatbot />,
  },
];

export default routes;
