import React, { useState } from "react";
import comment from "../../../../../../../public/icon streaming/comment.svg";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar, Button } from "@nextui-org/react";
import dot from "../../../../../../../public/icon streaming/dot.svg";
import edit from "../../../../../../../public/icon streaming/Edit.svg";
import trash from "../../../../../../../public/icon streaming/Trash.svg";
import Image from "next/image";
import PopupCommentComponent from "./PopupCommentComponent";
import DeletePopUpForm from "@/app/(class)/_component/DeletePopUpForm";
import ConfirmPopUpForm from "@/app/(class)/_component/ConfirmPopUpForm";
import { usePathname } from "next/navigation";
import {
  deleteAnnounceByIdAction,
  getAnnounceByIdAction,
} from "@/action/streamingAction";
import EditComponent from "./EditComponent";

import linkIcon from "../../../../../../../public/icon/uploadLink.svg";
import emptyAnnoun from "../../../../../../../public/empty.png";

const AnnouncementListCompoent = ({
  announceData,
  classID,
  allClassData,
  role,
  userData,
}) => {
  const currentPath = usePathname();
  const segments = currentPath.split("/");
  const pathName = "/" + segments.pop("/");
  const lastTwoSegment = segments.slice(-2);

  const [openComment, setOpenComment] = useState(false);
  const [openDelete, setOpenDelete] = useState();
  const [openEdit, setOpenEdit] = useState();
  const [openConfirm, setOpenConfirm] = useState();
  const [pageX, setPageX] = useState();
  const [pageY, setPageY] = useState();
  const [editId, setEditId] = useState();
  const [deleteId, setDeleteId] = useState();


  function showModalEditAnnouncement(e) {
    setEditId(e.currentTarget.getAttribute("edit-id"));
    setOpenEdit(true);
  }

  //delete announce
  async function deleteAnnouncement(e) {
    setDeleteId(e.currentTarget.getAttribute("delete-id"));
    setOpenDelete(true);
  }

  function handleDeletePopup(isOpen) {
    setOpenDelete(isOpen);
  }

  async function handleConfirmPopup(isOpen) {
    const data = await deleteAnnounceByIdAction(deleteId, classID);
    if (data?.statusCode === 200) {
      setOpenDelete(false);
    }
    setOpenConfirm(isOpen);
  }

  const [annID, setAnnID] = useState(null);
  function handleOpenComment(e) {
    setAnnID(e.currentTarget.getAttribute("aID"));
    setPageX(e.pageX);
    setPageY(e.pageY);
    setOpenComment(true);
  }

  const formatDateToDMY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const current = new Date();
  const currentDate = formatDateToDMY(current);

  return (
    <div className="w-[100%] h-auto float-left py-[20px]">
      <div className="w-[100%] h-[10%] mb-4 float-left">
        <h4 className="font-semibold 2xl:text-[24px] xl:text-[20px] text-black">
          {announceData?.payload != null ? "Announcement" : ""}
        </h4>
      </div>
      <div className="w-[100%] h-[90%] float-left relative">
        {/*  */}
        {announceData?.payload ? (
          announceData.payload.filter(
            (data) =>
              data?.isDraft === false &&
              formatDateToDMY(data?.postDate) <= currentDate
          ).length > 0 ? (
            announceData.payload
              .filter(
                (data) =>
                  data?.isDraft === false &&
                  formatDateToDMY(data?.postDate) <= currentDate
              )
              .map((data) => (
                <div
                  key={data?.announceId}
                  className="relative w-[100%] h-[270px] rounded-3xl border-[1.55px] bg-white mt-[20px] overflow-hidden"
                >
                  <div className="w-[95%] h-[20%] float-left mx-5 my-3 mt-3 flex justify-between ">
                    <div className="flex items-center">
                      {/* profile */}
                      <div className="mr-4 mt-1">
                        <Avatar
                          className="w-[42px] h-[42px] rounded-full"
                          src={data?.createdBy?.profileUrl}
                        ></Avatar>
                      </div>
                      <div>
                        <div className="text-[15px] text-black font-medium capitalize">
                          {data?.createdBy?.firstName}{" "}
                          {data?.createdBy?.lastName}
                        </div>
                        <div className="text-[12px] text-[#757575]">
                          {formatDateToDMY(data?.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-2 items-start mr-[-1%] ">
                      {/* Comment */}
                      <div className="relative mr-3">
                        <button
                          variant="flat"
                          aID={data?.announceId}
                          onClick={(e) => handleOpenComment(e)}
                          className="px-1"
                        >
                          <Image src={comment} alt="comment icon" />
                        </button>
                      </div>

                      {role && (
                        <div
                          key={data?.userId}
                          className="w-[45%] h-[50%] relative flex items-center justify-start "
                        >
                          <Dropdown className="min-w-[150px] ">
                            <DropdownTrigger>
                              <Button className="min-w-3 h-[25px] flex justify-center text-[#757575] p-0 m-0 bg-white">
                                <Image src={dot} alt="menu icon" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions ">
                              {/* edit */}
                              <DropdownItem
                                key="edit"
                                className="relative data-[hover=true]:bg-blue-200"
                              >
                                <div
                                  key="edit"
                                  edit-id={data?.announceId}
                                  onClick={(e) => showModalEditAnnouncement(e)}
                                >
                                  <Image src={edit} alt="edit icon" />{" "}
                                  <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
                                    Edit
                                  </p>
                                </div>
                              </DropdownItem>
                              {/* delete */}
                              <DropdownItem
                                key="delete"
                                className="relative data-[hover=true]:bg-blue-200"
                              >
                                <div
                                  key="delete"
                                  delete-id={data?.announceId}
                                  onClick={(e) => deleteAnnouncement(e)}
                                >
                                  <Image src={trash} alt="delete icon" />{" "}
                                  <p
                                    key="delete"
                                    className="absolute left-[30%] top-[50%] translate-y-[-48%]"
                                  >
                                    Delete
                                  </p>
                                </div>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-[93%] mx-5 h-[80%] float-left ">
                    <h3 className="font-medium text-[17px] text-black ">
                      {data?.title}
                    </h3>
                    <div className="w-full flex justify-between ">
                      <div className="xl:w-[19%] 2xl:w-[17%]">
                        <img
                          className="mt-3 w-[154px] h-[105px] rounded-xl"
                          src={
                            !data?.imageUrl
                              ? "https://img.freepik.com/free-psd/3d-rendering-announcement-blank-banner-background_23-2150742094.jpg?t=st=1718896162~exp=1718899762~hmac=9fab0a01aa1ca9b6c14111248b2c745c7285a2265638747cb755f23f61f7118f&w=826"
                              : data?.imageUrl
                          }
                          alt="img not found"
                        />
                      </div>
                      <div className="xl:w-[78%] 2xl:w-[85%] mt-4  ">
                        <p className="xl:line-clamp-3 text-[15px] text-black font-normal">
                          {data?.description}
                        </p>
                        <div className="flex mt-3 text-[15px] text-black">
                          <div className="text-[15px] text-[#757575] line-clamp-1">
                            {data?.linkAttachments.map((d) => (
                              <div key={d.linkId} className="flex text-primary">
                                <Image
                                  width={17}
                                  height={17}
                                  src={linkIcon}
                                  className="text-primary "
                                ></Image>
                                <a
                                  href={d.linkUrl}
                                  target="_blank"
                                  className="underline ml-1 line-clamp-1"
                                  rel="noopener noreferrer"
                                >
                                  {d.linkUrl}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="mt-[10%]">
              <Image
                src={emptyAnnoun}
                className="w-[15%] h-[15%] mx-auto"
              ></Image>
              <p className="text-center 2xl:text-lg xl:text-sm text-gray-500">
                Announcements are empty.
              </p>
            </div>
          )
        ) : (
          <div className="mt-[10%]">
            <Image
              src={emptyAnnoun}
              className="w-[15%] h-[15%] mx-auto"
            ></Image>
            <p className="text-center text-lg text-gray-500">
              Announcements are empty.
            </p>
          </div>
        )}

        {openEdit && (
          <EditComponent
            allClassData={allClassData}
            classID={classID}
            editId={editId}
            deleteId={deleteId}
            announceData={announceData}
            title="Edit"
            model={() => setOpenEdit(false)}
          />
        )}
        {openDelete && (
          <DeletePopUpForm
            handleDeletePopup={handleDeletePopup}
            handleConfirmPopup={handleConfirmPopup}
          />
        )}
        {openConfirm && (
          <ConfirmPopUpForm handleConfirmPopup={handleConfirmPopup} />
        )}

        {openComment && (
          <PopupCommentComponent
            annID={annID}
            classID={classID}
            pageX={pageX}
            pageY={pageY}
            userData={userData}
            model={() => setOpenComment(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AnnouncementListCompoent;
