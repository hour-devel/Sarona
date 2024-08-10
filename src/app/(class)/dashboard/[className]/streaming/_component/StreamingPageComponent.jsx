"use client";
import React, { Suspense, useEffect, useState } from "react";
import RightSideBarComponent from "@/components/RightSideBarComponent";
import { usePathname } from "next/navigation";
import { Button, ScrollShadow } from "@nextui-org/react";
import FeedbackComponent from "@/app/(class)/_component/FeedbackComponent";
import StudentMarkComponent from "@/components/StudentMarkComponent";
import { getClassByIDAction } from "@/action/classAction";
import LoadingPage from "@/app/(auth)/loading";
import StreamingComponent from "./StreamingComponent";
import { getSession } from "next-auth/react";
import { getAllClassworkByClassIdAction } from "@/action/eventAction";
import LoadingSearch from "@/components/loading/LoadingSearch";

const StreamingPageComponent = ({
  classID,
  announceData,
  classData,
  userData,
  allClassData,
  memberInClass,
}) => {
  let borderLeft = "";
  const currentPath = usePathname();
  const segments = currentPath.split("/");
  const pathName = "/" + segments.pop("/");

  {
    pathName == "/dashboard" || "/calendar" || "setting"
      ? (borderLeft = "")
      : (borderLeft = "border-l-2");
  }
  const [isOpen, setOpenMark] = useState(false);
  const [role, setRole] = useState();

  const checkRole = async () => {
    memberInClass?.payload.map((user) => {
      if (userData?.payload?.userId == user?.userId) {
        setRole(user?.isTeacher);
      }
    });
  };
  useEffect(() => {
    checkRole();
  }, []);

  //  Start fatching classwork
  const [classwork, setClasswork] = useState();
  useEffect(() => {
    async function getAllClasswork() {
      const getAllClassworkInfo = await getAllClassworkByClassIdAction(classID);
      setClasswork(getAllClassworkInfo);
    }
    getAllClasswork();
  }, []);

  return (
    <div className="w-[100%] h-[100%] float-left">
      <ScrollShadow
        hideScrollBar
        className="w-[77%] h-[100%] overflow-y-scroll float-left relative grid grid-cols-1 pb-[20px]"
      >
        <div className="w-[100%] h-[12%] float-left relative px-[30px] pt-[15px]">
          <div className="w-[100%] h-auto">
            {pathName == "/dashboard" ? (
              <>
                <h1 className="font-bold text-primary text-[30px] capitalize">
                  Good Morning, {userData?.payload?.firstName}{" "}
                  {userData?.payload?.lastName}
                </h1>
                <p className="uppercase">Let's Check your class today.</p>
              </>
            ) : pathName == "/streaming" ? (
              <>
                <h1 className="font-bold text-primary 2xl:text-[30px] xl:text-[25px] uppercase">
                  {classData?.payload?.className} Class
                </h1>
                <p className="xl:text-[14px] uppercase">
                  {classData?.payload?.description}
                </p>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        {pathName != "/dashboard" ? (
          <>
            {!role && (
              <div className="absolute right-[50px] top-[15px]">
                <FeedbackComponent />
              </div>
            )}

            {role && (
              <Button
                className="p-[5px] bg-white hover:border-1 hover:bg-gray-200 absolute top-[15px] right-[30px] rounded-lg flex justify-center items-center"
                onClick={() => setOpenMark(true)}
              >
                <h1 className="text-primary 2xl:text-[16px] xl:text-[14px] font-bold p-[2px] boder-1">
                  Marks
                </h1>
              </Button>
            )}
            {isOpen && (
              <StudentMarkComponent onClose={() => setOpenMark(false)} />
            )}
          </>
        ) : (
          ""
        )}
        <div
          className="w-[100%] px-[30px] h-[88%] float-left transition-[0.5s]"
          id="main"
        >
          <StreamingComponent
            classID={classID}
            announceData={announceData}
            allClassData={allClassData}
            classData={classData}
            userData={userData}
            pathName={pathName}
            currentPath={currentPath}
            memberInClass={memberInClass}
            role={role}
            upComingClasswork={classwork}
          />
        </div>
      </ScrollShadow>
      <RightSideBarComponent
        userData={userData}
        upComingClasswork={classwork}
      />
    </div>
  );
};

export default StreamingPageComponent;
