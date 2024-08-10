"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import CreateFormAssigmentComponent from "./CreateFormAssigmentComponent";
import CreateFormExaminationComponent from "./CreateFormExaminationComponent";
import { getAllMembersInClassAction } from "@/action/classAction";
import LoadingCode from "@/components/loading/LoadingCode";

const CreateTaskComponent = ({ params }) => {
  // OPEN ASSIGNMENT
  const [openCreateFormAssignment, setOpenCreateFormAssignment] =
    useState(false);
  function showModalAssignment() {
    setOpenCreateFormAssignment(true);
  }
  // OPEN EXAMINATION
  const [openCreateFromExamination, setOpenCreateFromExamination] =
    useState(false);
  function showModalExam() {
    setOpenCreateFromExamination(true);
  }
  return (
    <>
      {openCreateFormAssignment && (
        <CreateFormAssigmentComponent
          title="Create"
          params={params}
          model={() => setOpenCreateFormAssignment(false)}
        />
      )}
      {openCreateFromExamination && (
        <CreateFormExaminationComponent
          title="Create"
          params={params}
          model={() => setOpenCreateFromExamination(false)}
        />
      )}
      <div className="w-[15%] h-[100%] float-left flex justify-start items-center absolute left-[30px]">
        <Dropdown>
          <DropdownTrigger>
            <Button className="border-0 2xl:h-[36.25px] xl:h-[35px] bg-primary 2xl:w-[125.85px] xl:w-[105px] rounded-xl flex justify-center px-[10px] text-[#fff] hover:bg-[#D4D4D8] hover:text-[#000] relative font-medium">
              <p
                id="sideBarList"
                className="w-[100%] flex justify-center items-center"
              >
                <i className="fa-solid fa-plus p-0 m-0"></i> &nbsp;
                <span className="ml-[10px]">Assign</span>
              </p>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" className="py-[10px]">
            <DropdownItem
              key="new"
              className="data-[hover=true]:bg-blue-200"
              onClick={() => showModalAssignment()}
            >
              <i className="fa-regular fa-file-lines mr-[15px] text-primary"></i>{" "}
              Assigment
            </DropdownItem>
            <DropdownItem
              key="new"
              className="data-[hover=true]:bg-blue-200"
              onClick={() => showModalExam()}
            >
              <i className="fa-solid fa-file-pen mr-[10px] text-secondary"></i>{" "}
              Examination
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default CreateTaskComponent;
