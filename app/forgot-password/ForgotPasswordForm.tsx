"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input/Input";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data");
    router.push("/otp-verification");
    // try {
    //   setIsLoading(true);
    //   console.log({ data });
    //   const res = await fetch(`${BASE_URL}/login`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   console.log({ res });
    //   const response = await res.json();
    //   if (response.success) {
    //     setIsLoading(false);
    //     router.push("/cart");
    //     router.refresh();
    //     toast.success("Login Successfully");
    //   } else {
    //     setIsLoading(false);
    //     toast.error(response.error);
    //   }
    //   console.log(response);
    // } catch (error) {
    //   console.log("error", error);
    // }
  };
  return (
    <>
      <Heading title="Forgot your password?" />

      <Input
        id="forgotPassword"
        label="Enter mobile no. or email id"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading..." : "Continue"}
        onClick={handleSubmit(onsubmit)}
      />
    </>
  );
};

export default ForgotPasswordForm;
