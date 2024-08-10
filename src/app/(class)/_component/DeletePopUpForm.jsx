"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { deleteAnnounceByIdAction } from "@/action/streamingAction";
import toast, { Toaster } from "react-hot-toast";

const DeletePopUpForm = ({
  handleDeletePopup,
  handleConfirmPopup,
}) => {
  function handleDelete (){
    handleDeletePopup(false);
  }

  return (
    <>
      <Modal
        isOpen={true}
        isDismissable={false}
        placement="top-center"
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 justify-center items-center pt-[30px]">
                <div>
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 0C40.1109 0 30.444 2.93245 22.2215 8.42652C13.9991 13.9206 7.59042 21.7295 3.80604 30.8658C0.0216634 40.0021 -0.968502 50.0555 0.960759 59.7545C2.89002 69.4536 7.65206 78.3627 14.6447 85.3553C21.6373 92.3479 30.5464 97.11 40.2455 99.0392C49.9445 100.968 59.9979 99.9783 69.1342 96.194C78.2705 92.4096 86.0794 86.001 91.5735 77.7785C97.0676 69.556 100 59.8891 100 50C99.9854 36.7436 94.7129 24.0344 85.3393 14.6607C75.9656 5.28707 63.2564 0.014558 50 0ZM50 96C40.9021 96 32.0084 93.3021 24.4438 88.2476C16.8791 83.193 10.9832 76.0088 7.50156 67.6034C4.01993 59.198 3.10898 49.949 4.8839 41.0258C6.65882 32.1027 11.0399 23.9063 17.4731 17.4731C23.9063 11.0399 32.1027 6.6588 41.0259 4.88388C49.949 3.10896 59.198 4.01991 67.6034 7.50154C76.0089 10.9832 83.1931 16.8791 88.2476 24.4438C93.3021 32.0084 96 40.9021 96 50C95.9868 62.1959 91.1361 73.8885 82.5123 82.5123C73.8885 91.1361 62.1959 95.9867 50 96ZM48 54V26C48 25.4696 48.2107 24.9609 48.5858 24.5858C48.9609 24.2107 49.4696 24 50 24C50.5304 24 51.0392 24.2107 51.4142 24.5858C51.7893 24.9609 52 25.4696 52 26V54C52 54.5304 51.7893 55.0391 51.4142 55.4142C51.0392 55.7893 50.5304 56 50 56C49.4696 56 48.9609 55.7893 48.5858 55.4142C48.2107 55.0391 48 54.5304 48 54ZM54 72C54 72.7911 53.7654 73.5645 53.3259 74.2223C52.8864 74.8801 52.2616 75.3928 51.5307 75.6955C50.7998 75.9983 49.9956 76.0775 49.2197 75.9231C48.4437 75.7688 47.731 75.3878 47.1716 74.8284C46.6122 74.269 46.2312 73.5563 46.0769 72.7803C45.9225 72.0044 46.0017 71.2002 46.3045 70.4693C46.6072 69.7383 47.1199 69.1136 47.7777 68.6741C48.4355 68.2346 49.2089 68 50 68C51.0609 68 52.0783 68.4214 52.8284 69.1716C53.5786 69.9217 54 70.9391 54 72Z"
                    fill="#FF0000"
                    fill-opacity="0.6"
                  />
                </svg>
              </ModalHeader>
              <ModalBody className="flex text-inUseGray justify-center items-center">
                <p>Are you sure want to delete this item?</p>
              </ModalBody>
              <ModalFooter className="flex justify-center pb-[30px]">
                <Button
                  variant="flat"
                  onClick={()=>handleDelete()}
                  className="bg-white border-1 border-inUseGray text-inUseGray"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-inUseRed text-white"
                  onClick={() => handleConfirmPopup(true)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeletePopUpForm;
