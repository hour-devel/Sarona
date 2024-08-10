import Image from "next/image";
import React, { Suspense } from "react";
import ForgetPassword_img from "../../../../public/icon/forgetPassword1.svg";
import icon from "../../../../public/icon/forgetPassword.svg";
import logo from "../../../../public/icon/logoFull.svg";
import ForgetPasswordComponent from "../_component/ForgetPasswordComponent";

const ForgetPasswordPage = () => {
  return (
    <div className="bg-white w-screen h-[100vh] relative">
      <Image
        src={icon}
        alt=""
        className="absolute xl:left-[-5%] xl:top-[30%] 2xl:left-[-4%] 2xl:w-[43%] 2xl:top-[28%] 2xl:h-[70%]"
      />
      <div className="px-4 flex">
        <Image src={logo} alt="" className="w-[120px] h-[70px]"></Image>
      </div>
      <div className="xl:w-[400px] xl:h-[400px] 2xl:w-[500px] 2xl:h-[500px] rounded-[50%] absolute xl:top-[50%] 2xl:top-[46%] translate-y-[-30%] left-[15%]">
        <div className="w-[100%] h-[100%] relative">
          <Image
            src={ForgetPassword_img}
            alt=""
            className="absolute xl:left-[50%] 2xl:left-[60%] top-[50%] translate-x-[-50%] translate-y-[-50%]  h-[140%]"
          ></Image>
        </div>
      </div>
      <div className="xl:w-[550px] xl:h-[400px] 2xl:w-[600px]  bg-white rounded-[40px] absolute xl:left-[45%] 2xl:left-[43%] top-[50%] xl:translate-y-[-65%] 2xl:translate-y-[-65%] py-[30px] px-[40px] shadow-sd">
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
