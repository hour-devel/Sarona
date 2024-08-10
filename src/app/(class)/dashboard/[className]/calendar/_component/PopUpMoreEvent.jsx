import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  ScrollShadow,
  DropdownSection,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import Image from "next/image";
import Calendar from "../../../../../../../public/icon/calendar.svg";
// import Cancel from "../../../../public/cancel.svg";
import circleBlue from "../../../../../../../public/icon/circleBlue.svg";
import dotCol from "../../../../../../../public/icon/dotCol.svg";
import edit from "../../../../../../../public/icon/Edit.svg";
import trash from "../../../../../../../public/icon/Trash.svg";
import CreateEventFormComponent from "./CreateEventFormComponent";
import DeleteEventForm from "../../../../_component/DeletePopUpForm";
import ConfirmForm from "../../../../_component/ConfirmPopUpForm";
import x from "../../../../../../../public/icon/x.svg";

export default function PopUpMoreEvent({
  dateMoreEvent,
  moreEvent,
  isOpenMoreEvent,
  x,
  y,
}) {
  // open edit event
  const [open1, setOpen1] = useState(false);
  // open delete event
  const [open2, setOpen2] = useState(false);
  // open confirm event
  const [open3, setOpen3] = useState(false);

  function handleDeletePopup(isOpen) {
    setOpen2(isOpen);
  }

  function handleConfirmPopup(isOpen) {
    setOpen2(false);
    setOpen3(isOpen);
  }

  return (
    <>
      {open1 && (
        <CreateEventFormComponent
          isOpenMoreEvent={isOpenMoreEvent}
          openCreateEventForm={() => setOpen1(false)}
        />
      )}
      {open2 && (
        <DeleteEventForm
          handleDeletePopup={handleDeletePopup}
          handleConfirmPopup={handleConfirmPopup}
        />
      )}

      {open3 && (
        <ConfirmForm
          isOpenMoreEvent={isOpenMoreEvent}
          handleConfirmPopup={handleConfirmPopup}
        />
      )}

      <Modal
        isOpen={true}
        onClose={isOpenMoreEvent}
        placement="top-center"
        backdrop="transparent"
        style={{
          position: "absolute",
          top: y - 120,
          left: x - 50,
          zIndex: "50",
        }}
      >
        <ModalContent className={`min-w-[230px] w-[230px] `}>
          <ModalHeader className="flex items-center px-[10px] h-[40px] py-0 border-b-1 relative">
            <Image
              src={Calendar}
              alt=""
              className="w-[17px] h-[17px] object-cover"
            ></Image>
            <p className="text-[14px] pl-2">{dateMoreEvent}</p>
            {/* <Image src={x} alt="" className="absolute z-50 right-[5px]"/> */}
            {/* <svg
              width="25"
              height="25"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-[5px]"
              onClick={isOpenMoreEvent}
            >
              <path
                d="M30 10L10 30"
                stroke="#757575"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 10L30 30"
                stroke="#757575"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg> */}
          </ModalHeader>
          <ModalBody className="px-[5px] gap-0">
            {moreEvent.allSegs.map((e) => (
              <div
                key={e.event.publicId}
                className="h-[40px] px-2 relative text-inUseGray hover:bg-blue-100 rounded-md flex items-center"
              >
                <Image
                  src={circleBlue}
                  className="w-[10px] h-[10px] object-cover"
                ></Image>
                <p className="text-[12px] line-clamp-1 ml-[10px]">
                  {e.event.title}
                </p>
                {/* <Dropdown className="text-start min-w-[120px]">
                  <DropdownTrigger className="bg-transparent">
                    <Button className="min-w-[20px] w-[36px] h-[36px] rounded-full py-0 px-0 text-inUseGray  absolute right-[5px] top-[50%] translate-y-[-50%] bg-white">
                      <Image src={dotCol} alt=""></Image>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new" onClick={() => setOpen1(true)} className="data-[hover=true]:bg-blue-200">
                      <Image src={edit} alt="" />{" "}
                      <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
                        Edit
                      </p>
                    </DropdownItem>
                    <DropdownItem key="copy" onClick={() => setOpen2(true)} className="data-[hover=true]:bg-blue-200">
                      <Image src={trash} alt="" />{" "}
                      <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
                        Delete
                      </p>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
