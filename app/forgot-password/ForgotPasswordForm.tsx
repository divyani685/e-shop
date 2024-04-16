"use client";

import { BASE_URL } from "@/utils/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log({ res });
      const response = await res.json();
      if (response.success) {
        setIsLoading(false);
        const email = encodeURIComponent(data.email);
        router.push(`/otp-verification?email=${email}`);

        router.refresh();
        toast.success(response.msg);
      } else {
        setIsLoading(false);
        toast.error(response.error.msg);
      }
      console.log({ response });
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <Heading title="Forgot your password?" />
      <Input
        id="email"
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
