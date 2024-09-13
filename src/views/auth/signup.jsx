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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFirebase } from "../../context/firebase";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const firebase = useFirebase();
  const onSubmit = async (data) => {
    try {
      await firebase.signUpUser(data);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
        maxWidth="600px"
        width="100%"
      >
        <VStack spacing={6}>
          <Heading as="h1" size="xl" color="teal.400">
            Create An Account
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={errors.displayName}>
                <FormLabel htmlFor="displayName">Display Name</FormLabel>
                <Input
                  id="displayName"
                  placeholder="Name"
                  {...register("displayName", {
                    required: "Display name is required",
                  })}
                />
                {errors.displayName && (
                  <Text color="red.500" fontSize="sm">
                    {errors.displayName.message}
                  </Text>
                )}
              </FormControl>
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
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
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
              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="100%"
                fontFamily="monospace"
              >
                Sign Up
              </Button>
            </VStack>
          </form>
          <Text fontSize="sm" fontFamily="monospace">
            Already have an account?{" "}
            <Link color="teal.500" href="/sign-in">
              Sign in
            </Link>
          </Text>
          <Text>- - - or - - -</Text>
          <Button
            onClick={firebase.signInWithGoogle}
            colorScheme="red"
            variant="outline"
            size="lg"
            width="100%"
            fontFamily="monospace"
          >
            Sign In with Google
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
