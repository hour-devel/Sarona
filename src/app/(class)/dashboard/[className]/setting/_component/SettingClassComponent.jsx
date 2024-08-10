"use client";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profileVS from "../../../../../../../public/profileViewStyle.png";
import InputsComponent from "../../../setting/_component/InputComponent";

import { Snippet } from "@nextui-org/react";
import CardRestorComponent from "./CardRestorComponent";
import IconSetting from "../../../../../../../public/icon setting svg/Settings.svg";
import { SingleImageDropzone } from "@/app/(class)/_component/SingleImageDropzone";
import InputSettingComponent from "../../../setting/_component/TextAreaSettingComponent";
import { useForm } from "react-hook-form";
import {
  updateClassAction,
  updateClassSettingAction,
} from "@/action/classAction";
import { fileUploadAction } from "@/action/fileUpdateActions";
import toast, { Toaster } from "react-hot-toast";

const SettingClassComponent = ({
  classSettingData,
  getAllClassData,
  userData,
}) => {
  console.log("CLASS DATA: ", getAllClassData);
  console.log("Class setting", classSettingData);
  let borderLeft = "";
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathName = usePathname();
  {
    pathName == "/dashboard" ? (borderLeft = "") : (borderLeft = "border-l-2");
  }
  const [openLogout, setOpenLogout] = useState(false);
  const [profileUrl, setProfileUrl] = useState();

  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    // upload images
    const formData = new FormData();
    formData.append("file", profileUrl);
    const fileUploadImage = await fileUploadAction(formData);
    // upload
    const classId = classSettingData?.payload.classId; // class ID
    // add profile url into the data
    console.log("HellO: ", getAllClassData?.payload?.description);
    console.log("Data: ", data);
    console.log("alll: ", getAllClassData?.payload);
    const newClassData = {
      className: data.className || classSettingData?.payload?.className,
      description: data.description || classSettingData?.payload?.description,
      profileUrl:
        fileUploadImage?.payload?.fileUrl ||
        classSettingData?.payload.profileUrl,
    };
    console.log("All DATA", newClassData);

    const updateClassData = await updateClassAction(classId, newClassData);
    console.log(" New Data : ", newClassData);

    if (updateClassData?.statusCode == 200) {
      toast.success(updateClassData?.message);
    }
  }

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <div className="w-[100%] h-[100vh] overflow-hidden">
        <div className="w-[100%] h-[12%] float-left relative px-[40px] pt-[15px]">
          <div className="w-[100%] mt-[4%] h-[6%] flex justify-between">
            <div>
              <h1 className="flex items-center">
                <Image
                  src={IconSetting}
                  alt="not found"
                  className="2xl:w-[20px] 2xl:h-[20px] xl:w-[15px] xl:h-[15px]"
                />
                <p className="ml-3 xl:text-[14px]">Setting &gt; Class</p>
              </h1>
            </div>
            <div>
              <div className="w-[23%] h-[100%] absolute right-0 top-[20px] px-[20px] pr-[50px]">
                <div className="flex items-center py-[15px] w-[100%] relative">
                  <Dropdown className="shadow-[#387ADF_0px_0px_4px]">
                    <DropdownTrigger>
                      <Avatar
                        src={
                          !userData?.payload?.profileUrl
                            ? "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1718893823~exp=1718897423~hmac=04bfcf93def9e32528f59373d06f428f996dc22fea6ff5bd17f39593f870c224&w=740"
                            : userData?.payload?.profileUrl
                        }
                        className="2xl:h-[44px] 2xl:w-[44px] float-left xl:h-[40px] xl:w-[40px]"
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key="new"
                        className="w-[220px] h-auto py-[20px] hover:bg-white data-[hover=true]:bg-white"
                      >
                        <div className="w-[100%] h-[80px] float-left fixed left-0 top-0 overflow-hidden">
                          <Image
                            src={profileVS}
                            className="w-[100%] h-[100%] mb-[10px]"
                          ></Image>
                        </div>
                        <div className="w-[100%] h-[90px] float-left relative">
                          <div className="w-[80px] h-[80px] rounded-full overflow-hidden absolute left-[50%] translate-x-[-50%]">
                            <Avatar
                              src={
                                !userData?.payload?.profileUrl
                                  ? "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1718893823~exp=1718897423~hmac=04bfcf93def9e32528f59373d06f428f996dc22fea6ff5bd17f39593f870c224&w=740"
                                  : userData?.payload?.profileUrl
                              }
                              className="h-[100%] w-[100%] float-left"
                            />
                          </div>
                        </div>
                        <div className="w-[100%] h-[70px] float-left text-black mt-[10px] text-center">
                          <p className="2xl:text-[24px] xl:text-[20px] font-bold mb-[10px] capitalize">
                            {userData?.payload?.firstName}{" "}
                            {userData?.payload?.lastName}
                          </p>
                          <p> {userData?.payload?.email}</p>
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <div className="h-[60px] px-[20px] mr-[20px]">
                    <p className="m-0 p-0 text-[#757575] 2xl:text-[10px] xl:text-[8px] mt-[10px]">
                      {/* {getAllClassData?.payload?.isTeacher === true? "TEACHER" : "STUDENT"} */}
                      USER
                    </p>
                    <h2 className="m-0 p-0 text-[#000] font-semibold 2xl:text-[14px] xl:text-[12px]">
                      {userData?.payload?.firstName}{" "}
                      {userData?.payload?.lastName}
                    </h2>
                  </div>
                  <i
                    className="fa-solid fa-arrow-right-from-bracket text-inUseRed absolute right-0"
                    onClick={onOpen}
                  ></i>
                  <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1 justify-center items-center pt-[30px]">
                            <h2 className="text-[24px] text-inUseGray">
                              Log Out ?
                            </h2>
                          </ModalHeader>
                          <ModalBody className="flex justify-center items-center py-[20px]">
                            <p>Are you sure want to log out ?</p>
                          </ModalBody>
                          <ModalFooter className="flex justify-center pb-[30px]">
                            <Button
                              variant="flat"
                              onPress={onClose}
                              className="bg-white border-2 border-inUseGray text-inUseGray"
                            >
                              Cancel
                            </Button>
                            <Button
                              onPress={() => signOut()}
                              className="bg-inUseRed text-white"
                            >
                              Logout
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollShadow
          hideScrollBar
          className="w-[100%] h-[88%] 2xl:px-[200px] xl:px-[140px]"
        >
          <div className="mt-[8%]">
            <h1 className="text-[#387ADF] 2xl:text-[30px] xl:text-[28px] font-semibold">
              Class Details{" "}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-[5%] flex">
                <div className="w-[100px] h-[100px]">
                  <div className="w-[100%] h-[100%] rounded-[22.64px]  overflow-hidden float-left relative border-dashed border-1 border-primary bg-[#e3ecfb]">
                    <SingleImageDropzone
                      width={100}
                      height={100}
                      value={classSettingData?.payload?.profileUrl}
                      classSettingData={classSettingData}
                      onChange={(profileUrl) => {
                        setProfileUrl(profileUrl);
                      }}
                    ></SingleImageDropzone>

                    {profileUrl && (
                      <img
                        src={classSettingData?.payload?.profileUrl}
                        alt="Profile"
                        width={50}
                        height={50}
                        className="object-cover w-[100%] h-[100%]"
                        classSettingData={classSettingData}
                      />
                    )}
                  </div>
                </div>

                <div className="ml-10 mt-[40px] w-[1020px] flex-wrap">
                  <InputsComponent
                    value={classSettingData?.payload?.className}
                    valid={register}
                    classSettingData={classSettingData}
                  ></InputsComponent>
                </div>
              </div>
              <div className="mt-10 w-[1160px] flex-wrap">
                <InputSettingComponent
                  value={classSettingData?.payload?.description}
                  valid={register}
                  classSettingData={classSettingData}
                />
              </div>

              <div className="fixed right-[11%] bottom-[10%]">
                <Button className="mr-[7px] bg-white border-2 text-[#757575]">
                  Cancel
                </Button>
                <Button className="text-white bg-primary" type="submit">
                  save
                </Button>
              </div>
            </form>
          </div>
          <div className="mt-[8%]  h-[100%] px-[10px]">
            <h1 className="text-[#387ADF] 2xl:text-[30px] xl:text-[28px] font-semibold">
              General
            </h1>
            <div className="mt-8">
              <p className="text-black text-[16px] font-medium">
                Invitaion Code
              </p>
              <p className="text-inUseGray text-[14px] font-normal mt-1">
                For invitation code you can copy and sent you another member for
                join into your class.
              </p>
            </div>
            <div className=" mt-8 w-[290px] h-[106px] border-2 rounded-[12px]">
              <div className="flex justify-between  mt-[6px] px-2 cursor-pointer">
                <p className="p-1 mt-2 mr-1  text-inUseGray text-[16px]">
                  Teacher :{" "}
                </p>
                <Snippet
                  className=" bg-white text-[16px] text-inUseGray"
                  symbol=""
                >
                  {"Th-" + classSettingData?.payload?.classCode}
                </Snippet>
              </div>
              <div className="flex justify-between px-2 cursor-pointer ">
                <p className="p-1 mt-2 mr-1  text-inUseGray text-[16px]">
                  Student :{" "}
                </p>
                <Snippet
                  className="bg-white text-[16px] text-inUseGray"
                  symbol=""
                >
                  {"St-" + classSettingData?.payload?.classCode}
                </Snippet>
              </div>
            </div>
            <div className="mt-8 mb-10">
              <p className="text-black text-[16px] font-medium">
                Disable classes
              </p>
              <p className="text-inUseGray text-[14px] mt-1">
                You can restore the classes that you had to disable.
              </p>
            </div>

            <div className="w-[69%] h-auto grid grid-cols-3 gap-10">
              {getAllClassData.payload
                .filter((item) => item.status == false)
                .map((classData) => (
                  <CardRestorComponent
                    classSettingData={classSettingData.payload}
                    disableClass={classData}
                  />
                ))}
            </div>
          </div>
        </ScrollShadow>
      </div>
    </>
  );
};

export default SettingClassComponent;
