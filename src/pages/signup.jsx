import { useForm } from "react-hook-form";
import { useFirebase } from "../context/firebase";
import { Box, Heading } from "@chakra-ui/react";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const firebase = useFirebase();

  const onSubmit = (data) => firebase.signUpUser(data);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bg="gray.100"
      >
        <Box bg="white" p={6} rounded="md" shadow="md" width="sm">
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Sign Up
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="display name"
              {...register("displayName", { required: true })}
            />
            <input
              defaultValue={""}
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
            <input
              placeholder="password"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
            <button type="Submit">Sign Up</button>
          </form>
          <br />
          <button onClick={firebase.signInWithGoogle}>
            Sign In With Google
          </button>
        </Box>
      </Box>
    </>
  );
}
