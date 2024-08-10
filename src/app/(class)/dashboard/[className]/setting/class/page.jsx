import React from "react";
import SettingClassComponent from "../_component/SettingClassComponent";
import { getAllClassAction, getClassSettingAction, getUserByEmailAction } from "@/action/classAction";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getAllMemberInClassAction } from "@/action/memberAction";

const CLassSettingPage = async ({ params }) => {
  console.log("Params",params);
  const classSettingData = await getClassSettingAction(params?.className);
  const getAllClassData = await getAllClassAction();
  const user = await getServerSession(authOption);
  const userData = await getUserByEmailAction(user?.user?.email);


  return (
    <div>
      <SettingClassComponent
    
        classSettingData={classSettingData}
        getAllClassData={getAllClassData}
        userData={userData}
      />
    </div>
  ); 
}; 

export default CLassSettingPage; 
