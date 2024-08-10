import React from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import InputComponent from "@/app/(auth)/_component/InputComponent";

const DropDownComponent = ({ model }) => {
  return (
    <Dropdown className="text-center absolute right-[5px] top-[50%] translate-y-[-50%]">
      <DropdownTrigger className="bg-white">
        <button className="min-w-0 h-[10px] flex justify-center items-center rounded-lg ml-[20px] text-[#757575] px-[11px] py-[12px] hover:bg-inUseGray bg-transparent hover:text-white absolute right-[5px] top-[50%] translate-y-[-50%]">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">Edit</DropdownItem>
        <DropdownItem key="copy">Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownComponent;
