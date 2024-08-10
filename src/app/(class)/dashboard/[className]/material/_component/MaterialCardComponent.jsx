'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import EditFormCreateMaterialComponent from "../_component/EditFormCreateMaterailComponent";
import DeletePopUpForm from "@/app/(class)/_component/DeletePopUpForm";
import ConfirmPopUpForm from "@/app/(class)/_component/ConfirmPopUpForm";
import MessageCommentComponent from "./MessageCommentComponent";
import DropDownMaterialCardComponent from "./DropDownMaterialCardComponent";
import MapMateriaCardComponent from "./MapMateriaCardComponent";
import { deleteCardMaterialSubjectByIdAction } from "@/action/materialAction";
import EmptyMaterialImage from "../../../../../../../public/icon class materail svg/empty material.png"

const MaterialCardComponent = ({ subjectData, params, subId }) => {
  // console.log('class id MaterialCardComponent:',params)
  console.log('subject data immmmm', subjectData)
  // subject data have subject id no have class id 

  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState(null);
  const [isOpenEditFormMaterial, setOpenEditFormMaterial] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [isOpenFormConfirm, setOpenFormConfirm] = useState(false);
  const [isOpenFormDelete, setOpenFormDelete] = useState(false);
  const [deleteCardMaterialBySubject, setDeleteCardMaterialBySubject] = useState(null);
  const [subjectIdToDelete, setSubjectIdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDropdown = async (index) => {
    if (visibleDropdownIndex === index) {
      setVisibleDropdownIndex(null);
    } else {
      setIsLoading(true);
      setVisibleDropdownIndex(index);
      setIsLoading(false);
    }
  };
  const handleDeletePopup = (isOpen) => {
    setOpenFormDelete(isOpen);
  };
  const handleConfirmPopup = (isOpen) => {
    setOpenFormDelete(false);
    setOpenFormConfirm(isOpen);
  };
  const handleEditFormMaterial = (isOpen) => {
    setOpenEditFormMaterial(isOpen);
  };
  function handleDeleteSubject(subjectId) {
    setSubjectIdToDelete(subjectId);
  }
  useEffect(() => {
    if (subjectIdToDelete !== null) {
      async function deleteMaterialBySubject() {
        setIsLoading(true);
        try {
          const deleteBySubjectId = await deleteCardMaterialSubjectByIdAction(subjectIdToDelete);
          setDeleteCardMaterialBySubject(deleteBySubjectId);
        } catch (error) {
          console.error("Internal Server Error: ", error);
        }
        setIsLoading(false);
      }
      deleteMaterialBySubject();
    }
  }, [subjectIdToDelete]);

  useEffect(() => {
    if (deleteCardMaterialBySubject !== null) {
      //console.log("delete subject id: ", deleteCardMaterialBySubject);
    }
  }, [deleteCardMaterialBySubject]);

  if (!subjectData || !subjectData.payload || subjectData.payload.length === 0) {
    return <div className="">
      <div className="w-[190px] h-[190px] absolute  flex justify-center items-center">
        <div className="relative top-[80%] left-[450px]">
          <Image src={EmptyMaterialImage} alt="no data"  />
          <div className="flex justify-center text-[16px] ">No subjects available</div>
        </div>
      </div>
    </div>;
  }

  return (
    <div>
      <div className="top-0 transition-[1s]">
        {subjectData?.payload?.map((material, index) => (
          <div className="relative" key={material?.materialId}>
            <div onClick={() => toggleDropdown(index)}>
              <MapMateriaCardComponent
                subjectData={subjectData}
                // params={params.className}
                params={params}
                material={material}
                index={index}
                handleEditFormMaterial={handleEditFormMaterial}
                handleDeletePopup={handleDeletePopup}
                handleDeleteSubject={handleDeleteSubject}
              />
            </div>
            {visibleDropdownIndex === index && (
              isLoading ? (
                <div>Loading...</div>
              ) : (
                <DropDownMaterialCardComponent
                  params={params}
                  material={material}
                  subjectData={material}
                />
              )
            )}
          </div>
        ))}

        {isOpenEditFormMaterial && (
          <EditFormCreateMaterialComponent
            handleEditFormMaterial={handleEditFormMaterial}
          />
        )}
        {isOpenComment && (
          <MessageCommentComponent materailId={yourMaterialId}
            onCloseComment={() => setIsOpenComment(false)}
          />
        )}
        {isOpenFormDelete && (
          <DeletePopUpForm
            handleDeletePopup={handleDeletePopup}
            handleConfirmPopup={handleConfirmPopup}
          />
        )}
        {isOpenFormConfirm && (
          <ConfirmPopUpForm handleConfirmPopup={handleConfirmPopup} />
        )}
      </div>
    </div>
  );
};

export default MaterialCardComponent;
