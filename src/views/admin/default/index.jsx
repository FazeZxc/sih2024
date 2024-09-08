import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import MiniStatistics from "../../../components/card/MiniStatistics";
import { Box, SimpleGrid, Icon } from "@chakra-ui/react";
import { MdAttachMoney, MdBarChart, MdFileCopy } from "react-icons/md";
import { useFirebase } from "../../../context/firebase";

export default function Dashboard() {
  const firebase = useFirebase();
  const [statistics, setStatistics] = useState({
    totalInventory: 0,
    revenue: 0,
    pendingOrders: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const unsubscribeInventory = onSnapshot(
      collection(firebase.firestoreDB, "drugs"),
      (snapshot) => {
        const totalInventory = snapshot.size; // Example calculation
        setStatistics((prev) => ({ ...prev, totalInventory }));
      }
    );

    const unsubscribeSupplier = onSnapshot(
      collection(firebase.firestoreDB, "supplier"),
      (snapshot) => {
        const totalSuppliers = snapshot.size;
        setStatistics((prev) => ({ ...prev, totalSuppliers }));
      }
    );

    const unsubscribeOrders = onSnapshot(
      collection(firebase.firestoreDB, "orders"),
      (snapshot) => {
        const pendingOrders = snapshot.docs.filter(
          (doc) => doc.data().status === "Pending"
        ).length;
        setStatistics((prev) => ({ ...prev, pendingOrders }));
      }
    );

    const unsubscribeUsers = onSnapshot(
      collection(firebase.firestoreDB, "users"),
      (snapshot) => {
        const totalUsers = snapshot.size;
        setStatistics((prev) => ({ ...prev, totalUsers }));
      }
    );

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeInventory();
      unsubscribeSupplier();
      unsubscribeOrders();
      unsubscribeUsers();
    };
  }, [firebase.firestoreDB]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <Icon w="32px" h="32px" as={MdBarChart} color="brand.500" />
          }
          name="Total Inventory"
          value={statistics.totalInventory}
        />
        <MiniStatistics
          startContent={
            <Icon w="32px" h="32px" as={MdBarChart} color="brand.500" />
          }
          name="Suppliers"
          value={statistics.totalInventory}
        />
        <MiniStatistics
          growth="+2"
          name="Pending Orders"
          value={statistics.pendingOrders}
        />
        <MiniStatistics
          startContent={
            <Icon w="32px" h="32px" as={MdFileCopy} color="brand.500" />
          }
          name="Total Users"
          value={statistics.totalUsers}
        />
      </SimpleGrid>
    </Box>
  );
}
