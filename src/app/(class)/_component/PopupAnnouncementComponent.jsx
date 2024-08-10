"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

const PopupAnnouncementComponent = () => {
  return (
    <div className="absolute top-[50%] translate-y-[-50%] right-[20px]">
      <Dropdown className="min-w-[120px]">
        <DropdownTrigger>
          <Button className="min-w-0 h-[20px] flex justify-end items-center right-0 text-[#757575] p-0 m-0 hover:bg-transparent bg-white">
            <i className="fa-regular fa-file-lines text-[#757575]"></i>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">Edit</DropdownItem>
          <DropdownItem key="copy">Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default PopupAnnouncementComponent;
