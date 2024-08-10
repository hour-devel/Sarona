import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import Image from "next/image";
import examIcon from "../../../../../../../public/icon/exam.svg";
import edit from "../../../../../../../public/icon/Edit.svg";
import trash from "../../../../../../../public/icon/Trash.svg";
import CreateEventFormComponent from "./CreateEventFormComponent";
import DeleteEventForm from "../../../../_component/DeletePopUpForm";
import ConfirmForm from "../../../../_component/ConfirmPopUpForm";


const UpComingExamCardComponent = ({ data }) => {
  // open edit event
  const [open1, setOpen1] = useState(false);
  // open delete event
  const [open2, setOpen2] = useState(false);
  // open confirm
  const [open3, setOpen3] = useState(false);

  function handleDeletePopup(isOpen) {
    setOpen2(isOpen);
  }

  function handleConfirmPopup(isOpen) {
    setOpen2(false);
    setOpen3(isOpen);
  }
  const date = new Date(data?.startDate);

  var formatDate = String(date).split(" ");
  return (
    <div className="w-[100%] mt-[10px] h-[70px] rounded-[12px] float-left relative border-2 overflow-hidden">
      <div className="w-[30%] h-[100%] float-left flex justify-center items-center">
        <div className="w-[9px] h-[100%] bg-[#ffd2c3] absolute left-0 top-0"></div>
        <div className="w-[42px] h-[42px] ml-[5px] rounded-[10px] bg-secondaryblur flex justify-center items-center">
          <Image src={examIcon} alt="" />
        </div>
      </div>
      <div className="w-[60%] h-[100%] pt-[2px] float-left">
        <h5 className="text-[14px] mt-[5px] text-black line-clamp-1">
          {data?.classworkTitle}
        </h5>
        <p className="text-[10px] line-clamp-1">{data?.instruction}</p>
        <p className="text-[10px] line-clamp-1">{formatDate[2]} {formatDate[1]} {formatDate[3]} {formatDate[0]}</p>
      </div>
      {open1 && (
        <CreateEventFormComponent header="Edit" openCreateEventForm={() => setOpen1(false)} />
      )}
      {open2 && (
        <DeleteEventForm
          handleDeletePopup={handleDeletePopup}
          handleConfirmPopup={handleConfirmPopup}
        />
      )}

      {open3 && <ConfirmForm handleConfirmPopup={handleConfirmPopup} />}
      <Dropdown className="text-start min-w-[120px]">
        <DropdownTrigger className="bg-white">
          <Button className="min-w-0 w-0 py-[16px] h-[15px] text-[#757575] hover:bg-inUseGray bg-transparent hover:text-white absolute top-[2px] right-[2px] rounded-[50%]">
            <i className="fa-solid fa-ellipsis"></i>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="new"
            className="relative hover:bg-transparent data-[hover=true]:bg-blue-200"
            onClick={() => setOpen1(true)}
          >
            <Image src={edit} alt="" />{" "}
            <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
              Edit
            </p>
          </DropdownItem>
          <DropdownItem
            key="copy"
            className="relative hover:bg-transparent data-[hover=true]:bg-blue-200"
            onClick={() => setOpen2(true)}
          >
            <Image src={trash} alt="" />{" "}
            <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
              Delete
            </p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UpComingExamCardComponent;
