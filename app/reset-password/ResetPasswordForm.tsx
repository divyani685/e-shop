"use client";

import { BASE_URL } from "@/utils/config";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input/Input";

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState<any>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      setEmail(searchParams.get("email"));
    }
  }, [searchParams]);
  console.log("email id--", email);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const onsubmit: SubmitHandler<FieldValues> = async (data: any) => {
    // const val = JSON.stringify({ data, email });
    // console.log(val);
    try {
      setIsLoading(true);
      console.log("input data--", data);
      const res = await fetch(`${BASE_URL}/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, email }),
      });
      console.log({ res });
      const response = await res.json();
      if (response.success) {
        setIsLoading(false);
        router.push(`/login`);
        router.refresh();
        toast.success(response.msg);
      }
      if (!response.success) {
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
