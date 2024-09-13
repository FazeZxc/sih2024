/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFirebase } from "../../context/firebase";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const firebase = useFirebase();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await firebase.signInUser(data);
      setLoading(true);
      toast({
        title: "Sign in successful.",
        description: "You've been signed in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setTimeout(() => {
        setLoading(false);
        navigate("/admin");
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
        fontFamily="monospace"
        backgroundColor="teal.600"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="teal.500" />
          <Text fontSize="lg" color="white">
            Opening your Dashboard
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      fontFamily="monospace"
      backgroundColor="teal.600"
    >
      <Box
        bg="white"
        p={8}
        rounded="md"
        shadow="lg"
        maxWidth="400px"
        width="100%"
      >
        <VStack spacing={6}>
          <Heading as="h1" size="xl" color="teal">
            Sign In
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <Text color="red.500" fontSize="sm">
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <Text color="red.500" fontSize="sm">
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg" width="100%">
                Sign In
              </Button>
            </VStack>
          </form>
          <Button
            onClick={firebase.signInWithGoogle}
            colorScheme="red"
            variant="outline"
            size="lg"
            width="100%"
          >
            Sign In with Google
          <Text fontSize="sm">
            Don't have an account?{" "}
            <Link color="teal.400" href="sign-up">
              Sign up
            </Link>
          </Text>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
