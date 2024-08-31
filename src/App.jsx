import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";
import "./App.css";
import { SignUp } from "./components/auth";

const db = getDatabase(app);

function App() {
  const putData = () => {
    set(ref(db, "users/abhinav"), {
      id: 1,
      name: "Abhinav",
      age: 20,
    });
  };
  return (
    <>
    <SignUp/>
      {/* <button onClick={putData}>Put Data</button> */}
    </>
  );
}

export default App;
