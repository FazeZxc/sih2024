import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Use environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
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

  const signOutFirebase = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
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
        signOutFirebase,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
