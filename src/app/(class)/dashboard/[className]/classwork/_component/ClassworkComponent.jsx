"use client";
import React, { Suspense, useEffect, useState } from "react";
import CreateTaskComponent from "./CreateTaskComponent";
import { ScrollShadow } from "@nextui-org/react";
import LoadingSearch from "@/components/loading/LoadingSearch";
import TaskCardComponent from "./TaskCardComponent";
import SearchAndFilterComponent from "@/app/(class)/_component/SearchAndFilterComponent";
import LoadingOmelete from "@/components/loading/LoadingOmelete";
import LoadingCode from "@/components/loading/LoadingCode";
import emptyAnnoun from "../../../../../../../public/empty.png";
import {
  getAllMembersInClassAction,
  getAllUserExamAction,
} from "@/action/classAction";
import Image from "next/image";

const ClassworkComponent = ({ params, userLoginId, classWorkData, status }) => {
  const [roleFilter, setRoleFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();

  const checkRole = async () => {
    setLoading(true);
    const allUserInClass = await getAllMembersInClassAction(params.className);
    //console.log("allUserInClass", userLoginId);
    if (allUserInClass?.statusCode == 201) {
      allUserInClass?.payload.map((user) => {
        if (userLoginId?.payload?.userId == user?.userId) {
          setRole(user?.isTeacher);
        }
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    checkRole();
  }, []);

  const getLoading = () => {
    setLoading(true);
    if (status == 200) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLoading();
  }, []);

  // Func filter
  const handleRoleChange = (newRole) => {
    setRoleFilter(newRole);
  };
  // Func search
  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const filterTask = (data) => {
    const taskTitle = `${data?.classworkTitle}`
      .replace(/\s+/g, "")
      .toLowerCase();
    const searchLower = searchTerm?.replace(/\s+/g, "").toLowerCase();
    const matchesSearch = taskTitle?.includes(searchLower);

    const matchesRole =
      roleFilter === "All" ||
      (roleFilter === "Examination" && data.isExamination) ||
      (roleFilter === "Assignment" && !data.isExamination);

    return matchesRole && matchesSearch;
  };

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return (
    <div className="w-[77%] h-[100%] float-left">
      <div
        className={`w-[100%] h-[8%] float-left px-[30px] relative flex items-center justify-end`}
      >
        {/* add assign */}
        {role ? (
          loading ? (
            <div className="mr-[450px] mt-[25px]">
              <LoadingCode />
            </div>
          ) : (
            <CreateTaskComponent params={params.className} />
          )
        ) : (
          ""
        )}
        {/* search and filter assignment */}
        <div className="w-[393px] h-[40px]">
          {/* <SearchAndFilterComponent/> */}
          <SearchAndFilterComponent
            onSearchChange={handleSearchChange}
            onFilterChange={handleRoleChange}
          />
        </div>
      </div>
      {/* task card */}
      <div className="w-[100%] h-[92%] float-left">
        {loading ? (
          <div className="ml-10 mt-[260px]">
            <LoadingSearch />
          </div>
        ) : classWorkData?.payload?.length > 0 ? (
          <ScrollShadow
            hideScrollBar
            className="w-[100%] h-[95%] px-[30px] overflow-y-scroll float-left pb-[30px]"
          >
            {classWorkData?.payload?.filter(filterTask).map(
              (data, index) =>
                data && (
                  // (new Date(data?.startDate).getTime() >= currentDate.getTime() && new Date(data?.dueDate).getTime() >= currentDate.getTime() ? (
                  <TaskCardComponent
                    userLoginId={userLoginId?.payload?.userId}
                    data={data}
                    key={index}
                    subjectId={data?.subjectId}
                    params={params.className}
                  />
                )
              // ) : (
              //   ""
              // ))
            )}
          </ScrollShadow>
        ) : (
          <div className="mt-[20%]">
            <Image src={emptyAnnoun} className="w-[15%] h-[15%] mx-auto" />
            <p className="text-center text-lg text-gray-500">
              {role
                ? "There are no assignments or tasks planned for today."
                : "Currently, no classwork to complete."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassworkComponent;
