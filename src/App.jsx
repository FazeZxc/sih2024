/* eslint-disable no-unused-vars */
import "./App.css";
import { SignUp } from "./views/auth/signup";
import { SignIn } from "./views/auth/signin";
import { useFirebase } from "./context/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { WelcomeScreen } from "./utils/welcomeScreen";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import initialTheme from "./themes/theme";
import AdminLayout from "./layout/admin";
import { WelcomeScreenLoggedIn } from "./utils/welcomeScreenLoggedIn";

function App() {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [firebase.auth]);

  if (!user) {
    return (
      <ChakraProvider theme={currentTheme}>
        <Router>
          <Routes>
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/welcome" />} />
          </Routes>
        </Router>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={currentTheme}>
      <Router>
        <Routes>
          <Route path="/welcome" element={<WelcomeScreenLoggedIn />} />
          <Route
            path="admin/*"
            element={
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            }
          />
          <Route path="*" element={<Navigate to="admin/default" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
