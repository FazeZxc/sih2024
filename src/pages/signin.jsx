import { useForm } from "react-hook-form";
import { useFirebase } from "../context/firebase";


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
    </>
  );
};
