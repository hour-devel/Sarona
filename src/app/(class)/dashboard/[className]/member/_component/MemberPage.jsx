"use client";
import RightSideBarComponent from "@/components/RightSideBarComponent";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import InviteTeamMemberComponent from "./InviteTeamMemberComponent";
import SearchAndFilterComponent from "@/app/(class)/_component/SearchAndFilterComponent";
import TableMemberComponent from "./TableMemberComponent";
import PaginationComponent from "@/components/PaginationComponent";
import LoadingSearch from "../../../../../../components/loading/LoadingSearch";
import { getAllClassworkByClassIdAction } from "@/action/eventAction";
import {
  getAllMembersInClassAction,
  getUserByEmailAction,
} from "@/action/classAction";
import { getSession } from "next-auth/react";

const MemberPageComponent = ({ allMember, classId ,classinfo}) => {
  const currentPath = usePathname();
  const segments = currentPath.split("/");
  const pathName = "/" + segments.pop("/");
  const lastTwoSegment = segments.slice(-2);
  const classID = lastTwoSegment[1];
  //console.log("CLASSID", classID);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // Search and filter state
  const [roleFilter, setRoleFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;
  const totalPages = Math?.ceil((allMember?.length ?? 1) / itemsPerPage);
  // Func filter
  const handleRoleChange = (newRole) => {
    setRoleFilter(newRole);
  };
  // Func search
  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handlePageInput = (page) => {
    setCurrentPage(page);
  };

  const currentData = allMember?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  //fatching all classwork
  const [classwork, setClasswork] = useState();
  useEffect(() => {
    async function getAllClasswork() {
      const getAllClassworkInfo = await getAllClassworkByClassIdAction(classId);
      setClasswork(getAllClassworkInfo);
    }
    getAllClasswork();
  }, []);

  return (
    <div className="w-[100%] h-[88%] float-left transition-[0.5s]" id="main">
      <div className="w-[77%] h-[100%] float-left relative">
        {/* upcomming card */}
        <div className="w-[100%] h-[20%] relative float-left px-[30px]">
          <div className="w-[100%] h-[50%] flex items-center justify-between float-left">
            {/* Dropdown Invite Member*/}
            <div className="w-[20%] h-[100%] flex items-center float-left">
              <InviteTeamMemberComponent classId={classId} />
            </div>
            {/* search and filter assignment */}
            <div className="w-auto h-[28%] pr-[32px] absolute right-0 flex items-center">
              <div className="w-[393px] h-[40px]">
                <div className="w-[100%] h-[100%] float-left flex justify-end items-center">
                  <SearchAndFilterComponent
                    onSearchChange={handleSearchChange}
                    onFilterChange={handleRoleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* amount of member */}
          <div className="w-[100%] h-[50%] bg-white flex float-left mb-4">
            <div className="w-[80%] h-[25%] flex">
              <div className="mt-1.5 mr-3">
                <Image
                  src={"/public/icon/allMember.svg"}
                  width={0}
                  height={0}
                  alt="Team Member Icons"
                ></Image>
              </div>
              <div>
                <h3 className="font-bold 2xl:text-[24px] xl:text-[20px] text-[#000] w-[100%] float-left">
                  All Member
                </h3>
                <p className="text-secondary 2xl:text-[14px] xl:text-[12px] w-[100%] float-left">
                  {/* {member?.payload.length} Members */}
                  {allMember?.length} members
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* tabel user */}
        <div className="w-[100%] h-[80%] float-left px-[30px] mt-3">
          <div className="w-[100%] h-[95%]">
            {/* <Suspense fallback="loading."> */}
            <Suspense fallback={<LoadingSearch />}>
              <TableMemberComponent
                classID={classID}
                allMember={currentData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                roleFilter={roleFilter}
                searchTerm={searchTerm}
                classinfo ={classinfo}
              />
            </Suspense>
          </div>
        </div>
        {/* Pagiations */}
        <div className="absolute left-[50%] translate-x-[-50%] bottom-[-50px]">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onPageInput={handlePageInput}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <RightSideBarComponent upComingClasswork={classwork} />
    </div>
  );
};

export default MemberPageComponent;
