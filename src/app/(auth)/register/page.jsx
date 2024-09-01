import React from "react";
import Image from "next/image";
import register_img from "../../../../public/register.png";
import authManyBook from "../../../../public/icon/authManyBook.svg";
import authBag from "../../../../public/icon/authBag.svg";
import authHat from "../../../../public/icon/authHat.svg";
import authSingleBook from "../../../../public/icon/authSingleBook.svg";
import logo from "../../../../public/icon/logoFull.svg";
import toast, { Toaster } from "react-hot-toast";
import RegisterComponent from "../_component/RegisterComponent";

const RegisterPage = () => {
  return (
    <div className="bg-white w-screen h-[100vh] relative">
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>

      <div className="w-[75%] h-auto absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
        <div className="xl:w-[50%] 2xl:w-[45%] xl:ml-[10%] 2xl:ml-[15%] h-[100%] float-left shadow-sd p-[20px] rounded-[39px] w-[390px] ml-[-12%]">
          <div className=" flex">
            <Image src={logo} alt="" className="2xl:w-[0px] 2xl:h-[0px] xl:w-[0px] xl:h-[0px] "></Image>
          </div>
          <div className="w-[100%] py-[7px]  ">
            <h1 className="font-bold 2xl:text-[32px]  text-[#08b69b] xl:text-[26px] mt-[3%]">
              REGISTRATION
            </h1>
            <p className="2xl:text-[14px] text-black pt-2 2xl:pb-2 xl:pb-3 xl:text-[13px] text-[12px]">
              Create an account and get start with
              <span className="text-[#08b69b]"> Cognito</span>
            </p>
            {/* Form Register */}
            <section>
              <RegisterComponent />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
