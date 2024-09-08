import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useFirebase } from "../../../context/firebase";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Spinner,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

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
  const toast = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = firebase.auth.currentUser;
        if (user) {
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
        await setDoc(doc(firebase.firestoreDB, "users", user.uid), userData, {
          merge: true,
        });
        toast({
          title: "Profile updated.",
          description: "Your profile information has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error.message);
      setError("Failed to update profile.");
      toast({
        title: "Error updating profile.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxWidth="600px" mx="auto" p={6} pt={{ base: "130px", md: "80px", xl: "80px" }} borderWidth={1} borderRadius="lg" boxShadow="lg" backgroundColor="white">
      <Heading as="h2" size="lg" mb={6}>
        User Profile
      </Heading>
      {error && <Text color="red.500" mb={4}>{error}</Text>}
      <form onSubmit={handleFormSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              value={userData.email}
              placeholder="you@example.com"
              onChange={handleInputChange}
              disabled
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <InputGroup>
              <Input
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                placeholder="1234567890"
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Input
              id="role"
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              placeholder="Your Role"
              disabled
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Update Profile
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UserProfile;
