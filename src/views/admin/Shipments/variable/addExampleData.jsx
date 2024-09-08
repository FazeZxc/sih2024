import { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useFirebase } from '../../../../context/firebase';

const AddExampleData = () => {
  const firebase = useFirebase();

  useEffect(() => {
    const addData = async () => {
      const stockLevels = [
        { id: "product1", quantity: 150, reorderThreshold: 20 },
        { id: "product2", quantity: 80, reorderThreshold: 15 },
        { id: "product3", quantity: 300, reorderThreshold: 50 },
        { id: "product4", quantity: 60, reorderThreshold: 25 }
      ];

      const batch = firebase.firestoreDB.batch();
      stockLevels.forEach(stock => {
        const docRef = collection(firebase.firestoreDB, 'stockLevels').doc(stock.id);
        batch.set(docRef, stock);
      });

      try {
        await batch.commit();
      } catch (error) {
        console.error('Error adding example data:', error.message);
      }
    };

    addData();
  }, [firebase.firestoreDB]);

  return null;
};

export default AddExampleData;
