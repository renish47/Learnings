# React Hook Form

```tsx
import { useForm, type FieldValues } from "react-hook-form";

export default function FormWithReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    // TODO: submit to server
    // ...
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Email is required",
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <p>{`${errors.email.message}`}</p>}

      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 10,
            message: "Password must be at least 10 characters",
          },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p>{`${errors.password.message}`}</p>}

      <input
        {...register("confirmPassword", {
          required: "Confirm password is required",
          validate: (value) =>
            value === getValues("password") || "Passwords must match",
        })}
        type="password"
        placeholder="Confirm password"
      />
      {errors.confirmPassword && <p>{`${errors.confirmPassword.message}`}</p>}

      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
    </form>
  );
}
```
