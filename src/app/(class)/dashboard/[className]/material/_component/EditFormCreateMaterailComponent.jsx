"use client";
import {
  Button,
  // Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import IconAddInstructor from "../../../../../../../public/icon class materail svg/Add Lesson Title.svg";
import IconDelete from "../../../../../../../public/icon class materail svg/Delete Icon.svg";
import IconMicroPowerPoint from "../../../../../../../public/icon class materail svg/PowerPoint.svg";
import FormLinkUploadFileComponent from "./FormLinkUploadFileComponent";
import IconLink from "../../../../../../../public/icon class materail svg/Upload Link.svg";
import IconDownload from "../../../../../../../public/icon class materail svg/Upload file.svg";
import IconWord from "../../../../../../../public/icon class materail svg/Word.svg";
import IconExcel from "../../../../../../../public/icon class materail svg/Excel.svg";
import IconPowerPoint from "../../../../../../../public/icon class materail svg/PowerPoint.svg";

import SelectSubjectComponent from "./SelectSubjectComponent";
import SelectClassToAsignComponent from "./SelectClassToAsignComponent";
import { useForm } from "react-hook-form";
import InputComponent from "@/app/(auth)/_component/InputComponent";
import { deleteMaterialByIdAction, editMaterialByMaterialAndSubjectIdAction, getAllMaterialsBySubjectIdAction, insertMaterialBySubjectIdAction } from "@/action/materialAction";
import toast from "react-hot-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { findElements } from "@fullcalendar/core/internal";
import { insertMaterialBySubjectIdService } from "@/service/class/material/material.service";


const FormEditMaterialComponent = ({ handleEditFormMaterial, materialId, subjectData, params, onClose, subId }) => {
  console.log('subject data isv vvv:', subjectData);
  console.log('materil id ddddddd:', materialId)
  console.log('')
  const { register, handleSubmit } = useForm();
  const [isOpenLinkUpload, setOpenUploadLink] = useState(false);
  const [classId, setClassId] = useState([]);
  // const [subjectId, setSubjectId] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [links, setLinks] = useState();

  const [file, setFile] = useState();
  const { edgestore } = useEdgeStore();
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    console.log("url after upload : ", urls);
  }, [urls]);

  useEffect(() => {
    console.log('link upload is:', links);
  })
  console.log('subject id data', subjectData)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  async function handleUploadFile() {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });
      setUrls({
        url: res.url,
        thumbnailUrl: res.thumbnailUrl,
      });
      console.log(res.url);
    }
  }

  // handle submit modal create material 
  const onSubmit = async (data) => {
    const bodyEditMaterial = {
      materialTitle: data.materialTitle,
      description: data.description,
      materialLinks: [links],
      fileUrl: [urls],
      classId: [...classId]
    }
    console.log('Edit data material:', bodyEditMaterial);
    console.log('url edit:', urls)
    console.log('link edit:', links)
    if (!urls) {
      toast.success('You uploaded a file so you can post it');
      return;
    }
    try {
      const updateMaterial = await editMaterialByMaterialAndSubjectIdAction(materialId, subjectData, bodyEditMaterial);
      console.log('update material:', updateMaterial)
      if (updateMaterial?.statusCode === 200) {
        toast.success(updateMaterial?.message);
        onClose();
      }
    } catch (error) {
      console.error('Error creating material:', error);
      toast.error('An error occurred while creating the material');
    }
  }

  // const getFileColor = (url) => {
  //   switch (url) {
  //     case "pptx":
  //       return "#ff906b88";
  //     case "xlsx":
  //       return "#00800030";
  //     case "docx":
  //       return "#C3E0FA";
  //     case "pdf":
  //       return "#FF0000";
  //     case "link":
  //       return "#C3E0FA";
  //     default:
  //       return "#000000";
  //   }
  // };

  const handleClose = () => {
    setIsOpen(false);
    // onClose();
  };
  // handle class ID
  const handleClassID = (assignClassId) => {
    setClassId(assignClassId);
  };
  const [materialData, setMaterialData] = useState([]);
  useEffect(() => {
    async function getAllMaterialData(subjectData) {
      const material = await getAllMaterialsBySubjectIdAction(subjectData);
      console.log('matrial edit is:', material)
      setMaterialData(material);
    }
    getAllMaterialData(subjectData);
  }, [subjectData]);

  const [deleteMaterialId, setDeleteMaterialId] = useState();
  useEffect(() => {
    async function deleteMatrialData(materailId) {
      const deleteMaterial = await deleteMaterialByIdAction(materailId);
      console.log('delete material is:', materailId);
      setDeleteMaterialId(deleteMaterial);
    }
    deleteMatrialData();
  }, [])

  const handleDelete = async (materialId) => {
    const deleteMaterial = await deleteMaterialByIdAction(materialId);
    console.log('delete material id:', deleteMaterial)
    setDeleteMaterialId(deleteMaterial);
  };

  return (
    <div>
      <Modal isOpen={true} isDismissable={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent className="max-w-[63%] h-[600px] pb-[5%]">
            <ModalHeader className=" m-auto mt-[25px] text-[25px] text-primary">
              Edit Material
            </ModalHeader>
            <ModalBody className="w-[100%] h-[80%] ">
              <div className="w-[100%] h-[100%] flex justify-between">
                <div className="w-[66%] h-[100%] flex ">
                  {/* components right  */}
                  <div className="w-[100%] h-[100%]  border-r-2 border-gray-200 pl-[12px]">
                    {/* title  */}
                    <div className="w-[95.5%] h-[80px] mb-[21px]">
                      <div>
                        <label
                          htmlFor="title-subject"
                          className="block text-[14px] font-medium text-gray-700 mb-[7px]"
                        >
                          Title*
                        </label>
                        <InputComponent
                          name="materialTitle" valid={register}
                          label={
                            <div className="text-[#757575] opacity-60 font-[24px] flex">
                              <Image
                                src={IconAddInstructor}
                                alt="not found"
                                className="w-[20px] h-[20px]"
                              />{" "}
                              &nbsp;
                              <p className="pl-[8px] text-[14px]">Enter material subject</p>
                            </div>
                          }
                        />
                      </div>
                    </div>
                    {/* select option  */}
                    <div className="w-[95.5%] h-[80px] mb-[21px]  flex justify-between">
                      <div className="w-[100%] h-[60px]">
                        <label
                          htmlFor="title-subject"
                          className="block text-[14px] font-medium text-gray-700 mb-[7px]"
                        >
                          Asign to class*
                        </label>
                        <SelectClassToAsignComponent
                          handleClassID={handleClassID}
                        />
                      </div>
                    </div>
                    {/* add instructor  */}
                    <div className="w-[95.5%] h-[80px] mb-[21px]">
                      <div className="">
                        <label
                          htmlFor="title-subject"
                          className="block text-[14px] font-medium text-gray-700 mb-[7px]"
                        >
                          Add Instruction*
                        </label>
                        <InputComponent
                          name="description" valid={register}
                          label={
                            <div className="text-[#757575] opacity-60 font-[24px] flex">
                              <Image
                                src={IconAddInstructor}
                                alt="not found"
                                className="w-[20px] h-[20px]"
                              />{" "}
                              &nbsp;
                              <p className="pl-[8px] text-[14px]">Enter instruction</p>
                            </div>
                          }
                        />
                      </div>
                    </div>
                    {/* upload file  */}
                    <div className="w-[95.5%] h-[80px]  mb-[21px] flex justify-between ">
                      <div className="w-[48%] h-[56px] relative">
                        <label
                          htmlFor="title-subject"
                          className="block text-[14px] font-medium text-gray-700 mb-[7px]"
                        >
                          Upload file*
                        </label>
                        <div
                          className="w-[100%] h-[100%] border-2  hover:shadow-sd hover:border-none border-gray-200 rounded-[12px] bg-white text-justify hover:bg-gray-100 pl-[16px] cursor-pointer flex items-center relative overflow-hidden"
                        >
                          <Image
                            src={IconDownload}
                            className="w-[15px] h-[18px]"
                          />
                          <div className="ml-[10px] flex ">
                            <u className="text-primary mr-[6px] text-[15px]">
                              Click here
                            </u>
                            <p className="text-[15px]">to upload file</p>
                          </div>
                          <input
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            id="images"
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0])}
                          />
                        </div>
                        <button
                          className="w-[28px] h-[28px] rounded-full mt-[10px] bg-primary text-white text-[16px]  absolute top-[32px] right-[15px] hover:bg-[#0000ffbd]"
                          onClick={async () => {
                            if (file) {
                              try {
                                const res = await edgestore.publicFiles.upload({ file });
                                setUrls(res.url);
                                console.log('File upload response:', res);
                              } catch (error) {
                                console.error('Error uploading file:', error);
                                toast.error('File upload failed');
                              }
                            } else {
                              toast.error('No file choose');
                            }
                          }}
                        >
                          <p className="mt-[3px]">+</p>
                        </button>
                      </div>
                      <div className="w-[48%] h-[56px]">
                        <label
                          htmlFor="title-subject"
                          className="block text-[14px] font-medium text-gray-700 mb-[7px]"
                        >
                          Upload as Link*
                        </label>
                        <Input
                          type="text"
                          value={links}
                          onChange={(e) => setLinks(e.target.value)}
                          required
                          label={
                            <div className="text-[#757575] opacity-60 font-[24px] flex">
                              <Image src={IconLink} className="w-[18px] h-[18px]" /> &nbsp;
                              Past your link
                            </div>
                          }
                          classNames={{
                            label: "text-black/50 dark:text-white/90",
                            input: [
                              "bg-transparent",
                              "text-black/90 dark:text-white/90",
                              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                            ],
                            innerWrapper: "bg-transparent ",
                            inputWrapper: [
                              "hover:shadow-sd",
                              "bg-white",
                              "dark:bg-white",
                              "border-2",
                              "hover:border-0",
                              "hover:bg-white",
                              "dark:hover:bg-white",
                            ],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* component left  */}
                <div className="w-[35%] h-[100%] ml-[10px] mt-[-1px]">
                  <div className="w-[100%] h-[100%] mb-[7px]">
                    <h1 className="w-[100%] h-[15%] ml-[20px] text-[14px] text-gray-700">
                      File Uploaded*
                    </h1>
                    <div className="w-[100%] h-[85%] mt-[-30px]">
                      <ScrollShadow hideScrollBar className="h-[100%]">
                        {materialData?.payload?.length > 0 ? (
                          materialData.payload.map((upload) => (
                            <div
                              key={upload?.materialId}
                              className="w-[90%] h-[68px] m-auto bg-white border-2 border-gray-200 rounded-[12px] overflow-hidden flex justify-between mb-[8px]"
                            >
                              <div className="w-[80%] h-[100%]  flex">
                                <div
                                  className={`w-[9px] h-[100%] bg-asset mr-[7%]`}
                                // style={{ backgroundColor: getFileColor(e.url) }}
                                ></div>
                                <div className="w-[70%] h-[100%]  flex items-center">
                                  <div
                                    className={`w-[36.85px] h-[36px] rounded-[12px] bg-[#ff8fab42] flex justify-center items-center`}
                                    style={{
                                      // backgroundColor: getFileColor(e.url),
                                    }}
                                  >
                                    {/* <Image src={e.image} className="" /> */}
                                    <Image src={IconLink} className="" />
                                  </div>
                                  <div className="w-[70%] h-[35px] ml-[8px]">
                                    <h1 className="text-[14px] text-black font-medium line-clamp-1">
                                      {upload?.materialTitle}
                                    </h1>
                                    <div className=" flex">
                                      <p className="text-[10px] text-black w-[70px] line-clamp-1">
                                        {upload?.description}
                                      </p>
                                      <p className="p[4px] px-[15px] bg-[#daf4f0] text-primary text-[10px] text-center rounded-lg line-clamp-1 ">
                                        {upload?.subjectInfo.subjectName}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="w-[20%] h-[100%] flex justify-center items-center">
                                {/* <button className="w-[30px] h-[30px] hover:bg-gray-200 flex justify-center items-center rounded-full"
                                  onClick={() => handleDelete(materialData?.materialId)}
                                >
                                  <Image
                                    src={IconDelete}
                                    className="w-[18.62px] h-[18px] object-cover"
                                  />
                                </button> */}
                              </div>
                            </div>
                          ))) : (
                          <div className="w-[100%] h-[100%] flex justify-center items-center">
                            <p className="text-[14px] text-gray-500">No materials available</p>
                          </div>)}
                      </ScrollShadow>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="mr-[18px] mt-[20px]">
              <Button
                variant="light"
                onClick={() => handleEditFormMaterial(false)}
                // onClick={onClose}
                className="border-2 border-gray-200 bg-white"
              >
                Cancel
              </Button>
              <Button color="primary" 
              type="submit"
              onClick={onSubmit}
              >
                Post
              </Button>
              <br />
              {urls?.urls && (
                <Link href={urls.urls} target="_blank">
                  URL
                </Link>
              )}
              {urls?.thumbnailUrl && (
                <Link href={urls.thumbnailUrl} target="_blank">
                  thumbnailUrl
                </Link>
              )}
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default FormEditMaterialComponent;
