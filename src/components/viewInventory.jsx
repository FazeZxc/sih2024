/* eslint-disable react/prop-types */
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useFirebase } from "../context/firebase";
import { useEffect, useState } from "react";

const InventoryList = ({ onUpdateClick }) => {
  const firebase = useFirebase();
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firebase.firestoreDB, "drugs")
        );
        const drugList = querySnapshot.docs.map((doc) => ({
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

  const deleteDrug = async (id) => {
    try {
      await deleteDoc(doc(firebase.firestoreDB, "drugs", id));
      setDrugs(drugs.filter((drug) => drug.id !== id));
    } catch (error) {
      console.error("Error deleting drug:", error.message);
    }
  };

  if (!loading) {
    return (
      <div className="inventory-list">
        <h2>Inventory</h2>
        <ul>
          {drugs.map((drug) => (
            <li key={drug.id}>
              <span>
                {drug.name} - {drug.quantity} units
              </span>
              <button onClick={() => onUpdateClick(drug.id)}>Update</button>
              <button onClick={() => deleteDrug(drug.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  else {
    return <div> Loading </div>
  }
};
export default InventoryList;
