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
            <h1 className="text-[#08b69b] 2xl:text-[30px] xl:text-[28px] font-semibold">
              Class Details{" "}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-[5%] flex">
                <div className="w-[100px] h-[100px]">
                  <div className="w-[100px] h-[100%] rounded-[22.64px] flex justify-center items-center  overflow-hidden float-left relative border-dashed border-1 border-primary bg-[#e3ecfb]">
                    {/* <SingleImageDropzone
                      width={100}
                      height={100}
                      value={classSettingData?.payload?.profileUrl}
                      classSettingData={classSettingData}
                      onChange={(profileUrl) => {
                        setProfileUrl(profileUrl);
                      }}
                    ></SingleImageDropzone> */}

                    {/* {profileUrl && ( */}
                      {/* <Image
                        src={classSettingData?.payload?.profileUrl}
                        alt="Profile"
                        width={50}
                        height={50}
                        className="object-cover w-[100%] h-[100%]"
                        classSettingData={classSettingData}
                      /> */}
                    {/* )} */}
                    <svg width="100" height="100" className="text-[24px]" viewBox="0 0 29 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_4900_1124)">
                        <path d="M7.29712 17.8706V27.1942H14.9822L13.3795 25.2498H8.89986V19.8151L7.29712 17.8706Z" fill="#387ADF"/>
                        <path d="M28.0287 32.3384L25.7288 29.5092V32.0564H3.29049V28.0217H4.89323V26.4661H3.29049V20.0009H4.89323V18.4453H3.29049V12.2231H4.89323V10.6675H3.29049V5.2328L16.0643 20.6425V17.9009L3.0581 2.19946C2.94601 2.06235 2.8028 1.96884 2.64674 1.93086C2.49068 1.89287 2.32882 1.91214 2.18182 1.98619C2.03481 2.06024 1.90931 2.18572 1.82132 2.34665C1.73333 2.50757 1.68683 2.69663 1.68776 2.88974V33.0286C1.68776 33.2865 1.77219 33.5338 1.92247 33.7161C2.07276 33.8984 2.27659 34.0009 2.48913 34.0009H27.4598C27.6189 34.002 27.7748 33.9456 27.9074 33.8388C28.0401 33.7321 28.1435 33.5798 28.2045 33.4015C28.2656 33.2231 28.2814 33.0267 28.2501 32.8374C28.2188 32.6481 28.1417 32.4743 28.0287 32.3384Z" fill="#387ADF"/>
                        <path d="M19.3178 30.1118H22.5233C22.9484 30.1118 23.356 29.907 23.6566 29.5423C23.9572 29.1777 24.126 28.6831 24.126 28.1674V9.40351L22.2829 5.29101C22.1403 4.99139 21.9345 4.74334 21.6866 4.57244C21.4386 4.40154 21.1576 4.31398 20.8725 4.31879C20.5809 4.3216 20.2955 4.42086 20.0469 4.60588C19.7984 4.7909 19.5962 5.05468 19.4621 5.36879L17.7151 9.42296V28.1674C17.7151 28.6831 17.8839 29.1777 18.1845 29.5423C18.4851 29.907 18.8928 30.1118 19.3178 30.1118ZM19.3178 9.88963L20.8725 6.22435L22.5233 9.89935V24.2785H19.3178V9.88963ZM19.3178 25.8632H22.5233V28.2355H19.3178V25.8632Z" fill="#387ADF"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_4900_1124" className="text-[24px]">
                        <rect width="100" height="100" fill="white" transform="translate(0.0847168 0.945312)"/>
                        </clipPath>
                        </defs>
                    </svg>
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
            <h1 className="text-[#08b69b] 2xl:text-[30px] xl:text-[28px] font-semibold">
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
