"use client";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AssignIcon from "../../../../../../../public/icon/assignment.svg";
import examIcon from "../../../../../../../public/icon/exam.svg";
import TableStudentWorkComponent from "./TableStudentWorkComponent";
import edit from "../../../../../../../public/icon/Edit.svg";
import trash from "../../../../../../../public/icon/Trash.svg";
import DeleteEventForm from "../../../../_component/DeletePopUpForm";
import DeletePopUpForm from "../../../../_component/DeletePopUpForm";
import ConfirmPopUpForm from "../../../../_component/ConfirmPopUpForm";
import ViewStudentWorkPopUpComponent from "./ViewStudentWorkPopUpComponent";
import toast, { Toaster } from "react-hot-toast";
import {
  deleteClassWorkAction,
  getAllMembersInClassAction,
  getAllUserExamAction,
  getClassWorkByIdActon,
  getSubjectBySubjectIdAction,
  getUserByEmailAction,
} from "@/action/classAction";
import CreateFormAssigmentComponent from "./CreateFormAssigmentComponent";
import CreateFormExaminationComponent from "./CreateFormExaminationComponent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoadingSearch from "@/components/loading/LoadingSearch";
import LoadingCode from "@/components/loading/LoadingCode";
import LoadingComponent from "@/app/(auth)/_component/LoadingComponent";
import LoadingOmelete from "@/components/loading/LoadingOmelete";
import LoadingUser from "@/components/loading/LoadingUser";
import LoadingClound from "@/components/loading/LoadingClound";

