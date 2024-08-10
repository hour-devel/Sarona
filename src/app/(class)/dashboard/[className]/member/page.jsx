import React from "react";
import MemberPageComponent from "./_component/MemberPage";
import { getAllMemberInClassAction } from "@/action/memberAction";
import { getClassByIDAction } from "@/action/classAction";

const MemberPage = async ({ params }) => {
  const classId = params?.className;
  const allMember = await getAllMemberInClassAction(classId);
  const classinfo = await getClassByIDAction(classId);
  console.log("AAAA: ",classinfo);
  return (
    <div className="w-[100%] h-[88%] float-left transition-[0.5s]" id="main">
      <MemberPageComponent classId={classId} allMember={allMember?.payload} classinfo={classinfo} />
    </div>
  );
};

export default MemberPage;
