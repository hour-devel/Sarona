import React from "react";
import Image from "next/image";
import login_img from "../../../../public/loginImg.png";
import LoginComponent from "@/app/(auth)/_component/LoginComponent";
import logo from "../../../../public/icon/logoFull.svg";

const LoginPage = async () => {
  return (
    <div className="bg-white w-screen h-[100vh] relative">
      <div className="px-4 flex">
        <Image src={logo} alt="" className="2xl:w-[120px] 2xl:h-[70px] xl:w-[120px] xl:h-[70px] w-0"></Image>
      </div>
      <div className="2xl:w-[480px] 2xl:h-[360px] xl:w-[480px] xl:h-[360px] lg:w-[480px] lg:h-[360px] w-[0%] h-[0%]   rounded-[50%] absolute top-[50%] translate-y-[-50%] xl:left-[10%] 2xl:left-[23%]">
        <div className="w-[100%] h-[100%] relative">
          <Image
            src={login_img}
            alt=""
            className="absolute left-[50%] bottom-[-8%] translate-x-[-40%] h-[140%]"
          ></Image>
        </div>
      </div>
      <LoginComponent />
    </div>
  );
};

export default LoginPage;
