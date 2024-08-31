import "./App.css";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { useFirebase } from "./context/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import UserProfile from "./pages/profile";


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
      <UserProfile/>
    </>
  );
}

export default App;
