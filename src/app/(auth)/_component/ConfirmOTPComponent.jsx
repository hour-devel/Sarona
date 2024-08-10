"use client";
import React, { useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import OtpInput from "react-otp-input";
import VerifySuccessComponent from "./VerifySuccessComponent";
import { resendOtpCodeAction, verifyOptAction } from "@/action/authAction";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import LoadingPage from "../loading";
import LoadingComponent from "./LoadingComponent";

const ConfirmOTPComponent = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [openVerifySuccess, setOpenVerifySuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const verifyUrl = searchParams.get("verify");
  const email = searchParams.get("email");

  async function handleVerifyOpt() {
    setLoading(true);
    const verify = await verifyOptAction(otp);
    if (verify?.errorStatusCode == 408) {
      setLoading(false);
      toast?.error("OTP code has already expired.");
    } else if (verify?.errorStatusCode == 404) {
      setLoading(false);
      toast.error(verify?.errorMessage);
    } else if (verify.statusCode == 200) {
      if (verifyUrl == "register") {
        toast.success(verify?.message);
        router.push("/login");
      } else {
        router.push(`resetPassword?email=${email}`);
      }
      setLoading(true);
    }
  }

  async function resendOTPCode(e) {
    setLoading(true);
    e.preventDefault();
    const resendCode = await resendOtpCodeAction(email);
    if (resendCode?.statusCode == 200) {
      toast.success("Code has been sent");
      setOtp("");
      setLoading(false);
    } else {
      toast.error("Something went wrong with opt code!");
      setLoading(false);
    }
  }

  return (
    <div>
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
      <form>
        <div className="w-[100%] float-left flex justify-center items-center relative mb-[25px]">
          <div className="w-[80%] h-auto flex justify-center items-center">
            <OtpInput
              type="number"
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span className="mr-[50px]"></span>}
              className="px-0"
              renderInput={(props) => (
                <Input
                  {...props}
                  type="number"
                  labelPlacement="inside"
                  classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                      "bg-transparent",
                      "text-black",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "hover:shadow-sd",
                      "shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
                      "height: 200px",
                      "width: 20px",
                      "bg-default-200/50",
                      "px-0",
                      "dark:bg-white",
                      "hover:border-0",
                    ],
                  }}
                  size="lg"
                  style={{
                    fontSize: "1.5rem",
                    textAlign: "center",
                    height: "40px",
                    width: "50px",
                  }}
                />
              )}
            />
          </div>
        </div>

        <p className="text-center text-gray-400">
          Didn't get a code ? &nbsp;
          <button
            onClick={(e) => resendOTPCode(e)}
            state="hello"
            className="text-blue-400"
          >
            Click to resend.
          </button>
        </p>
        <div className="w-[155px] h-[0.5px] bg-gray-300 mt-[30px] mb-[30px] mx-auto"></div>
        <div className="w-[50%] float-left pl-[80px] pr-[20px] flex justify-end">
          {verifyUrl == "register" ? (
            <Link href={"/register"}>
              <Button
                color="primary"
                variant="shadow"
                className="min-w-[85px] h-[50px] mt-[15px] bg-white text-[#006FEE]"
              >
                Cancel
              </Button>
            </Link>
          ) : (
            <Link href={"/forgetPassword"}>
              <Button
                color="primary"
                variant="shadow"
                className="min-w-[85px] h-[50px] mt-[15px] bg-white text-[#006FEE]"
              >
                Cancel
              </Button>
            </Link>
          )}
        </div>
        {}
        <div className="w-[50%] float-left pr-[80px] pl-[20px] flex justify-start">
          {loading ? (
            <Button
              onClick={handleVerifyOpt}
              color="primary"
              variant="shadow"
              className="min-w-[85px] h-[50px] mt-[15px]"
            >
              <LoadingComponent />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleVerifyOpt}
              color="primary"
              variant="shadow"
              className="min-w-[85px] h-[50px] mt-[15px]"
            >
              Verify
            </Button>
          )}
          {openVerifySuccess && (
            <VerifySuccessComponent model={() => setOpenVerifySuccess(false)} />
          )}
        </div>
      </form>
    </div>
  );
};

export default ConfirmOTPComponent;
