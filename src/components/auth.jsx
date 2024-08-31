import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { useForm } from "react-hook-form";

const auth = getAuth(app);

export function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => signUpUser(data);
  const signUpUser = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password).then(
      (value) => console.log(value)
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={""} placeholder="Email" {...register("email")} />
        <input
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </>
  );
}
