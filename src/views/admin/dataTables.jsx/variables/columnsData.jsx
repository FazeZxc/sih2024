
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirebase } from "../../../../context/firebase";
export const columnsDataCheck = [];
export const columnsDataComplex = [];
export const columnsDataColumns = [];
export const columnsDataDevelopment = [];

export const InventoryList = ({ onUpdateClick }) => {
const firebase = useFirebase();
const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firebase.firestoreDB, "drugs")
        );
        columnsDataColumns = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDrugs(drugList);
        console.log(drugList);
      } catch (error) {
        console.error("Error fetching inventory:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, [firebase.firestoreDB]);

};

