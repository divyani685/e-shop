"use client";

import useMutation from "@/hooks/useMounted";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiGoogleFill } from "react-icons/ri";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input/Input";
const RegisterForm = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutation, isLoading } = useMutation();
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
  // const onsubmit: SubmitHandler<FieldValues> = async (data) => {
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(`${BASE_URL}/register`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const response = await res.json();
  //     if (response.success) {
  //       setIsLoading(false);
  //       router.push("/login");
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
      const res = await mutation("register", {
        isAlert: true,
        body: data,
      });
      console.log({ res });
      if (res?.results?.success) {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.log({ error });
    }
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
