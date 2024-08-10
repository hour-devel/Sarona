import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
const PopUpFeedBackListComponent = ({openFeedBackList}) => {
  return (
    <Modal isOpen={true} onClose={openFeedBackList} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 justify-center items-center pt-[30px]">
              <h2 className="text-[24px] text-inUseGray">Log Out ?</h2>
            </ModalHeader>
            <ModalBody className="flex justify-center items-center py-[20px]">
              <p>Are you sure want to log out ?</p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PopUpFeedBackListComponent;
