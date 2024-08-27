import Image from "next/image";
import React, { Suspense } from "react";
import ForgetPassword_img from "../../../../public/icon/forgetPassword1.svg";
import icon from "../../../../public/icon/forgetPassword.svg";
import logo from "../../../../public/icon/logoFull.svg";
import ForgetPasswordComponent from "../_component/ForgetPasswordComponent";

const ForgetPasswordPage = () => {
  return (
    <div className="w-screen h-[100vh] relative flex justify-center items-center">
      <div className="xl:w-[550px] xl:h-[400px] 2xl:w-[600px] bg-white rounded-[40px] py-[30px] px-[40px] shadow-sd">
        <div className="w-[100%] py-[7px] text-black text-[30px]">
          <h1 className="font-bold text-[32px]">Forget Your Password ?</h1>
        </div>
        <Suspense fallback={"Loading suspense"}>
          <ForgetPasswordComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
