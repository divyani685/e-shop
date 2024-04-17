"use client";

import { BASE_URL } from "@/utils/config";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input/Input";

const OtpVerificationForm = () => {
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
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/otp-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, email }),
      });
      const response = await res.json();
      if (response.success) {
        setIsLoading(false);
        router.push(`/reset-password?email=${email}`);
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
  const handleResend = () => {};
  return (
    <>
      <Heading title="OTP Verification" />
      <p>Enter OTP Sent to your registered email id.</p>
      <Input
        id="otp"
        label="Enter OTP"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="self-end text-sm ">
        Did not receive OTP?
        <span className=" underline  text-slate-600 font-medium">
          <Link href={"/forgot-password"} onClick={() => handleResend()}>
            Resend
          </Link>
        </span>
      </div>

      <Button
        label={isLoading ? "Loading..." : "Continue"}
        onClick={handleSubmit(onsubmit)}
      />
    </>
  );
};

export default OtpVerificationForm;
