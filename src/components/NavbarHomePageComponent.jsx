"use client";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profileViewStyle from "../../public/profileViewStyle.png";
import StudentMarkComponent from "./StudentMarkComponent";
import FeedbackComponent from "@/app/(class)/_component/FeedbackComponent";
import LogOutComponent from "./LogOutComponent";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import {
  getAllMembersInClassAction,
  getAllScoringByClassIdAction,
  getUserByEmailAction,
} from "@/action/classAction";

const NavbarHomePageComponent = ({ role, mark }) => {
  //console.log("Mark From Navbar :",mark);
  let border_Left;
  const [openLogout, setOpenLogout] = useState(false);
  const currentPath = usePathname();
  const segments = currentPath.split("/");
  const pathName = "/" + segments.pop("/");
  const lastTwoSegment = segments.slice(-2);

  const [isOpen, setOpenMark] = useState(false);
  const [greeting, setGreeting] = useState();
  const [userInfo, setUserInfo] = useState();

  {
    pathName == "/dashboard"
      ? ""
      : pathName == "/calendar"
      ? ""
      : (border_Left = "2px solid #eee");
  }
  useEffect(() => {
    async function getUserInfo() {
      const userData = await getSession();
      const e = userData?.user?.email;
      const user = await getUserByEmailAction(e);
      setUserInfo(user);
    }
    getUserInfo();

    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  // useEffect(()=>{
  //   const handleMark = async () => {
  //     const classId = "0b33d3ff-4ba1-48c8-9537-fc1383e189b6";
  //     const allMark = await getAllScoringByClassIdAction(classId);
  //     //console.log("allMark",allMark);
  //     setMark(allMark)
  //   }
  //   handleMark()
  // },[])

  return (
    <div className="w-[100%] h-[12%] float-left relative px-[30px] pt-[15px] capitalize">
      <div className="w-[77%] h-auto relative">
        {pathName == "/dashboard" ? (
          <>
            <h1 className="font-bold text-primary 2xl:text-[30px] xl:text-[25px]  lg:text-[22px] capitalize">
              {greeting}, {userInfo?.payload?.firstName}{" "}
              {userInfo?.payload?.lastName}!
            </h1>
            <p className="2xl:text-[16px] xl:text-[14px] lg:text-[12px] uppercase">
              Let's Check your class today.
            </p>
          </>
        ) : pathName == "/member" ? (
          <>
            <h1 className="font-bold text-primary 2xl:text-[30px] xl:text-[25px]">
              MEMBERS
            </h1>
            <p className="xl:text-[14px] uppercase">
              View member info in your class
            </p>
          </>
        ) : pathName == "/calendar" ? (
          <>
            <h1 className="font-bold text-primary 2xl:text-[30px] xl:text-[25px]">
              CALENDAR
            </h1>
            <p className="xl:text-[14px] uppercase">
              Hello, Let check your calendar
            </p>
          </>
        ) : pathName == "/material" ? (
          <>
            <h1 className="font-bold text-primary 2xl:text-[30px] xl:text-[25px]">
              MATERIAL
            </h1>
            <p className="xl:text-[14px] uppercase">
              Upload your document here
            </p>
          </>
        ) : pathName == "/streaming" ? (
          <>
            <h1 className="font-bold text-primary 2xl:text-[30px] xl:text-[25px]">
              {lastTwoSegment[0]} CLASS
            </h1>
            <p className="xl:text-[14px] uppercase">Class Description..</p>
          </>
        ) : pathName == "/classwork" ? (
          <>
            <h1 className="font-bold text-primary 2xl:text-[30px] xl:text-[25px] lg:text-[22px]">
              CLASSWORK
            </h1>
            <p className="2xl:text-[15px] xl:text-[13px] lg:text-[12px] uppercase">
              Let's check your classwork today
            </p>
          </>
        ) : pathName == "/subject" ? (
          <>
            <h1 className="font-bold text-primary 2xl:text-[30px] xl:text-[25px] lg:text-[22px]">
              SUBJECT
            </h1>
            <p className="2xl:text-[15px] xl:text-[13px] lg:text-[12px] uppercase">
              Create Subject To Assign Material !
            </p>
          </>
        ) : (
          ""
        )}

        {pathName != "/dashboard" ? (
          <>
            {/* show on student side */}

            {!role && (
              <div className="absolute right-[0px] top-[15px]">
                {/* <div className="absolute right-[0] top-[15px]"> */}
                <FeedbackComponent
                  mark={mark}
                  userLoginId={userInfo?.payload?.userId}
                />
              </div>
            )}

            {/* show on teacher side */}
            {/* {role && (
              <Button
                className="p-[5px] bg-white hover:border-1 hover:bg-gray-200 absolute top-[15px] right-[12px] rounded-lg flex justify-center items-center"
                onClick={() => setOpenMark(true)}
              >
                <h1 className="text-primary 2xl:text-[16px] xl:text-[14px] font-bold p-[2px] boder-1">
                  Marks
                </h1>
              </Button>
            )} */}
            {isOpen && (
              <StudentMarkComponent
                mark={mark}
                onClose={() => setOpenMark(false)}
              />
            )}
          </>
        ) : (
          ""
        )}
      </div>
      {/* profile right side not include in streaming */}
      <div
        className={`2xl:w-[23%] h-[100%] xl:w-[23%] absolute  right-0 top-0 px-[20px] pr-[30px]`}
        style={{
          borderLeft: border_Left,
        }}
      >
        <div className="flex items-center py-[15px] w-[100%] relative">
          <Dropdown className="shadow-sd">
            <DropdownTrigger>
              <Avatar
                src={userInfo?.payload?.profileUrl}
                className="2xl:h-[44px] 2xl:w-[44px] float-left xl:h-[40px] xl:w-[40px]"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="new"
                className="w-[220px] h-auto py-[20px] hover:bg-white data-[hover=true]:bg-white"
              >
                <div className="w-[100%] h-[80px] float-left fixed left-0 top-0 overflow-hidden">
                  <Image
                    src={profileViewStyle}
                    className="w-[100%] h-[100%] mb-[10px]"
                  ></Image>
                </div>
                <div className="w-[100%] h-[90px] float-left relative">
                  <div className="w-[80px] h-[80px] rounded-full overflow-hidden absolute left-[50%] translate-x-[-50%]">
                    <Avatar
                      src={userInfo?.payload?.profileUrl}
                      className="h-[100%] w-[100%] float-left"
                    />
                  </div>
                </div>
                <div className="w-[100%] h-[70px] float-left text-black mt-[10px] text-center">
                  <p className="2xl:text-[24px] xl:text-[20px] font-bold mb-[10px] capitalize">
                    {userInfo?.payload?.firstName} {userInfo?.payload?.lastName}
                  </p>
                  <p>{userInfo?.payload?.email}</p>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <div className="h-[60px] px-[20px] mr-[20px]">
            <p className="m-0 p-0 text-[#757575] 2xl:text-[10px] xl:text-[10px] mt-[10px]">
              USER
            </p>
            <h2 className="m-0 p-0 text-[#000] font-bold 2xl:text-[14px] xl:text-[14px]">
              {userInfo?.payload?.firstName} {userInfo?.payload?.lastName}
            </h2>
          </div>
          <i
            className="fa-solid fa-arrow-right-from-bracket cursor-pointer text-inUseRed absolute right-0 2xl:text-[17px] xl:text-[12px]"
            onClick={() => setOpenLogout(true)}
          ></i>
          {openLogout && (
            <LogOutComponent onCloseLogout={() => setOpenLogout(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarHomePageComponent;
