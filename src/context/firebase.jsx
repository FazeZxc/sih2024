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
import { getDatabase, ref, set } from "firebase/database";

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
const db = getDatabase(app);
const googleProvider = new GoogleAuthProvider();
const FirebaseContext = createContext(null);


// eslint-disable-next-line react-refresh/only-export-components
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signUpUser = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((value) =>
        console.log("created an account with gmail " + value.user.email)
      )
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

  const putData = () => {
    set(ref(db, "users/abhinav"), {
      id: 1,
      name: "Abhinav",
      age: 20,
    });
  };

  return (
    <FirebaseContext.Provider
      value={{ signUpUser, signInUser, putData, signInWithGoogle }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
