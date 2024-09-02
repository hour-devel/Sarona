import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import IconEdit from "../../../../../../../public/icon class materail svg/Edit.svg";
import IconMessage from "../../../../../../../public/icon class materail svg/message.svg";
import IconDownload from "/public/icon class materail svg/Download.svg";
import IconDelete from "../../../../../../../public/icon class materail svg/Delete Icon.svg";
import IconLink from "../../../../../../../public/icon class materail svg/Upload Link.svg";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Link,
} from "@nextui-org/react";
import MessageCommentComponent from "./MessageCommentComponent";
import EditFormCreateMaterialComponent from "./EditFormCreateMaterailComponent";
import DeletePopUpForm from "@/app/(class)/_component/DeletePopUpForm";
import ConfirmPopUpForm from "@/app/(class)/_component/ConfirmPopUpForm";
import {
  deleteMaterialByIdAction,
  getAllMaterialsBySubjectIdAction,
} from "@/action/materialAction";
import DeleteMaterialComponent from "./DeleteMaterialComponent";
import ButtonDeleteMaterialComponent from "./ButtonDeleteMaterialComponent";
import SpinnerLoadingComponent from "@/components/SpinnerLoadingComponent";
import FormCreateMaterialComponent from "./FormCreateMaterialComponent";

const DropDownMaterialCardComponent = ({ material, subjectData, params }) => {
  // console.log('class id', params)
  console.log("material vvvvvv ", material);
  console.log("subject id data --------:", subjectData?.subjectId);
  console.log("subject  data --------:", subjectData);
  const [isOpenFormDelete, setOpenFormDelete] = useState(false);
  const [isOpenEditFormMaterial, setOpenEditFormMaterial] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [isOpenFormConfirm, setOpenFormConfirm] = useState(false);
  const [materialData, setMaterialData] = useState([]);
  const [materialId, setMaterialId] = useState();
  const [openPopUpdeleteMaterial, setOpenPopUpdeleteMaterial] = useState(false);
  const [isOpenFormCreateMaterial, setFormCreateMaterial] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [materialCommentIdToDelete, setmaterialCommentIdToDelete] = useState();
  const [isOpen, setOpen] = useState();
  // const [inputString, setInputString] = useState('<p> Hello baby</p>');

  // Function to cut string into three-character
  const cutStringIntoChunks = (str) => {
    const cutString = [];
    for (let i = 0; i < str.length; i += 6) {
      cutString.push(str.substring(i, i + 6));
    }
    return cutString.join(" ");
  };

  useEffect(() => {
    async function getAllMaterialData(subjectId) {
      setIsLoading(true);
      const material = await getAllMaterialsBySubjectIdAction(subjectId);
      //console.log('matrial ggggg', material)
      setMaterialData(material);
      setIsLoading(false);
    }
    getAllMaterialData(subjectData.subjectId);
  }, [subjectData.subjectId]);

  function handleDeletePopup(isOpen) {
    setOpenFormDelete(isOpen);
  }
  function handleEditFormMaterial(isOpen) {
    setOpenEditFormMaterial(isOpen);
  }
  function handleConfirmPopup(isOpen) {
    setOpenFormDelete(false);
    setOpenFormConfirm(isOpen);
  }
  function handleDeleteMaterial(materailId, isOpen) {
    // //console.log('materiai id:', materailId)
    setOpenPopUpdeleteMaterial(isOpen);
    setMaterialId(materailId);
  }
  const handleDeletComment = (materialCommentId) => {
    setmaterialCommentIdToDelete(materialCommentId);
  };
  const getFileColor = (url) => {
    switch (url) {
      case "pptx":
        return "#ff906b88";
      case "xlsx":
        return "#00800030";
      case "docx":
        return "#C3E0FA";
      case "pdf":
        return "#FF0000";
      case "http":
        return "#C3E0FA";
      default:
        return "#ffff";
    }
  };

  return (
    <div className="absolute z-50 top-[90px] w-full">
      <div className="w-full h-auto mt-[-15px] transition-[1s]">
        <div className="w-[100%] h-[80.5%] bg-white pt-[20px] shadow rounded-b-lg">
          <Suspense fallback={<SpinnerLoadingComponent />}>
            {isLoading ? (
              <div className="flex justify-center items-center w-full h-full">
                <p className="ml-2">
                  <Spinner />
                </p>
              </div>
            ) : (
              <div>
                <div className="ml-[30px] mb-[20px]">
                  <Button
                    className="bg-primary text-white"
                    onClick={() => {
                      setFormCreateMaterial(true);
                      // materialData
                    }}
                  >
                    Create Material
                  </Button>
                  {isOpenFormCreateMaterial && (
                    <FormCreateMaterialComponent
                      materialData={materialData}
                      subjectId={subjectData?.subjectId}
                      subjectData={subjectData}
                      params={params}
                      onClose={() => setFormCreateMaterial(false)}
                    />
                  )}
                </div>

                <div className="w-[100%] h-[60%] overflow-hidden pl-[30px] pb-[20px]">
                  <div className=" justify-evenly items-center cursor-pointer pb-[20px]">
                    <div className="grid grid-cols-2">
                      {materialData &&
                      materialData.payload &&
                      materialData.payload.length > 0 ? (
                        materialData.payload.map((e, index) => (
                          <div
                            key={index}
                            className="w-[95%] h-[72px] bg-white border-1 border-gray-200 rounded-[15px] overflow-hidden flex justify-between mb-[8px]"
                          >
                            <div className="w-[80%] h-[100%] flex">
                              <div
                                className={`w-[9px] h-[100%] bg-[#ff8fab] mr-[7%]`}
                              ></div>
                              <div className="w-[70%] h-[100%] flex items-center">
                                <div
                                  className={`w-[38.86px] bg-[#ff8fab42] h-[40px] rounded-[12px] flex justify-center items-center`}
                                >
                                  <Image
                                    src={IconLink}
                                    className="object-cover"
                                    alt="Material Icon"
                                  />
                                </div>
                                <div className="w-[70%] h-[35px] ml-[8px]">
                                  <h1 className="line-clamp-1 text-[14px] font-semibold text-[#000000] mt-[-2px]">
                                    {e?.materialTitle}
                                  </h1>
                                  <div className="flex mt-1">
                                    <p className="text-[10px] text-black w-[75px] line-clamp-1">
                                      {e?.description}
                                    </p>
                                    <p className="p[4px] w-[40px] bg-[#ff8fab42] text-asset text-[10px] text-center rounded-lg line-clamp-1 p-[1] lowercase">
                                      {cutStringIntoChunks(
                                        e?.subjectInfo.subjectName
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="flex justify-center items-start mt-[16px] ml-[15px]"
                              onClick={() => {
                                setIsOpenComment(true);
                                setMaterialId(e.materialId);
                              }}
                            >
                              <Image src={IconMessage} alt="Message Icon" />
                            </button>

                            <div className="w-[8%] h-[100%] mt-3 flex justify-center items-start">
                              <Dropdown className="min-w-[120px]">
                                <DropdownTrigger>
                                  <button className="outline-none rotate-90 text-[20px] font-bold tracking-widest">
                                    ...
                                  </button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                  <DropdownItem
                                    key="edit"
                                    className="data-[hover=true]:bg-blue-200"
                                  >
                                    <button
                                      className="flex"
                                      onClick={() => {
                                        handleEditFormMaterial(true);
                                        setMaterialId(e.materialId);
                                      }}
                                    >
                                      <Image src={IconEdit} alt="Edit" />
                                      <p className="ml-[8px]">Edit</p>
                                    </button>
                                  </DropdownItem>
                                  <DropdownItem
                                    key="delete"
                                    className="data-[hover=true]:bg-blue-200"
                                  >
                                    <button
                                      onClick={() => {
                                        setOpen(true);
                                        setMaterialId(e.materialId);
                                      }}
                                      className="flex"
                                    >
                                      <Image src={IconDelete} alt="Delete" />
                                      <p className="ml-[8px]">Delete</p>
                                    </button>
                                  </DropdownItem>
                                  <DropdownItem
                                    key="download"
                                    className="border-t-1 border-gray-200 data-[hover=true]:bg-blue-200"
                                  >
                                    <div className="flex">
                                      <Image
                                        src={IconDownload}
                                        alt="Download"
                                      />
                                      <a className="ml-[8px]">
                                        {e?.materialLinks[0]?.fileUrl ? (
                                          <Link
                                            href={e?.materialLinks[0]?.fileUrl}
                                            target="_blank"
                                            className="text-black text-[14px]"
                                          >
                                            Download
                                          </Link>
                                        ) : (
                                          "No file upload"
                                        )}
                                      </a>
                                    </div>
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-[14px] absolute top-12 left-[42%]">
                          No materials available.
                        </p>
                      )}
                    </div>
                    {isOpen && (
                      <DeleteMaterialComponent
                        materialId={materialId}
                        onClose={() => setOpen(false)}
                        handleDeleteMaterial={handleDeleteMaterial}
                      />
                    )}

                    {isOpenEditFormMaterial && (
                      <EditFormCreateMaterialComponent
                        // onClose={}
                        subjectData={subjectData?.subjectId}
                        materialId={materialId}
                        params={params}
                        handleEditFormMaterial={handleEditFormMaterial}
                        onClose={handleEditFormMaterial}
                      />
                    )}
                    {isOpenFormConfirm && (
                      <ConfirmPopUpForm
                        handleConfirmPopup={handleConfirmPopup}
                      />
                    )}
                    {isOpenComment && (
                      <MessageCommentComponent
                        subjectDataUser={subjectData}
                        subjectData={subjectData?.subjectId}
                        params={params}
                        materialId={materialId}
                        onCloseComment={() => setIsOpenComment(false)}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DropDownMaterialCardComponent;
