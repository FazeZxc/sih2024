/* eslint-disable no-unused-vars */
import "./App.css";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { useFirebase } from "./context/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import UserProfile from "./pages/profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InventoryManagement from "./pages/inventory";
import InventoryList from "./components/inventory/viewInventory";
import OrderManagement from "./pages/orderManagement";
import SupplyChainManagement from "./pages/supplyChainManagement";
import { Button, ChakraProvider } from "@chakra-ui/react";
import initialTheme from "./themes/theme"
import AuthLayout from './layout/auth';
import AdminLayout from './layout/admin';

function App() {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

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
      <ChakraProvider theme={currentTheme}>
        <Routes>
          <Route path="auth/*" element={<AuthLayout />} />
          <Route
            path="admin/*"
            element={
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            }
          />
          {/* <Route
          path="rtl/*"
          element={
            <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        <Route path="/" element={<Navigate to="/admin" replace />} />
        */}
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
