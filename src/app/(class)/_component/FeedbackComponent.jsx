import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  ScrollShadow,
  DropdownSection,
} from "@nextui-org/react";
import Image from "next/image";
import cancel from "../../../../public/cancel.svg";
import AssignIcon from "../../../../public/icon/assignment.svg";
import examIcon from "../../../../public/icon/exam.svg";
import choice from "../../../../public/feedback/choice.svg";
import outline from "../../../../public/feedback/outline.svg";
import feedBackIcon from "../../../../public/icon/feedback.svg";
import feedBackActive from "../../../../public/icon/feedbackActive.svg";
import ViewFeedBackTaskComponent from "../dashboard/[className]/classwork/_component/ViewFeedBackTaskComponent";

export default function FeedbackComponent({ mark, userLoginId }) {
  const martItrm = mark?.payload?.filter(
    (markData) => markData?.answer?.submitBy?.userId === userLoginId
  );
  const [openViewFeedBackTask, setOpenViewFeedBackTask] = useState(false);
  const [answerId, setAnswerId] = useState();

  const handleCheckedDate = (date) => {
    const currentDate = new Date();
    const checkDate = new Date();

    const checkedTime = new Date(currentDate.getTime() - checkDate.getTime());
    // Extract hours, minutes, and seconds from the date object
    const hours = checkedTime.getHours();
    const minutes = checkedTime.getMinutes();
    const seconds = checkedTime.getSeconds();

    // Format hours, minutes, and seconds to ensure they have two digits
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return timeString;
  };

  const handleOpenView = (id) => {
    setAnswerId(id);
    setOpenViewFeedBackTask(true);
  };

  {
    mark?.payload
      ?.filter((mark) => mark?.answer?.submitBy?.userId == userLoginId)
      .map((data, ind) => {
        //console.log("Data Loading :", data);
      });
  }

  return (
    <Dropdown>
      {openViewFeedBackTask && (
        <ViewFeedBackTaskComponent
          answerId={answerId}
          model={() => setOpenViewFeedBackTask(false)}
        />
      )}
      <DropdownTrigger>
        <Button className="text-white bg-transparent">
          <Image src={feedBackActive} alt="" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        className="w-[416px] p-0 h-[433px] overflow-y-scroll rounded-[15px]"
      >
        <DropdownItem
          // showDivider
          variant="light"
          className="sticky rounded-0 p-0 z-50 bg-white text-primary top-0 left-0 font-semibold text-[24px]"
        >
          <div className="flex justify-between p-0 h-[54px] mt-1 rounded-t-lg z-50 border-b-2 border-gray-400 ">
            <p className="mt-[15px] ml-[20px] font-bold text-[16px]">
              Feedback
            </p>
            <div className="mt-[5px] mr-[5px]">
              <Image src={cancel} alt=""></Image>
            </div>
          </div>
        </DropdownItem>
        {mark?.payload
          ?.filter((mark) => mark?.answer?.submitBy?.userId == userLoginId)
          ?.map((data, ind) => (
            <DropdownItem
              onClick={() => handleOpenView(data?.answer?.answerId)}
              key="copy"
              className="p-0 hover:bg-white hover:rounder-r-[20px] bg-white mt-3"
            >
              <div className="h-[87px] bg-white hover:bg-blue-100 flex items-center">
                <div
                  className="w-[60px] h-[60px] ml-5 rounded-[15px] flex justify-center items-center"
                  style={{
                    backgroundColor: data?.answer?.classwork?.isExamination
                      ? "#daf4f0"
                      : "#c9edff",
                  }}
                >
                  <Image
                    src={
                      data?.answer?.classwork?.isExamination
                        ? examIcon
                        : AssignIcon
                    }
                    className="h-[70%] w-[70%]"
                    width={100}
                    height={100}
                    alt=""
                  />
                </div>
                <div className=" px-5 mt-4">
                  <p className="text-[16px] text-inUseGray">
                    {data?.answer?.classwork?.classworkTitle}
                  </p>
                  <div className="flex">
                    {/* <p className="text-[10px] text-inUseGray py-3">
                      {handleCheckedDate(data?.checkingDate)}
                    </p> */}
                    <div
                      className="w-[57px] h-[19px] rounded-[10px] flex justify-center items-center mt-3"
                      style={{
                        backgroundColor: data?.answer?.classwork?.isExamination
                          ? "#daf4f0"
                          : "#c9edff",
                      }}
                    >
                      <p
                        className="text-[10px]"
                        style={{
                          color: data?.answer?.classwork?.isExamination
                            ? "#08b69b"
                            : "#00BFFF",
                        }}
                      >
                        Next Js
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
