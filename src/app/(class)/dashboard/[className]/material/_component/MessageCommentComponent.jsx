'use client'
import Image from "next/image";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Spinner,
  Textarea,
  button,
} from "@nextui-org/react";
import IconClose from "../../../../../../../public/icon class materail svg/closing.svg";
import IconMember from "../../../../../../../public/icon class materail svg/member.svg";
import IconSendComment from "../../../../../../../public/icon class materail svg/send comment.svg";
import Profile from "../../../../../../../public/loginImg.png";
import ProfilePi from "../../../../../../../public/icon class materail svg/default-profile.png";
import IconEditCommnet from "../../../../../../../public/icon class materail svg/EditComment.svg";
import IconEdit from "../../../../../../../public/icon class materail svg/Edit.svg";
import IconDelete from "../../../../../../../public/icon class materail svg/Delete Icon.svg";
import { Suspense, useEffect, useState } from "react";
import DeletePopUpForm from "@/app/(class)/_component/DeletePopUpForm";
import ConfirmPopUpForm from "@/app/(class)/_component/ConfirmPopUpForm";
import { deleteCommentByMaterialCommentIdAction, getAllCommentByMaterialIdAction, getAllCommentMaterialsAction, getCommentByIdMaterialAction, handlePostCommentAction, updateCommentByMaterialIdAction } from "@/action/materialAction";
import { insertCommentMaterialService } from "@/service/class/material/comment.service";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loading from "../loading";
import SpinnerLoadingComponent from "@/components/SpinnerLoadingComponent";
import DeleteCommentComponent from "./DeleteCommentComponet";
import InputComponent from "@/app/(auth)/_component/InputComponent";

