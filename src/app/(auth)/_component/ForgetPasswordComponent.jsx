"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputComponent from "./InputComponent";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { resendOtpCodeAction } from "@/action/authAction";
import { forgetPasswordSchema } from "@/lib/schema/authSchema";
import toast, { Toaster } from "react-hot-toast";
import LoadingComponent from "./LoadingComponent";

const ForgetPasswordComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(forgetPasswordSchema) });

  const onSubmit = async (userEmail) => {
    setLoading(true);
    const verifyEmail = await resendOtpCodeAction(userEmail.email);
    if (verifyEmail?.statusCode == 200) {
      toast.success("Code has been sent");
      setLoading(false);
      router.push(
        `/confirmOTP?email=${userEmail?.email}&verify=forget-password`
      );
    } else {
      setLoading(false);
      toast.error(verifyEmail?.errorMessage);
    }
  };
  return (
    <div>
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="mt-[30px] font-medium text-gray-400 text-[16px]">Email</p>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-[10px]">
          <div className="w-[100%] h-auto float-left">
            <InputComponent
              icon={
                <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.3">
                    <rect
                      x="5.76367"
                      y="7.5835"
                      width="17.3333"
                      height="13"
                      rx="2"
                      stroke="#33363F"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M5.76367 10.8335L13.5359 14.7196C14.099 15.0011 14.7617 15.0011 15.3248 14.7196L23.097 10.8335"
                      stroke="#33363F"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              }
              valid={register}
              name="email"
              label="Email"
              error={errors?.email}
            />
          </div>
        </div>
        {loading ? (
          <Button
            color="primary"
            variant="shadow"
            className="w-[100%] mt-[30px] text-[14px] h-[48px]"
          >
            <LoadingComponent />
          </Button>
        ) : (
          <Button
            type="submit"
            color="primary"
            variant="shadow"
            className="w-[100%] mt-[30px] text-[14px] h-[48px]"
          >
            Recover Password
          </Button>
        )}
        <p className="mt-[20px] text-center">
          <Link href="/login" className="text-[#757575] text-[14px]">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgetPasswordComponent;
