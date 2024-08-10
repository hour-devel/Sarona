import RightSideBarComponent from "@/components/RightSideBarComponent";
import React, { Suspense } from "react";
import { ScrollShadow } from "@nextui-org/react";
import TaskCardComponent from "@/app/(class)/dashboard/[className]/classwork/_component/TaskCardComponent";
import CreateTaskComponent from "./_component/CreateTaskComponent";
import SearchAndFilterComponent from "@/app/(class)/_component/SearchAndFilterComponent";
import {
  getAllClassWorkService,
  getSubjectBySubjectId,
} from "@/service/class/classWork/classwork.service";
import LoadingPage from "@/app/(auth)/loading";
import {
  getAllMembersInClassAction,
  getUserByEmailAction,
} from "@/action/classAction";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import LoadingSearch from "@/components/loading/LoadingSearch";
import ClassworkCompoennt from "./_component/ClassworkComponent";
import { getAllClassworkByClassIdAction } from "@/action/eventAction";

const ClassworkPage = async ({ modal, params }) => {
  // const [roleFilter, setRoleFilter] = useState("All");
  // const [searchTerm, setSearchTerm] = useState("");
  const classID = params?.className;
  const userData = await getServerSession(authOption);
  const userLoginId = await getUserByEmailAction(userData?.user?.email);

  const classWorkData = await getAllClassWorkService(params.className);
  const status = classWorkData?.statusCode;
  const classwork = await getAllClassworkByClassIdAction(classID);
  return (
    <div className="w-[100%] h-[88%] float-left transition-[0.5s]" id="main">
      <Suspense fallback={<LoadingSearch />}>
        <ClassworkCompoennt
          params={params}
          userLoginId={userLoginId}
          classWorkData={classWorkData}
          status={status}
        />
      </Suspense>
      <RightSideBarComponent upComingClasswork={classwork}/>
    </div>
  );
};

export default ClassworkPage;
