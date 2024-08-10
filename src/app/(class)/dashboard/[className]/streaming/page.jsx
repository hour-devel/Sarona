import React, { Suspense } from "react";
import StreamingPageComponent from "./_component/StreamingPageComponent";
import {
  getAllClassAction,
  getAllMembersInClassAction,
  getClassByIDAction,
  getUserByEmailAction,
} from "@/action/classAction";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getAllAnnouncementActionByClassId } from "@/action/streamingAction";

const StreamingPage = async ({ params }) => {
  //class id
  const classID = params?.className;
  // get all announce
  const announceData = await getAllAnnouncementActionByClassId(classID);
  //get class by id
  const classData = await getClassByIDAction(classID);

  //get all class
  const allClassData = await getAllClassAction();

  const memberInClass = await getAllMembersInClassAction(classID);

  // const getAllClassworkInfo = await getAllClassworkByClassIdAction(classID);

  const user = await getServerSession(authOption);
  const userData = await getUserByEmailAction(user?.user?.email);

  return (
    <>
      <StreamingPageComponent
        classID={classID}
        announceData={announceData}
        classData={classData}
        allClassData={allClassData}
        memberInClass={memberInClass}
        // upComingClasswork={classwork}
        userData={userData}
      />
    </>
  );
};

export default StreamingPage;
