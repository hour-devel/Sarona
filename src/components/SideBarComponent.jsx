"use client";
import Image from "next/image";
import LogoFull from "../../public/icon/logoFull.svg";
import Logo from "../../public/icon/logo.svg";
import { usePathname } from "next/navigation";
import DropDownSettingComponent from "./DropDownSettingComponent";
import DropDownClassesComponent from "./DropDownClassesComponent";
import MainListComponent from "./MainListComponent";
import Link from "next/link";
import { getAllClassAction } from "@/action/classAction";
import { useEffect, useState } from "react";
import { getAllClassService } from "@/service/class/class.service";
import { revalidateTag } from "next/cache";
const SideBarComponent = ({ nav, classData }) => {
  const currentPath = usePathname();
  const segments = currentPath.split("/");
  const pathName = "/" + segments.pop("/");

  return (
    <div
      className="w-[16%] h-[100vh] overflow-x-scroll float-left border-r-2 transition-[0.5s] bg-white"
      id="sidebar"
      style={{ height: "screen" }}
    >
      {/* logo */}
      <div className="w-[100%] h-[80px] bg-white float-left relative">
        <Link href="/dashboard" className="w-[100%] h-[100%]">
          <p className="text-[#08b69b] text-[30px] italic w-[100%] h-[100%] absolute top-[50%] translate-y-[-50%] font-bold flex justify-center items-center pr-[40px]">
            {/* <Image
              src={LogoFull}
              className="2xl:w-[60%] 2xl:h-[40%] xl:w-[58%] xl:h-[30%]"
              id="logoFull"
            />
            <Image
              src={Logo}
              className="w-[45%] h-[45%] ml-[40px] hidden"
              id="logo"
            /> */}
            Cognito
          </p>
        </Link>
        <div className="w-[90%] h-[2px] bg-[#eeee] absolute bottom-0 left-[50%] translate-x-[-50%]"></div>
      </div>
      {/* main list */}
      <div
        className="w-[100%] bg-white h-auto px-[30px] bg-transparent float-left relative py-[20px] hover:text-[#000]"
        id="sideBarList"
      >
        <p className="ml-[10px]" id="headListSideBar">
          Main
        </p>
        <MainListComponent pathName={pathName} classData={classData} />
        <div className="w-[90%] h-[2px] bg-[#eeee] absolute bottom-0 left-[50%] translate-x-[-50%]"></div>
      </div>
      {/* classes */}
      {pathName == "/dashboard" ? (
        ""
      ) : pathName == "/user" ? (
        ""
      ) : (
        <div
          className="w-[100%] bg-white h-auto px-[30px] bg-transparent float-left relative py-[20px] hover:text-[#000]"
          id="sideBarList"
        >
          <p className="ml-[10px] mb-[10px]" id="headListSideBar">
            Classes
          </p>

          <DropDownClassesComponent pathName={pathName} classData={classData} />
          <div className="w-[90%] h-[2px] bg-[#eeee] absolute bottom-0 left-[50%] translate-x-[-50%]"></div>
        </div>
      )}
      {/* setting */}
      <div
        className="w-[100%] bg-white h-auto px-[30px] bg-transparent float-left relative py-[20px] hover:text-[#000]"
        id="sideBarList"
      >
        <p className="ml-[10px] mb-[10px]" id="headListSideBar">
          Setting
        </p>
        <DropDownSettingComponent pathName={pathName} />
      </div>
    </div>
  );
};

export default SideBarComponent;
