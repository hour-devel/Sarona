"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import dot from "../../public/dot1.svg";
import {
  getClassByIDAction,
  getSubjectBySubjectIdAction,
} from "@/action/classAction";
import FormQuestionComponent from "@/app/(class)/dashboard/[className]/classwork/_component/FormQuestionComponent";
import ViewFeedBackTaskComponent from "@/app/(class)/dashboard/[className]/classwork/_component/ViewFeedBackTaskComponent";

const TableStudentWorkComponent = ({
  classworkId,
  subjectId,
  classId,
  currentPage,
  itemsPerPage,
  markData,
}) => {
  //console.log("Mark :", markData);

  const [stuId, setStuId] = useState();
  const [open, setOpen] = useState(false);
  const [openReturn, setOpenReturn] = useState();
  const [subName, setSubName] = useState();
  const [className, setClassName] = useState();

  const handleOpen = (e) => {
    setStuId(e.currentTarget.getAttribute("data-id"));
    setOpen(true);
  };

  //console.log("Student ID :", stuId);

  const getSubjectExam = async () => {
    const subjectExam = await getSubjectBySubjectIdAction(subjectId);
    setSubName(subjectExam?.payload?.subjectName);
  };
  useEffect(() => {
    getSubjectExam();
  }, []);

  const getClassExam = async () => {
    const classExam = await getClassByIDAction(classId);
    setClassName(classExam?.payload?.className);
  };
  useEffect(() => {
    getClassExam();
  }, []);

  const formatDate = (date) => {
    const handIn = new Date(date);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const dateMoreEvent = handIn
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, " ");

    return dateMoreEvent;
  };

  let uniqueId = [];
  let unique = [];
  let uniqStudentId = [];
  let uniqStudentData = [];

  markData?.forEach((element) => {
    if (!uniqueId.includes(element?.answer?.classwork?.classworkId)) {
      uniqueId.push(element?.answer?.classwork?.classworkId);
      unique.push(element);
    }
    if (!uniqStudentId.includes(element?.answer?.submitBy?.userId)) {
      uniqStudentId.push(element?.answer?.submitBy?.userId);
      uniqStudentData.push(element);
    }
  });
  unique.map((mark, index) => {
    console.log("unique score : ", mark?.score);
  });

  return (
    <div className="w-[90%] h-[83%] m-auto">
      <div className="w-[100%] h-auto">
        <Table removeWrapper hideScrollBar className="w-[100%] h-auto">
          <TableHeader>
            <TableColumn className="w-[5%] h-[52px] text-center text-[#2B2828] text-[16px] font-medium">
              No
            </TableColumn>
            <TableColumn className="w-[45%] h-[52px] pl-[6.5%]  text-left text-[#2B2828] text-[16px] font-medium">
              Name
            </TableColumn>
            {unique?.map((mark, index) => (
              <TableColumn
                key={index}
                className="w-[15%] h-[52px] text-left text-[#2B2828] text-[16px] font-medium "
              >
                {mark?.answer?.classwork?.classworkTitle}
              </TableColumn>
            ))}
            <TableColumn className=" w-[5%] text-center text-[#2B2828] text-[16px] font-medium">
              Action
            </TableColumn>
          </TableHeader>
          <TableBody>
            {uniqStudentData.map((data, index) => (
              <TableRow
                key={index}
                data-id={data?.answer?.submitBy?.userId}
                className="w-[100%] hover:bg-[#f4f4f6] h-[40px] transition-[0.5s]"
                onClick={(e) => handleOpen(e)}
              >
                <TableCell className="w-[5%]  text-center text-[16px] text-[#2B2828] pt-[25px] pb-[25px]">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell className="text-left pl-[40px] flex items-center mt-[10px]">
                  <Avatar
                    src={data?.answer?.submitBy?.profileUrl}
                    className="absolute w-[34px] h-[34px]"
                  />
                  <p className="absolute left-[7%] text-[16px] text-inUseGray font-medium">
                    {data?.answer?.submitBy?.firstName}{" "}
                    {data?.answer?.submitBy?.lastName}
                  </p>
                </TableCell>
                {unique.map((mark, index) => (
                  <TableCell key={index} className="text-[#2B2828] text-[16px]">
                    {mark?.score}
                    {/* Here, add the logic to display the score or any other relevant data */}
                  </TableCell>
                ))}
                <TableCell className="text-center text-inUseGray font-medium text-[16px] max-w-[40px]">
                  <Dropdown className="text-left min-w-[100px] h-[70px] absolute right-[-110px] top-[-30px]">
                    <DropdownTrigger className="bg-white">
                      <Button className="min-w-0 h-[10px] text-[#757575] px-[1px] py-[12px] bg-transparent hover:text-white">
                        <Image src={dot}></Image>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key="new"
                        onClick={() => setOpenReturn(true)}
                        className="data-[hover=true]:bg-blue-200"
                      >
                        Return
                      </DropdownItem>
                      <DropdownItem
                        key="copy"
                        className="data-[hover=true]:bg-blue-200"
                      >
                        Draft
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {open && (
          <FormQuestionComponent
            classworkId={classworkId}
            studentId={stuId}
            classId={classId}
            model={() => setOpen(false)}
          />
        )}
        {openReturn && (
          <ViewFeedBackTaskComponent model={() => setOpenReturn(false)} />
        )}
      </div>
    </div>
  );
};
export default TableStudentWorkComponent;
