/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCU98N7hh6v8HvY_nE8LuDzghrOLAM25Qg",
  authDomain: "sih-backend-27202.firebaseapp.com",
  projectId: "sih-backend-27202",
  storageBucket: "sih-backend-27202.appspot.com",
  messagingSenderId: "418217293849",
  appId: "1:418217293849:web:db4ef53f745701252f5288",
  databaseURL: "https://sih-backend-27202-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const FirebaseContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signUpUser = (data) => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((value) => {
        putData(value);
        console.log("created an account with gmail " + value.user.email);
      })
      .catch((error) => console.log(error));
  };

  const signInUser = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((value) => console.log("signed in as " + value.user.email))
      .catch((error) => console.log(error));
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((value) => console.log("signed in as " + value.user.email))
      .catch((error) => console.log(error));
  };

  const putData = async (data) => {
    await setDoc(doc(firestoreDB, "users", data.uid), data);
  };

  const assignRole = async (userId, role) => {
    try {
      await setDoc(doc(firestoreDB, "user", userId), { role });
      console.log("roll assigned: " + role);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkUserRole = async (userId) => {
    try {
      const userDoc = await getDoc(doc(firestoreDB, "users", userId));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        return role;
      } else {
        console.log("no such document");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateProfile = async (userId, profileData) => {
    try {
      await setDoc(doc(firestoreDB, "users", userId), profileData, {
        merge: true,
      });
      console.log("Profile Updated");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <FirebaseContext.Provider
      value={{
        auth,
        firestoreDB,
        signUpUser,
        signInUser,
        putData,
        signInWithGoogle,
        assignRole,
        checkUserRole,
        updateProfile,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
