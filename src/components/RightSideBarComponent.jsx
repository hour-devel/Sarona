"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Calendar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import profileViewStyle from "../../public/profileViewStyle.png";
import Image from "next/image";
import { getSession, signOut } from "next-auth/react";
import { identity } from "@fullcalendar/core/internal";
import LogOutComponent from "./LogOutComponent";
import { today, getLocalTimeZone } from "@internationalized/date";
import NoTask from "../../public/NoTask.png"
import {
  getAllMembersInClassAction,
  getUserByEmailAction,
} from "@/action/classAction";
const RightSideBarComponent = ({ upComingClasswork, userData }) => {
  const [openLogout, setOpenLogout] = useState(false);
  const pathName = usePathname();
  const segment = pathName.split("/");
  const lastSegment = "/" + segment.pop("/");
  const classId = segment[2];
  //console.log("ROLE", segment[2]);
  let height = "";
  if (lastSegment == "/streaming") {
    height = "100%";
  } else {
    height = "100%";
  }

  let borderLeft = "";
  let topCar = "10%";
  let topTask = "";
  {
    lastSegment == "/dashboard" || "/calendar" || "/setting"
      ? (borderLeft = "")
      : (borderLeft = "2px");

    lastSegment == "/streaming" ? (topCar = "10%") : (topCar = "-10px");
    lastSegment == "/streaming" ? (topTask = "52%") : (topTask = "46%");
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tmrTask = new Date(today);
  tmrTask.setDate(today.getDate() + 1);

  var filterTaskTmr = upComingClasswork?.filter((item) => {
    const itemDate = new Date(item.startDate);
    itemDate.setHours(0, 0, 0, 0);
    return (
      itemDate.getTime() > today.getTime() &&
      itemDate.getTime() <= tmrTask.getTime()
    );
  });
  var filterTaskToday = upComingClasswork?.filter((item) => {
    const itemDate = new Date(item.startDate);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate.getTime() == today.getTime();
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const [role, setRole] = useState();
  useEffect(() => {
    const checkRole = async () => {
      const users = await getSession();
      //console.log("USER", users);
      const userLoginId = await getUserByEmailAction(users?.user?.email);
      //console.log("MMM :", userLoginId);
      const allUserInClass = await getAllMembersInClassAction(classId);
      //console.log("ALL USER IN CLASS :", allUserInClass);
      allUserInClass?.payload.map((user) => {
        if (userLoginId?.payload?.userId == user?.userId) {
          setRole(user?.isTeacher);
        }
      });
    };
    checkRole();
  }, []);

  return (
    <div className={`w-[23%] h-[${height}] float-left relative border-l-2`}>
      {lastSegment == "/streaming" ? (
        <div
          className={`w-[100%] h-[20%] absolute right-0 top-0 px-[20px] pr-[30px]`}
          style={{
            borderLeft: borderLeft,
            borderLeft: borderLeft,
          }}
        >
          <div className="flex items-center py-[15px] w-[100%] relative">
            <Dropdown className="shadow-sd">
              <DropdownTrigger>
                <Avatar
                  src={userData?.payload?.profileUrl}
                  className="2xl:h-[44px] 2xl:w-[44px] float-left xl:h-[40px] xl:w-[40px] lg:w-[50px] lg:h-[32px]"
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
                        src={userData?.payload?.profileUrl}
                        className="h-[100%] w-[100%] float-left"
                      />
                    </div>
                  </div>
                  <div className="w-[100%] h-[70px] float-left text-black mt-[10px] text-center">
                    <p className="2xl:text-[24px] xl:text-[20px] font-bold mb-[10px] capitalize">
                      {userData?.payload?.firstName}{" "}
                      {userData?.payload?.lastName}
                    </p>
                    <p> {userData?.payload?.email}</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <div className="h-[60px] px-[20px] mr-[20px]">
              <p className="m-0 p-0 text-[#757575] 2xl:text-[10px] xl:text-[10px] lg:text-[9px] mt-[10px]">
                USER
              </p>
              <h2 className="m-0 p-0 text-[#000] font-bold 2xl:text-[14px] xl:text-[14px] lg:text-[12px] capitalize">
                {userData?.payload?.firstName} {userData?.payload?.lastName}
              </h2>
            </div>
            <i
              className="fa-solid fa-arrow-right-from-bracket text-inUseRed absolute right-0 2xl:text-[17px] xl:text-[12px]"
              onClick={() => setOpenLogout(true)}
            ></i>
            {openLogout && (
              <LogOutComponent onCloseLogout={() => setOpenLogout(false)} />
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <Calendar
        className={`2xl:h-[320px] 2xl:w-[90%] xl:w-[88%] lg:w-[86%] xl:h-[300px] absolute top-[${topCar}] mt-6 bg-white left-[50%] translate-x-[-50%] shadow-sd  text-center  `}
        // className={`h-[300px] bg-white left-[50%] translate-x-[-50%] shadow-sd`}
        style={{
          position: "absolute",
          top: topCar,
          position: "absolute",
          top: topCar,
        }}
        // value={today(getLocalTimeZone())}
        aria-label="Date (Show Month and Year Picker)"
      />
      <div
        className={`absolute w-full px-5`}
        style={{ top: topTask }}
      >
        {/* Task today */}
        {filterTaskToday && filterTaskToday.length > 0 ? (
          <>
            <div className="flex justify-between mt-12 mb-3">
              <p className="uppercase text-[13px] text-primary">Today</p>
              <p className="text-[12px] text-[#00BFFF]">
                {formatDate(new Date())}
              </p>
            </div>
            <div
              className={`${
                filterTaskToday && filterTaskToday.length > 2
                  ? "2xl:h-[31%] xl:h-[35%] overflow-y-auto overflow-hidden"
                  : ""
              }`}
            >
              {filterTaskToday.map((item) => (
                <div
                  key={item?.classworkId}
                  className="flex flex-col items-center mb-[10px] cursor-pointer"
                >
                  <div className="xl:w-[100%] xl:h-[58px] 2xl:h-[60px] 2xl:w-[100%] bg-white border border-gray-200 rounded-[12px] overflow-hidden flex justify-between">
                    <div className="w-full h-full flex">
                      <div
                        className="w-[9px] h-full"
                        style={{
                          backgroundColor: item?.isExamination
                            ? "#08b69b"
                            : "#00BFFF",
                          color: item?.isExamination ? "#08b69b" : "#00BFFF",
                        }}
                      ></div>
                      <div className="w-full h-full px-3 flex items-center">
                        <div className="w-full h-[35px]">
                          <h1 className="2xl:text-[14px] xl:text-[12px] text-black font-medium">
                            {item?.classworkTitle}
                          </h1>
                          <div className="w-full">
                            <p className="w-full text-[10px] text-[#757575] line-clamp-1">
                              {item?.instruction}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {/* {filterTaskTmr && filterTaskTmr.length > 0 ? (
          <>
            <div className="flex justify-between 2xl:mt-2 2xl:mb-3 xl:mt-3 xl:mb-4">
              <p className="uppercase text-[13px]">Tomorrow</p>
              <p className="text-[12px]">{formatDate(new Date(tmrTask))}</p>
            </div>
            <div
              className={`${
                filterTaskTmr && filterTaskTmr.length > 2
                  ? "2xl:h-[31%] xl:h-[35%] overflow-y-auto overflow-hidden"
                  : ""
              }`}
            >
              {filterTaskTmr.map((task) => (
                <div
                  key={task?.classworkId}
                  className="flex flex-col items-center cursor-pointer mb-[10px]"
                >
                  <div className="xl:w-[100%] xl:h-[58px] 2xl:h-[60px] 2xl:w-[100%] bg-white border border-gray-200 rounded-[12px] overflow-hidden flex justify-between">
                    <div className="w-full h-full flex">
                      <div
                        className="w-[9px] h-full"
                        style={{
                          backgroundColor: task?.isExamination
                            ? "#FEE6C9"
                            : "#CCDEF7",
                          color: task?.isExamination ? "#FBA834" : "#387ADF",
                        }}
                      ></div>
                      <div className="w-full h-full px-3 flex items-center">
                        <div className="w-full h-[35px]" style={{
                            color: task?.isExamination ? "#FBA834" : "#387ADF",
                          }}>
                          <h1 className="t2xl:text-[14px] xl:text-[12px] font-medium" >
                            {task?.classworkTitle}
                          </h1>
                          <div className="w-full">
                            <p className="w-full text-[10px] text-[#757575] line-clamp-1">
                              {task?.instruction}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null} */}

        {(!filterTaskToday || filterTaskToday.length === 0) &&
          (!filterTaskTmr || filterTaskTmr.length === 0) && (
            <div className="mt-10">
            {/* Insert your image here or any other message */}
            <Image src={NoTask} className="w-[30%] h-auto mx-auto"></Image>
            <p className="text-center 2xl:text-lg xl:text-sm text-gray-500">No task is available</p>
          </div>
          )}
      </div>
    </div>
  );
};

export default RightSideBarComponent;
