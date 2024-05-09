"use client";

import useAuth from "@/hooks/useAuth";
import useMutation from "@/hooks/useMounted";
import { saveToLocalStorage } from "@/utils/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiGoogleFill } from "react-icons/ri";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input/Input";

const LoginForm = () => {
  const { mutation, isLoading } = useMutation();
  const { getUser } = useAuth();
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
  // const onsubmit: SubmitHandler<FieldValues> = async (data) => {
  //   try {
  //     setIsLoading(true);
  //     const headers: any = { "Content-Type": "application/json" };
  //     const res = await fetch(`${BASE_URL}/login`, {
  //       method: "POST",
  //       headers,
  //       body: JSON.stringify(data),
  //     });
  //     console.log({ res });
  //     const response = await res.json();

  //     if (response.success) {
  //       setIsLoading(false);
  //       localStorage.setItem("accessToken", JSON.stringify(response.token));
  //       headers["Authorization"] = `Bearer ${response?.token}`;
  //       router.push("/cart");
  //       router.refresh();
  //       toast.success(response.msg);
  //     }

  //     if (!response.success) {
  //       setIsLoading(false);
  //       toast.error(response.error.msg);
  //     }
  //     console.log(response);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await mutation("login", {
        isAlert: true,
        body: data,
      });
      console.log({ res });

      if (res?.results?.success) {
        saveToLocalStorage("ACCESS_TOKEN", res?.results?.token);
        getUser();
        router.push("/cart");
        router.refresh();
      }
    } catch (error) {
      console.log({ error });
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
        {`Don't have an account?`}
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