const MessageCommentComponent = ({ subjectDataUser,subjectData, onCloseComment, materialId, materialCommentId, params }) => {
  console.log('material id:', materialId)
  // console.log('class id', params)
  // console.log('subject data id:', subjectData)

  const [isOpenFormDelete, setOpenFormDelete] = useState(false);
  const [isOpenFormConfirm, setOpenFormConfirm] = useState(false);
  const [commentMaterial, setCommentMaterial] = useState(null);
  const [dataCommentByMaterialId, setDataCommentByMaterialId] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const handleDeletePopup = (isOpen) => {
    setOpenFormDelete(isOpen);
  };

  const handleConfirmPopup = (isOpen) => {
    setOpenFormDelete(false);
    setOpenFormConfirm(isOpen);
  };

  const fetchComments = async () => {
    setIsLoading(true);
    const dataComment = await getCommentByIdMaterialAction(materialId);
    setDataCommentByMaterialId(dataComment);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDeleteComment = async (materialCommentId, isOpen) => {
    handleDeletePopup(isOpen);
    const deleteComment = await deleteCommentByMaterialCommentIdAction(materialCommentId);
    if (deleteComment.statusCode === 200) {
      reset();
      toast.success("Delete successfully");
      fetchComments();
    }
    return deleteComment;
    // fetchComments();
  };

  const handlePostComment = async (data) => {
    setIsSubmitting(true);
    if (editingComment) {
      await handleUpdateComment({ content: data.content });
    } else {
      const newCommentData = {
        content: data.content,
        materialId: materialId,
        classesId: params
      }
      const dataComment = await handlePostCommentAction(newCommentData);
      if (dataComment.statusCode === 201) {
        reset();
        toast.success("Comment successfully");
        fetchComments();
      }
    }
    setIsSubmitting(false);
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setValue("content", comment.content);
  }

  const handleUpdateComment = async (data) => {
    const bodyComment = {
      content: data.content,
      materialId: materialId,
      classesId: params
    };
    const dataUpdateComment = await updateCommentByMaterialIdAction(editingComment.materialCommentId, bodyComment);
    if (dataUpdateComment.statusCode === 200) {
      setEditingComment(null);
      reset();
      toast.success("Comment updated successfully");
      fetchComments();
    }
  }

  const formatDateToDMY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  const formatTimeWithAMPM = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strTime = `${hours} : ${minutes} ${ampm}`;
    return strTime;
  };
  
  const getTimeOrFormattedDate = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - givenDate;
    const millisecondsIn24Hours =  24 * 60 * 60 * 1000;
  
    if (timeDifference <= millisecondsIn24Hours) {
      // if less than 24 hours return the time in HH:MM AM/PM format
      return formatTimeWithAMPM(givenDate);
    } else {
      // else after last 24 hours , return the date in DD-MM-YYYY format
      return formatDateToDMY(dateString);
    }
  };

  return (
    <>
      <Modal isOpen={true} className="max-w-[806px] h-auto pb-[20px]">
        <ModalContent className="w-[100%] h-[52vh] overflow-y-auto">
          <ModalHeader className="flex justify-between items-center">
            <h1 className="text-primary font-semibold text-[24px]">Comment</h1>
            <button
              onClick={onCloseComment}
              className="p-[8px] hover:bg-gray-200 rounded-full absolute top-[7px] right-[15px]"
            >
              <Image
                src={IconClose}
                alt="Close"
                className="w-[24px] h-[24px]"
              />
            </button>
          </ModalHeader>
          <hr />
          <ModalBody className="w-[100%] ">
            <Suspense fallback={<SpinnerLoadingComponent />}>
              {isLoading ? (
                <div className="flex justify-center items-center w-full h-full">
                  <p className="ml-2"><Spinner /></p>
                </div>
              ) : (
                <>
                  <div className="member flex mt-[10px] w-[100%] max-h-[200px] overflow-y-auto mb-[10px]">
                    <Image
                      src={IconMember}
                      alt="Member Icon"
                      className="w-[24px] h-[24px]"
                    />
                    <p className="ml-[2%] text-[#000000d7] text-[16px] mt-[3px]">
                      {dataCommentByMaterialId?.payload?.length} class comment(s)
                    </p>
                  </div>
                  <div className="w-[100%] overflow-y-auto h-[200px] mb-[10px]">
                    {dataCommentByMaterialId && dataCommentByMaterialId.payload && dataCommentByMaterialId.payload.length > 0 ? (
                      dataCommentByMaterialId.payload.map((commentData) => (
                        <div key={commentData.materialCommentId} className="w-[100%] h-[55px] flex justify-between mt-[10px]">
                          <div className="w-[95%] h-[100%] flex items-center">
                            <div className="w-[10%] flex justify-center items-center">
                              <div className="w-[44px] h-[44px] rounded-full overflow-hidden">
                                {/* <img
                                  name="profileUrl"
                                  src={commentData.commentBy?.profileUrl ?? ProfilePi}
                                  alt="Profile"
                                  className="w-[100%] h-[100%] object-cover"
                                /> */}
                                <Avatar src={commentData.commentBy?.profileUrl} alt="not image" className="object-cover"/> 
                              </div>
                            </div>
                            <div className="w-[90%]">
                              <div className="flex">
                                <h1 className="font-semibold text-[#000000af] text-[15px] mt-[2px]">
                                  {commentData.commentBy?.firstName} {commentData.commentBy?.lastName}
                                </h1>
                                <p className="text-[14px] text-[#00000098] mt-[4px] ml-[8px]">
                                  {/* <Moment format="h : mm a">{commentData.createdAt}</Moment> */}
                                  {getTimeOrFormattedDate(commentData?.createdAt)}
                                </p>
                              </div>
                              <p className="truncate text-[16px] text-[#00000098] mt-[3px]">
                                {commentData.content}
                              </p>
                            </div>
                          </div>
                          <Dropdown className="min-w-[120px]">
                            <DropdownTrigger>
                              <button className="w-[5%] flex justify-center items-center">
                                <Image src={IconEditCommnet} alt="Edit Comment" />
                              </button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Comment Actions">
                              <DropdownItem
                                key="edit"
                                className="data-[hover=true]:bg-blue-200"
                                onClick={() => handleEditComment(commentData)}
                              >
                                <button className="flex">
                                  <Image src={IconEdit} alt="Edit" id="edit" />
                                  <p className="ml-[8px]">Edit</p>
                                </button>
                              </DropdownItem>
                              <DropdownItem
                                key="delete"
                                className="data-[hover=true]:bg-blue-200"
                                onClick={() => handleDeleteComment(commentData.materialCommentId)}
                              >
                                <button className="flex">
                                  <Image src={IconDelete} alt="Delete" id="delete" />
                                  <p className="ml-[8px]">Delete</p>
                                </button>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      ))
                    ) : (
                      <p className="flex justify-center mt-[60px] text-[14px]">No comments available.</p>
                    )}
                  </div>
                  <div className="w-[100%] h-[50px] flex items-center justify-between">
                    <div className="w-[50px] h-[44px] bg-gray-200 flex justify-center items-center rounded-full overflow-hidden">
                      {/* {dataCommentByMaterialId?.payload?.map((commentData) => (
                        <image
                          key={commentData.materialCommentId}
                          name="profileUrl"
                          src={subjectDataUser?.createdBy?.profileUrl}
                          alt="Profile"
                          className="object-cover w-[100%] h-[100%]"
                        />
                       ))}  */}
                       <Avatar src={subjectDataUser?.createdBy?.profileUrl}/>
                    </div>
                    <div className="w-[100%] h-[100%] ml-[20px] mt-[7px]">
                      <div className="relative top-0 h-[100%]">
                        <form onSubmit={handleSubmit(handlePostComment)}>
                          <Input
                            name="content"
                            type="text"
                            required
                            {...register("content")}
                            placeholder={editingComment?.content ?? "Add comment"}
                            className="w-[98%] h-[90%]"
                            endContent={
                              <button type="submit">
                                <Image src={IconSendComment} alt="Send Comment" />
                              </button>
                            }
                            classNames={{
                              label: "text-black/50 dark:text-white/90",
                              input: [
                                "bg-transparent",
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                              ],
                              innerWrapper: "bg-transparent",
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

                        </form>
                      </div>
                    </div>
                  </div>
                  {isSubmitting && <Loading />}
                </>
              )}
            </Suspense>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* {isOpenFormDelete && (
        <DeleteCommentComponent
          materialId={materialId}
          handleDeletePopup={handleDeletePopup}
          handleConfirmPopup={handleConfirmPopup}
          materialCommentId={materialCommentId}
        />
      )} */}
      {isOpenFormConfirm && (
        <ConfirmPopUpForm handleConfirmPopup={handleConfirmPopup} />
      )}
    </>
  );
};

export default MessageCommentComponent;
