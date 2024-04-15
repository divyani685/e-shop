"use client";

import Axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiGoogleFill } from "react-icons/ri";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input/Input";
const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log({ data });
    Axios.post("/api/register", data)
      .then(() => {
        toast.success("Account created");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged In");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch((error) => {
        console.log({ error });
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <Heading title="Sign Up for E-Shop" />
      <Button
        outline
        label="Sign Up with Google"
        icon={RiGoogleFill}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading..." : "Sign UP"}
        onClick={handleSubmit(onsubmit)}
      />
      <p className="text-sm ">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="underline font-semibold text-slate-700"
        >
          Sign In
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
