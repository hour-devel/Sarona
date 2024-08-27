import React, { Suspense } from "react";
import Image from "next/image";
import resetPassword from "../../../../public/icon/resetPassword1.svg";
import resetPasswordIcon from "../../../../public/icon/resetPassword.svg";
import logo from "../../../../public/icon/logoFull.svg";
import ResetPasswordForm from "./_component/ResetPasswordForm";
import LoadingPage from "../loading";

const ResetPasswordPage = () => {
  return (
    <div className="bg-white w-screen h-[100vh] flex justify-center items-center">
      <div className="w-[550px] h-[500px] bg-white rounded-[40px] py-[50px] px-[40px] shadow-2xl shadow-[#3779db77]">
        <div className="w-[100%] py-[7px]">
          <h1 className="font-bold text-[32px] text-black">
            Reset Your Password
          </h1>
        </div>
        {/* Form reset password */}
        <section>
          {/* <Suspense fallback={<LoadingPage />}> */}
          <Suspense fallback={'Loading suspense'}>
            <ResetPasswordForm />
          </Suspense>
        </section>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
