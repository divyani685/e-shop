"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input/Input";

const OtpVerificationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data");
    router.push("/reset-password");
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
      <Heading title="OTP Verification" />
      <p>Enter OTP Sent to your registered mobile number/email id.</p>
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
          <Link href={"/forgot-password"}>Resend</Link>
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
