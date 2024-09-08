import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Text,
  Flex,
  Progress,
  useColorModeValue
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon, CloseIcon } from '@chakra-ui/icons';
import { useFirebase } from "../../../../context/firebase"

const ComplexTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const firebase = useFirebase();
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firebase.firestoreDB, 'yourCollectionName'));
        const fetchedData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(fetchedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError('An error occurred while fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <CheckCircleIcon color="green.500" />;
      case 'Error':
        return <WarningIcon color="orange.500" />;
      case 'Disable':
        return <CloseIcon color="red.500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <Box overflowX="auto">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="gray.400">Name</Th>
              <Th color="gray.400">Status</Th>
              <Th color="gray.400">Date</Th>
              <Th color="gray.400">Progress</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => (
              <Tr key={row.id}>
                <Td>
                  <Text color={textColor} fontWeight="bold" fontSize="sm">
                    {row.name}
                  </Text>
                </Td>
                <Td>
                  <Flex align="center">
                    {getStatusIcon(row.status)}
                    <Text color={textColor} fontSize="sm" fontWeight="bold" ml={2}>
                      {row.status}
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Text color={textColor} fontSize="sm" fontWeight="bold">
                    {row.date}
                  </Text>
                </Td>
                <Td>
                  <Flex align="center">
                    <Progress
                      value={row.progress}
                      size="sm"
                      colorScheme="blue"
                      width="100px"
                    />
                    <Text color={textColor} fontSize="sm" fontWeight="bold" ml={2}>
                      {row.progress}%
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ComplexTable;