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
      <div className="px-4 flex">
        <Image src={logo} alt="" className="2xl:w-[120px] 2xl:h-[70px] xl:w-[120px] xl:h-[70px] w-0"></Image>
      </div>

      <Image
        src={authManyBook}
        alt=""
        className="absolute left-0 bottom-0 2xl:w-auto xl:w-auto w-0"
      />
      <Image
        src={authBag}
        alt=""
        className="absolute 2xl:left-[10%] xl:left-[8%] 2xl:bottom-[25%] xl:bottom-[33%] xl:w-[10%] 2xl:w-[8%] w-0"
      />
      <Image
        src={authHat}
        alt=""
        className="absolute left-[17%] 2xl:bottom-[5%] xl:bottom-[8%] xl:w-[16%] w-0"
      />
      <Image
        src={authSingleBook}
        alt=""
        className="absolute left-[35%] 2xl:bottom-[16%] xl:bottom-[23%] xl:w-[13%] w-0"
      />

      <div className="w-[75%] h-auto absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="xl:w-[40%] 2xl:w-[35%] float-left flex justify-center items-center w-0">
          <Image src={register_img} alt="" />
        </div>
        <div className="xl:w-[50%] 2xl:w-[45%] xl:ml-[10%] 2xl:ml-[15%] h-[100%] float-left shadow-sd p-[20px] rounded-[39px] w-[390px] ml-[-12%]">
          <div className=" flex">
            <Image src={logo} alt="" className="2xl:w-[0px] 2xl:h-[0px] xl:w-[0px] xl:h-[0px] "></Image>
          </div>
          <div className="w-[100%] py-[7px]  ">
            <h1 className="font-bold 2xl:text-[32px]  text-[#387adf] xl:text-[26px] mt-[3%]">
              REGISTRATION
            </h1>
            <p className="2xl:text-[14px] text-black pt-2 2xl:pb-2 xl:pb-3 xl:text-[13px] text-[12px]">
              Create an account and get start with
              <span className="text-[#387adf]"> ClassSphere</span>
            </p>
            {/* Form Register */}
            <section>
              <RegisterComponent />
            </section>
            {/* {openRegisterSuccess && (
              <RegisterSuccessComponent
                model={() => setOpenRegisterSuccess(false)}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
