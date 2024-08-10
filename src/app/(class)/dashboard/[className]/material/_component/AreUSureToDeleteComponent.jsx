import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";

import IconWarningDelete from "../../../../../../../public/icon class materail svg/Warning icon.svg";
import DeleteSuccessfullComponent from "./DeleteSuccessfullComponent";

const AreUSureToDeleteComponent = ({
  handleDeletePopup,
  handleDeleteSubject,
  subjectId,
  message,
}) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleDelete = () => {
    handleDeleteSubject(subjectId);
    setShowSuccessPopup(true);
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    handleDeletePopup(false);
  };

  return (
    <div>
      <Modal isOpen={!showSuccessPopup} onClose={() => handleDeletePopup(false)}>
        <ModalContent className="max-w-[25%] h-auto mt-3 flex flex-col justify-center items-center">
          <ModalHeader className="flex flex-col m-auto">
            <Image
              src={IconWarningDelete}
              className="mt-[20px]"
              alt="icons delete"
              width={50}
              height={50}
            />
          </ModalHeader>
          <ModalBody className="mt-auto">
            {message ?? <p>Are you sure you want to delete this item?</p>}
          </ModalBody>
          <ModalFooter className="mb-[20px]">
            <Button
              variant="light"
              onClick={() => handleDeletePopup(false)}
              className="border-2 border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete} 
              className="bg-[red] border-2 border-[red] text-white"
            >
              Yes, I'm sure
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {showSuccessPopup && (
        <DeleteSuccessfullComponent
          handleDeletePopup={handleCloseSuccessPopup}
        />
      )}
    </div>
  );
};

export default AreUSureToDeleteComponent;
