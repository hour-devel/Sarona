import React, { Suspense } from "react";
import Image from "next/image";
import resetPassword from "../../../../public/icon/resetPassword1.svg";
import resetPasswordIcon from "../../../../public/icon/resetPassword.svg";
import logo from "../../../../public/icon/logoFull.svg";
import ResetPasswordForm from "./_component/ResetPasswordForm";
import LoadingPage from "../loading";

const ResetPasswordPage = () => {
  return (
    <div className="bg-white w-screen h-[100vh] relative">
      <Image
        src={resetPasswordIcon}
        alt=""
        className="absolute right-0 bottom-0 2xl:w-[45%]"
      />
      <div className="px-4 flex">
        <Image src={logo} alt="" className="w-[120px] h-[70px]"></Image>
      </div>
      <div className="w-[300px] h-[300px] rounded-[50%] absolute top-[50%] translate-y-[-50%] left-[60%]">
        <div className="w-[100%] h-[100%] relative">
          <Image
            src={resetPassword}
            alt=""
            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  h-[140%]"
          ></Image>
        </div>
      </div>
      <div className="w-[550px] h-[500px] bg-white rounded-[40px] absolute xl:left-[15%] 2xl:left-[24%] top-[50%] translate-y-[-50%] py-[50px] px-[40px] shadow-2xl shadow-[#3779db77]">
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
