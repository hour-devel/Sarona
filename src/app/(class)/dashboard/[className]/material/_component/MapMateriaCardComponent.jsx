"use client";
import React, { useState } from "react";
import Image from "next/image";
import IconMaterial from "../../../../../../../public/icon class materail svg/Material icon.svg";
import IconEdit from "../../../../../../../public/icon class materail svg/Edit.svg";
import IconDownload from "../../../../../../../public/icon class materail svg/Download.svg";
import IconTime from "../../../../../../../public/icon class materail svg/Time.svg";
import IconDelete from "../../../../../../../public/icon class materail svg/Delete Icon.svg";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import AreUSureToDeleteComponent from "./AreUSureToDeleteComponent";
import DeleteButtonComponent from "./DeleteButtonComponent";
import FormEditSubjectComponent from "./FormEditSubjectComponent";
import { deleteSubjectInAction } from "@/action/materialAction";

const MapMateriaCardComponent = ({
  material,
  handleEditFormMaterial,
  index,
  params,
  subjectData,
}) => {
  // console.log('subject data22222:',subjectData)
  // console.log('matrial id:',material?.payload?.materialId)
  const [isOpenPopupDelete, setIsOpenPopupDelete] = useState(false);
  const [isOpen, setOpen] = useState();

  const handleDeletePopup = (visible) => {
    setIsOpenPopupDelete(visible);
  };

  const handleDeleteSubject = async () => {
    const deleteSub = await deleteSubjectInAction(params, material?.subjectId);
    //console.log('delete sub:', deleteSub);
    return deleteSub;
  }
  const formatDateToDMY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  const formatTimeWithAMPM = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strTime = `${hours} : ${minutes} ${ampm}`;
    return strTime;
  };
  
  const getTimeOrFormattedDate = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - givenDate;
    const millisecondsIn24Hours = 24 * 60 * 60 * 1000;
  
    if (timeDifference <= millisecondsIn24Hours) {
      // Within the last 24 hours, return the time in HH:MM AM/PM format
      return formatTimeWithAMPM(givenDate);
    } else {
      // More than 24 hours ago, return the date in DD-MM-YYYY format
      return formatDateToDMY(dateString);
    }
  };


  return (
    <div
      className={`w-[100%] h-[77px] ${material.background} dark:shadow-dark-2lg hover:shadow-sd rounded-[20px] mt-[15px] mb-[5px] cursor-pointer overflow-hidden flex justify-between items-center pr-[10px]`}
      style={{ backgroundColor: index % 2 === 0 ? "#eff5ff" : "#feebd3b4" }}
    >
      <div className="w-[75%] h-[100%] flex items-center">
        <div
          className={`w-[1.2%] h-[100%] bg-[#387ADF]`}
          style={{ backgroundColor: index % 2 === 0 ? "#387ADF" : "#FBA834" }}
        ></div>
        <div className="w-[70%] h-[100%] ml-[2%] flex items-center">
          <div
            className={`w-[42px] h-[42px] bg-[#387ADF] rounded-[12px] flex items-center justify-center`}
            style={{ backgroundColor: index % 2 === 0 ? "#387ADF" : "#FBA834" }}
          >
            <Image
              src={IconMaterial}
              alt="Material Icon"
              className="text-white object-cover"
            />
          </div>
          <h1 className="text-[14px] font-semibold text-[#0000008d] ml-[20px]">
            {material?.subjectName}
          </h1>
        </div>
      </div>
      <div className="w-[14%] h-[100%]  flex ml-[10%] justify-around">
        <div className="w-[80%] h-[100%] flex justify-around items-center">
          <Image
            src={IconTime}
            alt="Time Icon"
            className="w-[24px] h-[24px] mt-[-2px] object-cover"
          />
          <p className=" text-[14px]">
          
            {getTimeOrFormattedDate(material?.createdAt)}
          </p>
        </div>
      </div>
      <Dropdown className="min-w-[120px]">
        <DropdownTrigger>
          <button className="outline-none rotate-90 text-[20px] font-bold tracking-widest">
            ...
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="edit"
            onClick={() => setOpen(true)}
            className="data-[hover=true]:bg-blue-200"
          >
            <div className="flex data-[hover=true]:bg-blue-200">
              <Image src={IconEdit} alt="Edit" />
              <p className="ml-[8px]">Edit</p>
            </div>
          </DropdownItem>
          <DropdownItem key="delete" className="data-[hover=true]:bg-blue-200">
            <button onClick={() => handleDeletePopup(true)}>
              <div className="flex">
                <Image src={IconDelete} /> <p className="ml-[8px]">Delete</p>
              </div>
            </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {isOpenPopupDelete && (
        <AreUSureToDeleteComponent
          params={params}
          handleDeletePopup={handleDeletePopup}
          // handleDeleteSubject={handleDeleteSubject}
          subjectId={material?.subjectId}
          handleDeleteSubject={handleDeleteSubject}
        />
      )}
      {isOpen && (
        <FormEditSubjectComponent
          subjectId={material?.subjectId}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default MapMateriaCardComponent;
