import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCU98N7hh6v8HvY_nE8LuDzghrOLAM25Qg",
  authDomain: "sih-backend-27202.firebaseapp.com",
  projectId: "sih-backend-27202",
  storageBucket: "sih-backend-27202.appspot.com",
  messagingSenderId: "418217293849",
  appId: "1:418217293849:web:db4ef53f745701252f5288",
  databaseURL: "https://sih-backend-27202-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
