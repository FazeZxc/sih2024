import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { Skeleton } from "@chakra-ui/react";

export const Notifications = () => {
  const firebase = useFirebase();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firebase.firestoreDB, "notifications"),
      (querySnapshot) => {
        const notificationList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching Notifications:", error.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [firebase.firestoreDB]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firebase.firestoreDB, "drugs"),
      (querySnapshot) => {
        const drugList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDrugs(drugList);
      },
      (error) => {
        console.error("Error fetching drugs:", error.message);
      }
    );
    return () => unsubscribe();
  }, [firebase.firestoreDB]);

  useEffect(() => {
    if (drugs.length > 0) {
      drugs.forEach((drug) => {
        const expirationDate = new Date(drug.expirationDate);
        const currentDate = new Date();

        const timeDifference = expirationDate.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        if (daysDifference <= 7 && daysDifference >= 0) {
          handleAddNotification(drug);
        }
      });
    }
  }, [drugs]);

  const handleAddNotification = async (drug) => {
    const existingNotification = notifications.find(
      (n) => n.drugId === drug.id && n.type === "expiration"
    );

    if (!existingNotification) {
      const notificationData = {
        drugId: drug.id,
        drugName: drug.name,
        message: `${drug.name} is expiring on ${drug.expirationDate}`,
        type: "expiration",
        createdAt: new Date(),
      };
      try {
        await addDoc(
          collection(firebase.firestoreDB, "notifications"),
          notificationData
        );
      } catch (error) {
        console.error("Error adding notification:", error.message);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        paddingLeft: "20px",
        height: "500px",
        fontSize: "15px",
      }}
    >
      {loading ? (
        <Skeleton height="auto" />
      ) : notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
};
