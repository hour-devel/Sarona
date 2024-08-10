import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button, ScrollShadow } from "@nextui-org/react";
import React, { useState } from "react";
import CreateEventFormComponent from "./CreateEventFormComponent";
import DeleteEventForm from "../../../../_component/DeletePopUpForm";
import UpComingExamCardComponent from "./UpComingExamCardComponent";
import NoUpcomingExam from "../../../../../../../public/NoUpComingExam.png"
import Image from "next/image";

const UpCommingExamComponent = ({upcomingClasswork}) => {
  //Start fetch Data
  const currentDate = new Date();
  // //console.log("Date Filter: ", upcomingClasswork?.filter(item => item.isExamination==true && new Date(item.startDate)<= new Date().setDate(3) ))
  //End fetch Data
  const today = new Date();
  today.setHours(0,0,0,0);

  const threeDaysFromToday = new Date(today);
  threeDaysFromToday.setDate(today.getDate() + 3);

  var filterUpcomingExam = upcomingClasswork?.filter(item => {
    const itemDate = new Date(item.startDate)
    itemDate.setHours(0,0,0,0);
    return itemDate.getTime() >= today.getTime() && itemDate.getTime() <= threeDaysFromToday.getTime() ;
  } )

 

  return (
    <div className="w-[100%] h-[43%] mt-[7%] float-left border-2 rounded-xl overflow-hidden">
      <div className="w-[100%] h-[20%] float-left px-[10px]">
        <p className="mt-[5px] p-0 m-0">Upcomming Exam</p>
        <span className="text-[10px] text-secondary">{filterUpcomingExam?.length} Exams</span>
      </div>
      <div className="w-[100%] h-[80%] float-left overflow-y-auto px-[10px] pb-[20px]">
        {/* card examination */}
       {filterUpcomingExam?.length > 0 ? (
          filterUpcomingExam.map((e) => (
            <UpComingExamCardComponent data={e} key={e} />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* <Image src={NoUpcomingExam} alt="No upcoming exams" className="w-[65%] h-[65%] object-contain" /> */}
            <p className="text-sm text-gray-400">The upcoming schedule is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpCommingExamComponent;
