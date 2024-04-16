"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input/Input";

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    router.push("/login");
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
      <Heading title="Reset your password" />
      <Input
        id="newpassword"
        label="New Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Input
        id="password"
        label="Confirm New Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading..." : "Submit"}
        onClick={handleSubmit(onsubmit)}
      />
    </>
  );
};

export default ResetPasswordForm;
