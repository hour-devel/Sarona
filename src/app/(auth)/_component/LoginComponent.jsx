"use client";
import React, { useEffect, useState } from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import PasswordComponent from "./PasswordComponent";
import { useRouter } from "next/navigation";
import InputComponent from "./InputComponent";
import { useForm } from "react-hook-form";
import { authSchema } from "@/lib/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import LoadingComponent from "./LoadingComponent";
import logo from "../../../../public/icon/logoFull.svg";
import Image from "next/image";
const LoginComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  async function handleLogin(loginInfo) {
    setLoading(true);
    const userLogin = {
      email: loginInfo.email,
      password: loginInfo.password,
    };
    const res = await signIn("credentials", {
      redirect: false,
      ...userLogin,
    });
    if (res.status == 200) {
      toast.success("Login Successfully");
      router.push("/dashboard");
    } else {
      setLoading(false);
      toast.error("Please Checking your Email and Password again !");
    }
  }

  const handleLoginWithGoogle = async () => {
    const result = await signIn("google", { callbackUrl: "/dashboard" });
    toast.success("Login successfully");
    setLoading(true);
  };

  return (
    <div>
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <div className="2xl:w-[500px] xl:w-[500px] lg:w-[500px] w-[91%] bg-white rounded-[40px] absolute 2xl:left-[48%] xl:left-[35%] lg:left-[20%] left-[5%] 2xl:top-[50%] xl:top-[50%] lg:top-[50%] top-[50%] translate-y-[-55%] 2xl:py-[30px] 2xl:px-[40px] xl:py-[30px] xl:px-[40px] py-[40px] px-[20px] shadow-sd ">
      <div className="2xl:px-4 xl:px-4 flex">
        <Image src={logo} alt="" className="2xl:w-[0px] 2xl:h-[0px] xl:w-[0px] xl:h-[0px] w-[45%] "></Image>
      </div>
        <div className="w-[100%] py-[7px]">
          <h1 className="font-bold 2xl:text-[30px] xl:text-[28px] text-black text-[20px] mt-3">
            Login
          </h1>
          <p className="2xl:text-[14px] xl:text-[13px] text-[#757575] py-1 text-[13px]">
            Welcome back to Cognito
          </p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex bg-white w-[100%] flex-wrap md:flex-nowrap gap-4 mt-[10px] mb-[10px]">
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
          <div className="w-[100%] mt-[7px] float-left">
            <PasswordComponent
              valid={register}
              name="password"
              placeHolder="Password"
              error={errors.password}
            />
          </div>
          <Checkbox
            className="mt-[8px] text-[13px]"
            classNames={{
              label: "text-small",
            }}
          >
            Remember me
          </Checkbox>
          <p className="text-small text-[red] float-right mt-[16px] text-[13px]">
            <Link href="/forgetPassword"> Forget password ?</Link>
          </p>
          {loading ? (
            <Button
              type="submit"
              color="primary"
              variant="shadow"
              className="w-[100%] mt-[10px]"
            >
              <LoadingComponent />
            </Button>
          ) : (
            <Button
              type="submit"
              color="primary"
              variant="shadow"
              className="w-[100%] mt-[10px] text-[13px]"
            >
              Login
            </Button>
          )}
          <p className="mt-[15px] text-center text-small text-[13px]">
            Don't have an account ?{" "}
            <Link href="/register" className="text-blue-400 text-[13px]">
              Register
            </Link>
          </p>
          <button
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#ddedfc]"
            type="button"
            onClick={handleLoginWithGoogle}
          >
            <svg
              className="mr-3 text-[13px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
