import React from "react";
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
import Calendar from "../../../../../../../public/calendar.svg";
// import Cancel from "../../../../public/cancel.svg";
// import o from "../../../../../../../public/o.svg";
// import dot from "../../../../../../../public/dot.svg";
 

export default function DropdownCalendarComponent() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="text-white bg-primary">
          Save
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        className="w-[234px] h-[182px] overflow-y-scroll rounded-[15px]"
      >
          <DropdownItem showDivider variant="light" className="sticky p-0 z-50 bg-white text-inUseGray top-0 left-0 font-semibold text-[24px]">
            <div className="flex px-1 items-center h-[41px] z-50">
                <Image src={Calendar}  className="w-[17px] h-[17px] object-cover"></Image>
              <p className="text-[14px] pl-2">Sunday , March 13</p>
            </div>
          </DropdownItem>
        <DropdownItem key="copy" className="p-0 z-10">
          <div className="h-[41px] px-2 bg-white text-inUseGray justify-between hover:bg-blue-100 flex items-center">
            <Image
                src={o}
                className="w-[10px] h-[10px] object-cover"
              ></Image>
              <p className="text-[14px] mr-20">Java Exam</p>
              <Image src={dot} className="w-[30px] h-[30px] object-cover"></Image>
          </div>
        </DropdownItem>
        <DropdownItem key="copy" className="p-0 z-10">
          <div className="h-[41px] px-2 bg-white text-inUseGray justify-between hover:bg-blue-100 flex items-center">
            <Image
                src={o}
                className="w-[10px] h-[10px] object-cover"
              ></Image>
              <p className="text-[14px] mr-16">Spring Exam</p>
              <Image src={dot} className="w-[30px] h-[30px] object-cover"></Image>
          </div>
        </DropdownItem>
        <DropdownItem key="copy" className="p-0 z-10">
          <div className="h-[41px] px-2 bg-white text-inUseGray justify-between hover:bg-blue-100 flex items-center">
            <Image
                src={o}
                className="w-[10px] h-[10px] object-cover"
              ></Image>
              <p className="text-[14px] truncate">Spring Homework002</p>
              <Image src={dot} className="w-[30px] h-[30px] object-cover"></Image>
          </div>
        </DropdownItem>
        <DropdownItem key="copy" className="p-0 z-10">
          <div className="h-[41px] px-2 bg-white text-inUseGray justify-between hover:bg-blue-100 flex items-center">
            <Image
                src={o}
                className="w-[10px] h-[10px] object-cover"
              ></Image>
              <p className="text-[14px] truncate">Spring Homework002</p>
              <Image src={dot} className="w-[30px] h-[30px] object-cover"></Image>
          </div>
        </DropdownItem>
        <DropdownItem key="copy" className="p-0 z-10">
          <div className="h-[41px] px-2 bg-white text-inUseGray justify-between hover:bg-blue-100 flex items-center">
            <Image
                src={o}
                className="w-[10px] h-[10px] object-cover"
              ></Image>
              <p className="text-[14px] truncate">Spring Homework002</p>
              <Image src={dot} className="w-[30px] h-[30px] object-cover"></Image>
          </div>
        </DropdownItem>
         
      
      </DropdownMenu>
    </Dropdown>
  );
}
