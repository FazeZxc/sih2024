import "./App.css";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { useFirebase } from "./context/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import UserProfile from "./pages/profile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryManagement from "./pages/inventory";
import InventoryList from "./components/viewInventory";
import OrderManagement from "./pages/orderManagement";
function App() {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        console.log("logged out");
      }
    });
  });

  if (user === null) {
    return (
      <>
        <SignUp />
        <SignIn />
      </>
    );
  }
  return (
    <>
      <h1>Hello </h1>
      <button onClick={() => signOut(firebase.auth)}>Log Out</button>
      <Router>
        <Routes>
          <Route path="/" element={<InventoryManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
          {/* Other routes */}
        </Routes>
      </Router>
      {/* <UserProfile/> */}
    </>
  );
}

export default App;
