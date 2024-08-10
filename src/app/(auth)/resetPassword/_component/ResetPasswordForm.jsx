"use client";
import { resetPasswordAction } from "@/action/authAction";
import { resetPasswordSchema } from "@/lib/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import PasswordComponent from "../../_component/PasswordComponent";
import { Button } from "@nextui-org/react";
import ChangePassworkComplete from "../../_component/ChangePassworkComplete";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import LoadingComponent from "../../_component/LoadingComponent";
const ResetPasswordForm = () => {
  const [openChangeSuccess, setOpenChangeSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  async function handleResetPassword(passwordInfo) {
    setLoading(true);
    const resetPassword = await resetPasswordAction(email, passwordInfo);
    //console.log("after reset password :",resetPassword);
    if (resetPassword.statusCode == 200) {
      setLoading(false);
      toast.success(resetPassword.message);
      router.push("/login");
    } else {
      setLoading(false);
      toast.error("Something went wrong with reset password");
    }
  }
  return (
    <div>
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
      <form onSubmit={handleSubmit(handleResetPassword)}>
        <p className="mt-[30px] font-normal text-gray-500 text-[16px]">
          New Password
        </p>
        <div className="w-[100%] mt-[7px] float-left p-[5px] mb-[20px]">
          <PasswordComponent
            valid={register}
            name="password"
            placeHolder="New Password"
            error={errors.password}
          />
        </div>
        <p className="mt-[15px] font-normal text-gray-500 text-[16px]">
          Confirm Password
        </p>
        <div className="w-[100%] mt-[7px] float-left p-[5px]">
          <PasswordComponent
            valid={register} 
            name="confirmPassword"
            placeHolder="Confirm Password"
            error={errors.confirmPassword}
          />
        </div>
        <Button
          type="submit"
          color="primary"
          variant="shadow"
          className="w-[100%] mt-[30px] text-[14px] font-normal"
        >
          {loading ? <LoadingComponent /> : "Reset Password"}
        </Button>
        {openChangeSuccess && (
          <ChangePassworkComplete Model={() => setOpenChangeSuccess(false)} />
        )}
      </form>
    </div>
  );
};

export default ResetPasswordForm;
