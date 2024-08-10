import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";

import member from "../../../../../../../public/icon streaming/member.svg";
import send from "../../../../../../../public/icon streaming/send.svg";
import cancel from "../../../../../../../public/icon streaming/cancel.svg";
import edit from "../../../../../../../public/icon/Edit.svg";
import trash from "../../../../../../../public/icon/Trash.svg";

import DeletePopUpForm from "../../../../_component/DeletePopUpForm";
import ConfirmPopUpForm from "../../../../_component/ConfirmPopUpForm";
import { useForm } from "react-hook-form";
import {
  deleteAnnounceByIdAction,
  deleteCommentAction,
  getAllAnnounceCommentAction,
  getCommentByIDAction,
  postCommentAction,
  updateCommentAction,
} from "@/action/streamingAction";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentAnnounceSchema } from "@/lib/schema/commentAnnounceSchema";
import IconEditCommnet from "../../../../../../../public/icon class materail svg/EditComment.svg";
import { getSession } from "next-auth/react";

const PopupCommentComponent = ({
  pageX,
  pageY,
  model,
  annID,
  classID,
  userData,
}) => {
  const [openDelete, setOpenDelete] = useState();
  const [openConfirm, setOpenConfirm] = useState();
  const [cmtId, setCmtId] = useState();
  const [cID, setCID] = useState();
  function handleDeleteCmt(e) {
    setCmtId(e.currentTarget.getAttribute("cmt-id"));
  }
  //get by id
  const [commentDataID, setCommentDataID] = useState();
  async function handleEditCmt(e) {
    setCID(e.currentTarget.getAttribute("data-id"));
    const data = await getCommentByIDAction(
      classID,
      annID,
      e.currentTarget.getAttribute("data-id")
    );
    setCommentDataID(data?.payload);
  }
  //console.log("commentDataID", commentDataID);
  async function handleDeletePopup(isOpen) {
    setOpenDelete(isOpen);
  }

  //get all
  const [commentData, setCommentData] = useState();
  async function getAllComment() {
    const data = await getAllAnnounceCommentAction(classID, annID);
    setCommentData(data);
  }
  useEffect(() => {
    getAllComment();
  }, []);

  //delete comment
  async function handleConfirmPopup(isOpen) {
    const data = await deleteCommentAction(classID, annID, cmtId);
    if (data?.statusCode == 200) {
      setOpenDelete(false);
      getAllComment();
      toast.success("Delete successfully");
    }
    setCommentDataID(null);
    setCID(null);
    // setOpenConfirm(isOpen);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(commentAnnounceSchema),
  });

  async function postCommentHandler(commentInfo) {
    // post comment
    if (!cID) {
      commentInfo.classId = classID;
      commentInfo.announceId = annID;
      const post = await postCommentAction(commentInfo);
      if (post?.statusCode === 201) {
        toast.success("Post successfully");
      } else {
        toast.error("Something went wrong!");
      }
      reset();
    } else {
      commentInfo.classId = classID;
      commentInfo.announceId = annID;
      const post = await updateCommentAction(cID, commentInfo);
      if (post?.statusCode === 200) {
        toast.success("Update successfully");
        setCommentDataID(null);
        setCID(null);
      } else {
        toast.error("Something went wrong!");
      }
      reset();
    }
    getAllComment();
  }

  const [checkUser, setCheckUser] = useState();
  useEffect(() => {
    async function getUser() {
      const user = await getSession();
      setCheckUser(user?.user?.email);
    }
    getUser();
  }, []);

  const formatDateToDMY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <Modal
        isOpen={true}
        isDismissable={false}
        className="max-w-[806px] h-auto pb-[20px]"
      >
        <ModalContent className="w-[100%]">
          <ModalHeader className="flex justify-between items-center">
            <h1 className="text-primary font-semibold text-[24px]">Comment</h1>
            <button
              // onClick={onCloseComment}
              className="p-[8px] hover:bg-gray-200 rounded-full absolute top-[7px] right-[15px]"
            >
              <Image
                onClick={model}
                src={cancel}
                alt="Close"
                className="w-[24px] h-[24px]"
              />
            </button>
          </ModalHeader>
          <hr />
          <ModalBody className="w-[100%]">
            <div className="member flex mt-[10px]">
              <Image
                src={member}
                alt="Member Icon"
                className="w-[24px] h-[24px]"
              />
              <p className="ml-[2%] text-[#000000d7] text-[16px] mt-[3px]">
                {commentData?.payload?.length} user comment(s)
              </p>
            </div>
            <div className="w-[100%] overflow-y-auto h-[200px] mb-[10px]">
              {commentData?.payload?.map((cmt) => (
                <div
                  key={cmt?.announceCmtId}
                  className="w-[100%] h-[55px] flex justify-between mt-[10px]"
                >
                  <div className="w-[95%] h-[100%] flex items-center">
                    <div className="w-[10%] flex justify-center items-center">
                      <div className="w-[44px] h-[44px] rounded-full overflow-hidden">
                        <Avatar
                          className="w-[100%] h-[100%]
                          object-cover"
                          src={cmt?.createdBy?.profileUrl}
                        ></Avatar>
                      </div>
                    </div>
                    <div className="w-[90%]">
                      <div className="flex">
                        <h1 className="font-medium text-[#000000d4] text-[16px] mt-[2px] capitalize">
                          {cmt?.createdBy?.firstName} {cmt?.createdBy?.lastName}
                        </h1>
                        <p className="text-[14px] text-[#00000098] mt-[4px] ml-[8px]">
                          {formatDateToDMY(cmt?.createdAt)}
                        </p>
                      </div>
                      <p className="truncate text-[14px] text-[#00000098] mt-[3px]">
                        {cmt?.content}
                      </p>
                    </div>
                  </div>
                  {cmt.createdBy.email == checkUser ? (
                    <Dropdown className="min-w-[120px]">
                      <DropdownTrigger>
                        <button className="w-[5%] flex justify-center items-center">
                          <Image src={IconEditCommnet} alt="Edit Comment" />
                        </button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Comment Actions">
                        {/* edit */}
                        <DropdownItem
                          onClick={() => setOpenDelete(false)}
                          className="data-[hover=true]:bg-blue-200 "
                        >
                          <div
                            key="edit"
                            data-id={cmt?.announceCmtId}
                            onClick={(e) => handleEditCmt(e)}
                            className="flex"
                          >
                            <Image src={edit} alt="Edit" id="edit" />
                            <p className="ml-[8px]">Edit</p>
                          </div>
                        </DropdownItem>

                        {/* delete */}
                        <DropdownItem
                          className="data-[hover=true]:bg-blue-200"
                          onClick={() => setOpenDelete(true)}
                        >
                          <button
                            key="delete"
                            cmt-id={cmt?.announceCmtId}
                            onClick={(e) => handleDeleteCmt(e)}
                            className="flex"
                          >
                            <Image src={trash} alt="Delete" id="delete" />
                            <p className="ml-[8px]">Delete</p>
                          </button>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    ""
                  )}
                </div>
              ))}
              {openDelete && (
                <DeletePopUpForm
                  handleDeletePopup={handleDeletePopup}
                  handleConfirmPopup={handleConfirmPopup}
                />
              )}
              {openConfirm && (
                <ConfirmPopUpForm handleConfirmPopup={handleConfirmPopup} />
              )}
            </div>
            <div className="w-[100%] h-[50px] flex items-center justify-between">
              <div className="w-[50px] h-[44px] bg-gray-200 flex justify-center items-center rounded-full overflow-hidden">
                <Avatar src={userData?.payload?.profileUrl}> </Avatar>
              </div>
              <div className="w-[100%] h-[100%] ml-[20px] mt-[7px]">
                <div className="relative top-0 h-[100%]">
                  <form onSubmit={handleSubmit(postCommentHandler)}>
                    <Input
                      name="content"
                      type="text"
                      {...register("content")}
                      placeholder={commentDataID?.content ?? "Comment here..."}
                      className="w-[98%] h-[90%]"
                      endContent={
                        <button type="submit">
                          <Image src={send} alt="Send Comment" />
                        </button>
                      }
                    />
                  </form>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PopupCommentComponent;
