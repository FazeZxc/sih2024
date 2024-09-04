import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useFirebase } from "../context/firebase";

const UserProfile = () => {
  const firebase = useFirebase();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = firebase.auth.currentUser;
        if (user) {
          console.log(user);
          const userDoc = await getDoc(
            doc(firebase.firestoreDB, "users", user.uid)
          );
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.log(error);
        setError("Failed to load profile information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [firebase.auth, firebase.firestoreDB]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = firebase.auth.currentUser;
      if (user) {
        await setDoc(doc(firebase.db, "users", user.uid), userData, {
          merge: true,
        });
        alert("Profile updated successfully.");
      }
    } catch (error) {
      console.log(error.message);
      setError("Failed to update profile.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
