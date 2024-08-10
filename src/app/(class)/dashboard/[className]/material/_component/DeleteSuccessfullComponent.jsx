"use client";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import React from "react";
import Image from "next/image";
import IconSuccessfull from "../../../../../../../public/icon class materail svg/Correctly icon.svg";

const DeleteSuccessfullComponent = ({ handleDeletePopup }) => {
  return (
    <div>
      <Modal isOpen={true}>
        <ModalContent className="max-w-[25%] h-auto mt-3 flex flex-col justify-center items-center">
          <ModalHeader className="flex flex-col relative  left-0">
            <Image src={IconSuccessfull} className="mt-[20px]" alt="success icon" />
          </ModalHeader>
          <ModalBody className="mt-auto">
            <p>Item has been successfully deleted.</p>
          </ModalBody>
          <ModalFooter className="mb-[20px]">
            <Button onClick={() => handleDeletePopup(false)} className="bg-primary border-2 text-white">
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteSuccessfullComponent;
