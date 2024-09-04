import { useForm } from "react-hook-form";
import { useFirebase } from "../context/firebase";
import { Box, Heading } from "@chakra-ui/react";

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const firebase = useFirebase();

  const onSubmit = (data) => firebase.signInUser(data);

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
            Sign In
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit">Sign In</button>
          </form>
        </Box>
      </Box>
    </>
  );
};
