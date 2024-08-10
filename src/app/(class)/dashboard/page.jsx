import React from "react";
import DashBoardComponent from "@/components/DashBoardComponent";
import { getAllClassAction } from "@/action/classAction";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
const DashBoardPage = async () => {
  const data = await getAllClassAction();
  return (
    <div
      className="w-[100%] h-[85%] bg-white float-left transition-[0.5s]"
      id="main"
    >
      <DashBoardComponent
        data={data}
        status={data?.payload?.filter((s) => s.status === true)}
      />
    </div>
  );
};

export default DashBoardPage;
