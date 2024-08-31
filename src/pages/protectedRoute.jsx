/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";

export const ProtectedRoute = ({ children, role }) => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const firebase = useFirebase();

  useEffect(() => {
    const fetchRole = async () => {
      const role = await firebase.checkUserRole(firebase.auth.currentUser.uid);
      setUserRole(role);
    };
    if (firebase.auth.currentUser) {
      fetchRole();
    } else {
      navigate("/login");
    }
  }, []);

  if(userRole === role){
    return children
  }else{
    return <div>Access Denied!</div>
  }
};