const TaskCardComponent = ({ userLoginId, data, subjectId, params }) => {
  const [openDelete, setOpenDelete] = useState();
  const [openConfirm, setOpenConfirm] = useState();
  const [role, setRole] = useState();
  const [userExam, setUserExam] = useState();
  const [subName, setSubName] = useState("");
  const [loading, setLoading] = useState(false);
  const [givenTimeStartDate, setGivenTimeStartDate] = useState(null);
  const [givenTimeDueDate, setGivenTimeDueDate] = useState(null);
  const [givenStart, setGivenStart] = useState(null);
  const [givenDue, setGivenDue] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [startDate, setStartDate] = useState(data?.startDate);
  const [dueDate, setDueDate] = useState(data?.dueDate);
  const [openStudentWorkPopup, setOpenStudentWorkPopup] = useState(false);
  const [isExam, setIsExam] = useState(true);
  const [answerData, setAnswerData] = useState();
  // state to  open task form
  const [openCreateFormAssignment, setOpenCreateFormAssignment] =
    useState(false);
  const [openCreateFromExamination, setOpenCreateFromExamination] =
    useState(false);

  function handleDeletePopup(isOpen) {
    setOpenDelete(isOpen);
  }

  const checkRole = async () => {
    const allUserInClass = await getAllMembersInClassAction(params);
    allUserInClass?.payload.map((user) => {
      if (userLoginId == user?.userId) {
        setRole(user?.isTeacher);
      }
    });
  };

  useEffect(() => {
    checkRole();
  }, []);

  // get user has been exam already
  const handleUsersExam = async () => {
    setLoading(true);
    const allUserExam = await getAllUserExamAction(data?.classworkId);
    console.log("allUserExam :", allUserExam);
    if (allUserExam?.statusCode == 200) {
      setUserExam(allUserExam?.payload);
    }
  };
  useEffect(() => {
    handleUsersExam();
  }, []);

  async function handleConfirmPopup(isOpen) {
    const deleteClassWork = await deleteClassWorkAction(data?.classworkId);
    if (deleteClassWork?.statusCode == 200) {
      setOpenDelete(false);
    }
    setOpenConfirm(isOpen);
  }

  const dateFormat = (due) => {
    const date = new Date(due);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const dateDue = date
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, " ");
    return dateDue;
  };

  // get subject by id
  const getSubjectName = async () => {
    setLoading(true);
    const dataSub = await getSubjectBySubjectIdAction(subjectId);
    if (dataSub?.statusCode == 200) {
      setLoading(false);
      setSubName(dataSub?.payload.subjectName);
    }
  };

  useEffect(() => {
    getSubjectName();
  }, []);

  // handle open edit
  function handleOpenEdit() {
    if (data?.isExamination) {
      setOpenCreateFromExamination(true);
    } else {
      setOpenCreateFormAssignment(true);
    }
  }

  const currentUrl = usePathname();

  // Checking if it full screen
  function getFullscreenElement() {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement
    );
  }
  function toggleFullScreen() {
    if (getFullscreenElement()) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch((e) => {
        //console.log(e);
      });
    }
  }

  useEffect(() => {
    async function findAnswerData() {
      const ansData = await getAllUserExamAction(data?.classworkId);
      setAnswerData(ansData);
    }
    findAnswerData();
  }, []);

  const checkIsExam = () => {
    const DateStart = new Date(startDate);
    const DateDue = new Date(dueDate);
    const formattedDateStart = `${DateStart.getFullYear()}-${(
      DateStart.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${DateStart.getDate().toString().padStart(2, "0")}`;
    setGivenStart(formattedDateStart);
    const formattedDateDue = `${DateDue.getFullYear()}-${(
      DateDue.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${DateDue.getDate().toString().padStart(2, "0")}`;
    setGivenDue(formattedDateDue);

    const givenStartDate = new Date(startDate);
    setGivenTimeStartDate(givenStartDate.toLocaleTimeString());
    const givernDueDate = new Date(dueDate);
    setGivenTimeDueDate(givernDueDate.toLocaleTimeString());

    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());
    const formattedCurrentDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
    setCurrentDate(formattedCurrentDate);

    // const interval = setInterval(() => {
    //   alert(1);
    //   const now = new Date();
    //   setCurrentTime(now.toLocaleTimeString());
    //   const formattedCurrentDate = `${now.getFullYear()}-${(now.getMonth() + 1)
    //     .toString()
    //     .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
    //   setCurrentDate(formattedCurrentDate);
    // }, 1000); // Update current time every second

    // return () => clearInterval(interval);
  };

  useEffect(() => {
    console.log("============================================");
    console.log("givenTimeStartDate :", givenTimeStartDate);
    console.log("givenTimeDueDate :", givenTimeDueDate);
    console.log("currentTime :", currentTime);
    console.log("============================================");
    console.log("currentDate :", currentDate);
    console.log("givenDueDate :", givenDue);
    console.log("givenStartDate :", givenStart);
    if (currentDate < givenStart) {
      toast("Can not exam on this date !!!", {
        style: {
          background: "orange",
          color: "#fff",
        },
      });
      // setUrl("#");
      return;
    } else if (currentDate > givenDue) {
      toast("Expired Date !!!", {
        style: {
          background: "orange",
          color: "#fff",
        },
      });
      // setUrl("#");
      return;
    } else {
      if (data?.isExamination) {
        if (givenTimeStartDate > currentTime) {
          toast("Can not exam on this time !!!", {
            style: {
              background: "orange",
              color: "#fff",
            },
          });
        } else if (givenTimeDueDate < currentTime) {
          console.log("============================================");
          console.log("givenTimeStartDate :", givenTimeStartDate);
          console.log("givenTimeDueDate :", givenTimeDueDate);
          console.log("currentTime :", currentTime);
          console.log("============================================");
          toast("Expired Time !!!", {
            style: {
              background: "orange",
              color: "#fff",
            },
          });
        } else {
          const hasSubmitted = answerData?.payload?.some(
            (data) => data?.submitBy?.userId === userLoginId
          );
          setIsExam(hasSubmitted);
          // setUrl(`${currentUrl}/${data?.classworkId}`);
          if (hasSubmitted) {
            toast("You've already taken this exam !!!", {
              style: {
                background: "orange",
                color: "#fff",
              },
            });
          }
        }
      } else {
        const hasSubmitted = answerData?.payload?.some(
          (data) => data?.submitBy?.userId === userLoginId
        );
        setIsExam(hasSubmitted);
        // setUrl(`${currentUrl}/${data?.classworkId}`);
        if (hasSubmitted) {
          toast("You've already taken this exam !!!", {
            style: {
              background: "orange",
              color: "#fff",
            },
          });
        }
      }
    }
  }, [
    currentTime,
    currentDate,
    givenTimeDueDate,
    givenTimeStartDate,
    givenDue,
    givenStart,
  ]);

  return (
    <div className="">
      {openCreateFormAssignment && (
        <CreateFormAssigmentComponent
          title="Edit"
          data={data}
          params={params}
          model={() => setOpenCreateFormAssignment(false)}
        />
      )}
      {openCreateFromExamination && (
        <CreateFormExaminationComponent
          title="Edit"
          data={data}
          params={params}
          model={() => setOpenCreateFromExamination(false)}
        />
      )}
      <div>
        <Toaster />
      </div>
      <div className="w-[100%] h-[87px] relative border-1 hover:shadow-sd hover:border-0 rounded-[20px] mt-[10px] overflow-hidden">
        <div
          className={`w-[9px] h-[100%] absolute left-0 top-0`}
          style={{
            backgroundColor: data?.isExamination ? "#FBA834" : "#387ADF",
          }}
        ></div>
        <Button
          variant="flat"
          onClick={(e) =>
            role ? setOpenStudentWorkPopup(true) : checkIsExam()
          }
          className="w-[95%] h-[100%] float-left bg-transparent flex justify-start px-[10px] z-10"
        >
          <Link
            href={
              role == false && isExam == false
                ? currentUrl + `/${data?.classworkId} `
                : "#"
            }
            className="w-[100%] h-[100%] bg-transparent flex justify-start items-center"
          >
            <div
              className={`w-[60px] h-[60px] ml-[10px] mr-[10px] rounded-2xl overflow-hidden flex justify-center items-center`}
              style={{
                backgroundColor: data?.isExamination ? "#FEE6C9" : "#CCDEF7",
              }}
            >
              <Image
                src={data?.isExamination ? examIcon : AssignIcon}
                className="h-[70%] w-[70%]"
                width={100}
                height={100}
                alt=""
              />
            </div>
            <div className="w-[60%] h-[80%] text-start text-inUseGray">
              <p className="text-[16px] font-medium  mt-[15px]">
                {data?.classworkTitle}
              </p>
              <span className="text-[10px]">
                Due {dateFormat(data?.dueDate)}
              </span>
              <span
                className={`px-[8px] py-[3px] ml-[10px] text-[10px] rounded-xl`}
                style={{
                  backgroundColor: data?.isExamination ? "#FEE6C9" : "#CCDEF7",
                  color: data?.isExamination ? "#FBA834" : "#387ADF",
                }}
              >
                {subName}
              </span>
            </div>
            <div className="w-[40%] h-[80%] relative flex item-center justify-end">
              {loading ? (
                // <div className="mr-[-20px] mt-[0]">
                <div className="mr-[20px] mt-[30px]">
                  <LoadingCode />
                </div>
              ) : (
                <AvatarGroup
                  isBordered
                  max={3}
                  total={userExam?.length < 3 ? 0 : userExam?.length - 3}
                  size="sm"
                  className="pr-[5px]"
                >
                  {userExam?.map((data) => (
                    <Avatar size="sm" src={data?.submitBy?.profileUrl} />
                  ))}
                </AvatarGroup>
              )}
            </div>
          </Link>
        </Button>

        {role && (
          <div className="w-[5%] h-[100%] float-left flex items-center">
            <div className="w-[100%] h-[50%] relative flex item-center justify-start">
              <Dropdown className="text-start min-w-[120px] mr-[20px] h-[40px] py-[15px]">
                <DropdownTrigger className="bg-white">
                  <Button className="min-w-0 w-0 py-[16px] h-[15px] text-[#757575] hover:bg-inUseGray bg-transparent hover:text-white absolute left-0 top-[50%] translate-y-[-50%] rounded-[50%]">
                    <i className="fa-solid fa-ellipsis text-[20px]"></i>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" className="py-[10px]">
                  {/* <DropdownItem
                    key="new"
                    className="relative hover:bg-transparent data-[hover=true]:bg-blue-200"
                    onClick={() => handleOpenEdit()}
                  >
                    <Image src={edit} alt="" />{" "}
                    <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
                      Edit
                    </p>
                  </DropdownItem> */}
                  <DropdownItem
                    key="copy"
                    className="relative hover:bg-transparent data-[hover=true]:bg-blue-200"
                    onClick={() => setOpenDelete(true)}
                  >
                    <Image src={trash} alt="" />{" "}
                    <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
                      Delete
                    </p>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            {openDelete && (
              <DeletePopUpForm
                handleDeletePopup={handleDeletePopup}
                handleConfirmPopup={handleConfirmPopup}
              />
            )}
            {openConfirm && (
              <ConfirmPopUpForm
                handleConfirmPopup={() => setOpenConfirm(false)}
              />
            )}
          </div>
        )}

        {/* showe on teacher side */}
        {openStudentWorkPopup && (
          <ViewStudentWorkPopUpComponent
            classworkId={data?.classworkId}
            classId={params}
            subjectId={data?.subjectId}
            userExam={userExam}
            examTitle={data?.classworkTitle}
            openStudentWorkPopup={() => setOpenStudentWorkPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskCardComponent;
