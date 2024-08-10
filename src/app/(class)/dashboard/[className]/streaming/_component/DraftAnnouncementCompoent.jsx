import Image from "next/image";
import React, { useState } from "react";
import trash from "../../../../../../../public/icon streaming/Trash.svg";
import edit from "../../../../../../../public/icon streaming/Edit.svg";
import DeletePopUpForm from "../../../../_component/DeletePopUpForm";
import ConfirmPopUpForm from "../../../../_component/ConfirmPopUpForm";
import EditDraftComponent from "./EditDraftComponent";
import { deleteAnnounceByIdAction } from "@/action/streamingAction";
import emptyAnnoun from "../../../../../../../public/empty.png";
const DraftAnnouncementCompoent = ({ announceData, allClassData, classID }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState();
  const [openConfirm, setOpenConfirm] = useState();
  function handleDeletePopup(isOpen) {
    setOpenDelete(isOpen);
  }

  const [announceId, setAnnounceId] = useState();
  function handleEdit(e) {
    setAnnounceId(e.currentTarget.getAttribute("announceId"));
    setOpen(true);
  }

  const [deleteId, setDeleteId] = useState();

  function handleDelete(e) {
    setDeleteId(e.currentTarget.getAttribute("deleteId"));
    setOpenDelete(true);
  }

  async function handleConfirmPopup(isOpen) {
    const data = await deleteAnnounceByIdAction(deleteId, classID);
    if (data?.statusCode === 200) {
      setOpenDelete(false);
    }
    setOpenConfirm(isOpen);
  }

  const formatDateToDMY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const currentDate = new Date();

  return (
    <div className="absolute top-[84px] max-w-[100%]  w-[100%] rounded-2xl h-auto bg-white mb-[100px] py-5  shadow-sd">
      <div className=" px-7 pb-3 text-2xl font-bold rounded-2xl">
        Draft Announcement
      </div>

      {/* Draft1 */}
      {announceData?.payload?.filter((data) => data?.isDraft === true).length >
      0 ? (
        announceData.payload
          .filter(
            (data) =>
              data?.isDraft === true
            //  &&
            //   formatDateToDMY(data?.postDate) <= formatDateToDMY(currentDate)
          )
          .map((data) => (
            <div
              key={data?.announceId}
              className=" w-[94%] my-3 px-4 border border-l-8 mx-7 border-primary-300 py-3 rounded-2xl flex justify-between "
            >
              <div className="w-[6.5%] h-[50px]">
                <img
                  src={
                    !data?.imageUrl
                      ? "https://img.freepik.com/free-psd/3d-rendering-announcement-blank-banner-background_23-2150742094.jpg?t=st=1718896162~exp=1718899762~hmac=9fab0a01aa1ca9b6c14111248b2c745c7285a2265638747cb755f23f61f7118f&w=826"
                      : data?.imageUrl
                  }
                  className="h-[100%] w-[100%] object-cover rounded-xl"
                  width={30}
                  height={30}
                />
              </div>
              <div className="text-left ml-1 w-[81%]">
                <div className="font-bold text-md">{data?.title}</div>
                <div className="text-sm text-inUseGray line-clamp-2">
                  {data?.description}
                </div>
              </div>
              {/* Edit */}
              <div className="w-[9%] z-10 flex space-x-5 items-center">
                <div
                  className="relative hover:bg-transparent"
                  announceId={data?.announceId}
                  onClick={(e) => handleEdit(e)}
                >
                  <Image src={edit} alt="" />
                </div>
                {/* Delete */}
                <div
                  className="relative hover:bg-transparent"
                  deleteId={data?.announceId}
                  onClick={(e) => handleDelete(e)}
                >
                  <Image src={trash}></Image>
                </div>
              </div>
            </div>
          ))
      ) : (
        <div className="my-[2%]">
          <p className="text-center text-lg text-gray-500">Draft are empty!</p>
        </div>
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

      {/* Announcement Popup */}
      {open && (
        <EditDraftComponent
          announceId={announceId}
          classID={classID}
          announceData={announceData}
          allClassData={allClassData}
          model={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default DraftAnnouncementCompoent;
