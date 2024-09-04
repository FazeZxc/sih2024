import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FirebaseProvider } from "./context/firebase.jsx";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </FirebaseProvider>
  </StrictMode>
);
