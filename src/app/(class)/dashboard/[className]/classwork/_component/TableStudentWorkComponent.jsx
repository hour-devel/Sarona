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
import dot from "../../../../../../../public/dot1.svg";
import ViewExamResultFormComponent from "./ViewExamResultFormComponent";
import StudentExamFormComponent from "./StudentExamFormComponent";
import ViewFeedBackTaskComponent from "./ViewFeedBackTaskComponent";
import FormQuestionComponent from "./FormQuestionComponent";
import {
  getAllScoringByClassIdAction,
  getClassByIDAction,
  getSubjectBySubjectIdAction,
} from "@/action/classAction";
import LoadingSearch from "@/components/loading/LoadingSearch";

const TableStudentWorkComponent = ({
  classworkId,
  subjectId,
  classId,
  userExam,
  currentPage,
  itemsPerPage,
}) => {
  const [stuId, setStuId] = useState();
  const [open, setOpen] = useState(false); // open checking score
  const [openFeeBack, setOpenFeedBack] = useState();
  const [loading, setLoading] = useState(false);
  const [userScore, setUserScore] = useState();
  const [ansId, setAnsId] = useState();
  const [check, setCheck] = useState();

  const handleOpen = async (e) => {
    setStuId(e.currentTarget.getAttribute("data-id"));
    setAnsId(e.currentTarget.getAttribute("data-ansId"));
    setCheck(e.currentTarget.getAttribute("data-status"));
    console.log("check :",check);
    if (check) {
      setOpenFeedBack(true);
    } else {
      setOpen(true);
    }
  };
  const [openReturn, setOpenReturn] = useState();

  const getUserScore = async () => {
    setLoading(true);
    const userScoreData = await getAllScoringByClassIdAction(classId);
    console.log("userScoreData :", userScoreData);
    if (userScoreData?.statusCode == 200) {
      setUserScore(userScoreData);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserScore();
  }, []);

  const [subName, setSubName] = useState();
  const getSubjectExam = async () => {
    setLoading(true);
    const subjectExam = await getSubjectBySubjectIdAction(subjectId);
    if (subjectExam?.statusCode == 200) {
      setSubName(subjectExam?.payload?.subjectName);
      setLoading(false);
    }
  };
  useEffect(() => {
    getSubjectExam();
  }, []);

  const [className, setClassName] = useState();
  const getClassExam = async () => {
    setLoading(true);
    const classExam = await getClassByIDAction(classId);
    if (classExam?.statusCode == 200) {
      setClassName(classExam?.payload?.className);
      setLoading(false);
    }
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
      hour12: true, // Display hour in 12-hour format with AM/PM
    };
    const dateMoreEvent = handIn
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, " ");

    return dateMoreEvent;
  };

  console.log("userScore :", userScore);

  return (
    <div className="w-[100%]  h-[83%] float-left px-[100px] ">
      <div className="w-[100%] h-auto">
        {loading ? (
          <div className="mr-[20px] mt-[200px]">
            <LoadingSearch />
          </div>
        ) : (
          <Table
            removeWrapper
            hideScrollBar
            className="w-[100%] h-[100%] float-left"
            radius="sm"
          >
            <TableHeader>
              <TableColumn className="text-center px-5 text-[#2B2828] text-[16px] font-medium">
                No
              </TableColumn>
              <TableColumn className="text-left pl-[40px] text-[#2B2828] text-[16px] font-medium">
                Name
              </TableColumn>
              <TableColumn className="text-left text-[#2B2828] text-[16px] font-medium pl-20">
                Subject
              </TableColumn>
              <TableColumn className="text-left text-[#2B2828] text-[16px] font-medium pl-16">
                Class
              </TableColumn>
              <TableColumn className="text-left text-[#2B2828] text-[16px] font-medium pl-16">
                Hand In
              </TableColumn>
              <TableColumn className="text-left text-[#2B2828] text-[16px] font-medium">
                socres
              </TableColumn>
              <TableColumn className="text-center text-[#2B2828] text-[16px] font-medium">
                Status
              </TableColumn>
            </TableHeader>

            <TableBody>
              {userExam.map((e, i) => (
                <TableRow
                  key={i}
                  data-id={e?.submitBy?.userId}
                  data-ansId={e?.answerId}
                  data-status={e?.isCheck}
                  className="hover:bg-[#f4f4f6] transition-[0.5s] space-y-3 cursor-pointer"
                  onClick={(e) => handleOpen(e)}
                >
                  <TableCell className="text-center text-[16px] pr-6 text-inUseGray font-medium mt-5 ">
                    {(currentPage - 1) * itemsPerPage + i + 1}
                  </TableCell>
                  <TableCell className="text-left pl-[40px] flex items-center">
                    <Avatar
                      src={e?.submitBy?.profileUrl}
                      className="w-[35px] h-[35px] object-cover mb-2"
                    />
                    <p className="absolute left-[7%] text-[16px] mb-2 text-inUseGray font-medium">
                      {e?.submitBy?.firstName}-{e?.submitBy?.lastName}
                    </p>
                  </TableCell>
                  <TableCell className="text-left pl-20 text-inUseGray font-medium text-[16px]">
                    {subName}
                  </TableCell>
                  <TableCell className="text-left text-inUseGray font-medium pl-16 text-[16px]">
                    {className}
                  </TableCell>
                  <TableCell className="text-left pl-16  text-inUseGray font-medium text-[16px]">
                    {formatDate(e?.createdAt)}
                  </TableCell>
                  <TableCell className="text-left text-inUseGray font-medium text-[16px]">
                    {userScore?.payload?.map((scr) => {
                      if (e?.isCheck) {
                        if (e?.answerId === scr?.answer?.answerId) {
                          return scr?.score + "/" + e?.classwork?.totalScore;
                        }
                      } else {
                        return "__/" + e?.classwork?.totalScore;
                      }
                    })}
                  </TableCell>
                  <TableCell className="text-center font-medium text-[16px]">
                    {e.isCheck ? (
                      <span className="text-green-500">Checked</span>
                    ) : (
                      <span className="text-red-500">Not Yet</span>
                    )}
                  </TableCell>
                </TableRow>
                // //console.log("Login data user exam :", e);
              ))}
            </TableBody>
          </Table>
        )}
        {/* open if isCheck */}
        {openFeeBack && (
          <ViewFeedBackTaskComponent
            answerId={ansId}
            model={() => setOpenFeedBack(false)}
          />
        )}
        {/* open if not yet isCheck */}
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
