import React, { Suspense } from "react";
import Image from "next/image";
import secure from "../../../../public/icon/security.svg";

import authManyBook from "../../../../public/icon/authManyBook.svg";
import authPencil from "../../../../public/icon/authPencil.svg";
import authHat from "../../../../public/icon/authHat.svg";
import optRight from "../../../../public/icon/optRight.svg";
import logo from "../../../../public/icon/logoFull.svg";
import ConfirmOTPComponent from "../_component/ConfirmOTPComponent";

const OTPPage = () => {
  return (
    <div className="bg-white w-screen h-[100vh] relative">
      <div className="w-[650px] bg-white rounded-[40px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] py-[60px] px-[60px] shadow-sd text-center">
        <div className="w-[100%] h-[100px] flex justify-center mb-[20px]">
          <div className="w-[100px] h-[100px] rounded-xl">
            <Image src={secure} alt=""></Image>
          </div>
        </div>
        <div className="w-[100%] py-[7px] text-black">
          <h1 className="font-bold text-[28px]">Enter Verification Code</h1>
        </div>
        <p className="mt-[15px] mb-[25px] text-gray-400 text-[16px]">
          Please enter the OTP code send to your email
        </p>
        <Suspense fallback={"Loading suspense"}>
          <ConfirmOTPComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default OTPPage;
