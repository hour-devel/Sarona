"use client";
import React, { useState } from "react";
import {
  Button,
  useDisclosure,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ScrollShadow,
} from "@nextui-org/react";
import JoinClassComponet from "@/app/(class)/_component/JoinClassComponet";
import CreateClassComponent from "@/app/(class)/_component/CreateClassComponent";
import ClassCardComponent from "@/app/(class)/_component/ClassCardComponent";
import CreateComponent from "@/app/(class)/_component/CreateComponent";
import JoinComponent from "@/app/(class)/_component/JoinComponet";
import Image from "next/image";
import welcome from "../../public/icon/welcome.svg";

const DashBoardComponent = ({ data, status }) => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  function showModalCreateClass() {
    setOpen1(true);
  }
  function showModalJoinClass() {
    setOpen2(true);
  }

  const [dashboard, setDashboard] = useState(false);
  function handleJoinDashborad() {
    setDashboard(true);
  }
  return (
    <>
      {open1 && (
        <CreateClassComponent
          model={() => setOpen1(false)}
          handleJoinDashborad={handleJoinDashborad}
        />
      )}
      {open2 && (
        <JoinClassComponet
          model={() => setOpen2(false)}
          handleJoinDashborad={handleJoinDashborad}
        />
      )}
      {status?.length !== 0 ? (
        <div className="w-[100%] h-[100%] bg-white float-left ">
          <div className="w-[100%] h-[7%] float-left">
            <div className="w-[50%] h-[100%] float-left flex items-center">
              <h3 className="font-bold text-[20px] text-[#000] px-[30px]">
                Your Classes
              </h3>
            </div>

            {/* Dropdown */}
            <div className="w-[50%] h-[100%] float-left flex items-center justify-end px-[30px]">
              <Dropdown>
                <DropdownTrigger>
                  <Button className="border-0 h-[40px] bg-primary 2xl:w-[25%] xl:w-[30%] rounded-lg flex justify-center p-0 px-[10px] ml-[3px] text-[#fff]  hover:bg-[#D4D4D8] hover:text-[#000] relative">
                    <p id="sideBarList" className="w-[100%]">
                      <i className="fa-solid fa-plus"></i> &nbsp;
                      <span>Create Class</span>
                    </p>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="new"
                    onClick={showModalCreateClass}
                    className="data-[hover=true]:bg-blue-200"
                  >
                    Create Class
                  </DropdownItem>
                  <DropdownItem
                    key="new"
                    onClick={showModalJoinClass}
                    className="data-[hover=true]:bg-blue-200"
                  >
                    Join Class
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="w-[100%] h-[93%] float-left pt-[20px]">
            <ScrollShadow
              hideScrollBar
              className="w-[100%] h-[100%] px-[25px] overflow-y-scroll float-left grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 gap-5"
            >
              {data?.payload
                ?.filter((e) => e.status)
                .map((e, i) => (
                  <ClassCardComponent data={e} ind={i} key={e.classId} />
                ))}
            </ScrollShadow>
          </div>
        </div>
      ) : (
        <div className="w-[100%] h-[85%] float-left flex justify-center items-center">
          <div className="w-[400px] h-auto bg-white">
            <div className="w-[100%] h-[70%] float-left">
              <Image src={welcome} className="w-[100%] h-[100%]"></Image>
            </div>
            <div className="w-[100%] h-[30%] float-left px-[40px] py-[20px]">
              <div className="w-[100%] h-[40px] flex items-center justify-evenly mb-4">
                <p>Please add your class to get started.</p>
              </div>
              <div className="w-[100%] h-[40px] flex items-center justify-evenly">
                <Button
                  onClick={showModalCreateClass}
                  color="primary"
                  variant="bordered"
                  className="w-[120px] border-[#9e9e9e7a] border-[1.5px] text-[#757575]"
                >
                  Create Class
                </Button>
                <JoinComponent handleJoinDashborad={handleJoinDashborad} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoardComponent;
