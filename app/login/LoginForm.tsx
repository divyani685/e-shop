"use client";

import { BASE_URL } from "@/utils/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiGoogleFill } from "react-icons/ri";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input/Input";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log({ res });
      const response = await res.json();
      if (response.success) {
        if (response.token) {
          localStorage.setItem("accessToken", JSON.stringify(response.token));
        }
        setIsLoading(false);
        router.push("/cart");
        router.refresh();
        toast.success(response.msg);
      }

      if (!response.success) {
        setIsLoading(false);
        toast.error(response.error.msg);
      }
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Heading title="Sign In for E-Shop" />
      <Button
        outline
        label="Continue with Google"
        icon={RiGoogleFill}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
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
      <div className="self-end underline underline-offset-2 text-slate-600 text-sm font-medium">
        <Link href={"/forgot-password"}>Forgot Password?</Link>
      </div>
      <Button
        label={isLoading ? "Loading..." : "Sign In"}
        onClick={handleSubmit(onsubmit)}
      />
      <p className="text-sm ">
        Don't have an account?{" "}
        <Link
          href={"/register"}
          className="underline font-semibold text-slate-700"
        >
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
