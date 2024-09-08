import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Spinner,
  Box,
  Text
} from '@chakra-ui/react';
import { useFirebase } from '../../../../context/firebase';

const InventoryList = ({ onUpdateClick }) => {
  const firebase = useFirebase();
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firebase.firestoreDB, 'drugs'),
      (querySnapshot) => {
        const drugList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDrugs(drugList);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching inventory:', error.message);
        setLoading(false);
      }
    );

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, [firebase.firestoreDB]);

  const deleteDrug = async (id) => {
    try {
      await deleteDoc(doc(firebase.firestoreDB, 'drugs', id));
    } catch (error) {
      console.error('Error deleting drug:', error.message);
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box overflowX="auto">
      {drugs.length === 0 ? (
        <Text>No drugs in inventory.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Quantity</Th>
              <Th>Batch ID</Th>
              <Th>Expiration Date</Th>
              <Th>Supplier</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {drugs.map((drug) => (
              <Tr key={drug.id}>
                <Td>{drug.name}</Td>
                <Td>{drug.type}</Td>
                <Td>{drug.quantity}</Td>
                <Td>{drug.batchId}</Td>
                <Td>{drug.expirationDate}</Td>
                <Td>{drug.supplier}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    onClick={() => onUpdateClick(drug.id)}
                    mr={2}
                  >
                    Update
                  </Button>
                  <Button colorScheme="red" onClick={() => deleteDrug(drug.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default InventoryList;
