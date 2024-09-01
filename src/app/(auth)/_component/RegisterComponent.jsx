"use client";
import React, { useState } from "react";
import PasswordComponent from "./PasswordComponent";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import InputComponent from "./InputComponent";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "@/action/authAction";
import toast from "react-hot-toast";
import LoadingComponent from "./LoadingComponent";

const RegisterComponent = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(registerInfo) {
    setLoading(true);
    const useGoogle = false;
    const register = await registerAction(registerInfo, useGoogle);
    alert(1);
    console.log("register :",registerInfo);

    console.log("Log register :",register);
    
    
    //console.log("after register : ", register);
    if (register?.statusCode == 200) {
      setLoading(false);
      toast.success("Successfully Register!");
      router.push(`/confirmOTP?email=${registerInfo?.email}&verify=register`);
    } else if (register?.status == 400) {
      setLoading(false);
      toast.error("Please Checking your information again");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="w-[50%] mt-[15px] float-left p-[5px]">
        <p className="text-gray-600  2xl:text-[14px] xl:text-[14px] text-[12px]  mb-[5px]">First Name</p>
        <InputComponent
          valid={register}
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="none"
              xmlns=""
            >
              <path
                d="M13 4.0625C9.86781 4.0625 7.3125 6.61781 7.3125 9.75C7.3125 11.7081 8.31187 13.4469 9.82638 14.4731C6.92819 
                15.7162 4.875 18.5924 4.875 21.9375H6.5C6.5 18.3381 9.40063 15.4375 13 15.4375C16.5994 15.4375 19.5 18.3381 19.5 
                21.9375H21.125C21.125 18.5924 19.0718 15.717 16.1736 14.4722C16.9466 13.9504 17.5799 13.2472 18.0182 12.4239C18.4564 
                11.6007 18.6862 10.6826 18.6875 9.75C18.6875 6.61781 16.1322 4.0625 13 4.0625ZM13 5.6875C15.2531 5.6875 17.0625 7.49694 
                17.0625 9.75C17.0625 12.0031 15.2531 13.8125 13 13.8125C10.7469 13.8125 8.9375 12.0031 8.9375 9.75C8.9375 7.49694 10.7469 
                5.6875 13 5.6875Z"
                fill="#999999"
              />
            </svg>
          }
          name="firstName"
          label="First Name"
          error={errors.firstName}
        />
      </div>
      <div className="w-[50%] mt-[15px] float-left p-[5px]">
        <p className="text-gray-600 2xl:text-[14px] xl:text-[14px] text-[12px]  xl:mb-[5px] 2xl:mb-[7px] mb-[5px]">
          Last Name
        </p>
        <InputComponent
          valid={register}
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 4.0625C9.86781 4.0625 7.3125 6.61781 7.3125 9.75C7.3125 11.7081 8.31187 13.4469 9.82638 14.4731C6.92819 15.7162
                 4.875 18.5924 4.875 21.9375H6.5C6.5 18.3381 9.40063 15.4375 13 15.4375C16.5994 15.4375 19.5 18.3381 19.5 21.9375H21.125C21.125
                  18.5924 19.0718 15.717 16.1736 14.4722C16.9466 13.9504 17.5799 13.2472 18.0182 12.4239C18.4564 11.6007 18.6862 10.6826 18.6875
                   9.75C18.6875 6.61781 16.1322 4.0625 13 4.0625ZM13 5.6875C15.2531 5.6875 17.0625 7.49694 17.0625 9.75C17.0625 12.0031 15.2531
                    13.8125 13 13.8125C10.7469 13.8125 8.9375 12.0031 8.9375 9.75C8.9375 7.49694 10.7469 5.6875 13 5.6875Z"
                fill="#999999"
              />
            </svg>
          }
          name="lastName"
          label="Last Name"
          error={errors.lastName}
        />
      </div>
      <div className="w-[100%] float-left p-[5px]">
        <p className="text-gray-600 2xl:text-[14px] xl:text-[14px] text-[12px]  xl:mb-[5px] 2xl:mb-[7px] mb-[5px]">
          Email
        </p>
        <InputComponent
          valid={register}
          icon={
            <svg
              width="21"
              height="20"
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
          name="email"
          label="Email"
          error={errors.email}
        />
      </div>
      <div className="w-[100%] mt-[7px] float-left p-[5px]">
        <p className="text-gray-600  2xl:text-[14px] xl:text-[14px] text-[12px]  xl:mb-[5px] 2xl:mb-[7px] mb-[5px]">
          Password
        </p>
        <PasswordComponent
          valid={register}
          name="password"
          placeHolder="Password"
          error={errors.password}
        />
      </div>
      <div className="w-[100%] mt-[7px] float-left p-[5px]">
        <p className="text-gray-600 2xl:text-[14px] xl:text-[14px] text-[12px]  xl:mb-[5px] 2xl:mb-[7px] mb-[5px]">
          Confirm Password
        </p>
        <PasswordComponent
          valid={register}
          name="confirmPassword"
          placeHolder="Confirm Password"
          error={errors.confirmPassword}
        />
      </div>
      {loading ? (
        <Button
          type="submit"
          variant="shadow"
          className="w-[100%] mt-[25px] bg-[#387adf] text-white"
        >
          <LoadingComponent />
        </Button>
      ) : (
        <Button
          type="submit"
          variant="shadow"
          className="w-[100%] mt-[25px] bg-[#08b69b] text-white 2xl:text-[14px] xl:text-[14px] text-[12px] "
        >
          Register
        </Button>
      )}

      <p className=" mt-[15px] text-center 2xl:text-[14px] xl:text-[14px] text-[12px]  pb-[3%]">
        Already have an account ? &nbsp;
        <Link href="/login" className="text-[#08b69b]">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterComponent;
