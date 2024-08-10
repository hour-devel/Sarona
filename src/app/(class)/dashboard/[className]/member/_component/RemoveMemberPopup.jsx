// components/RemoveMemberPopup.js

import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import IconWarningDelete from "../../../../../../../public/warning.svg";

const RemoveMemberPopup = ({ isOpen, handleDelete, handleClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalContent className="max-w-[30%] h-auto mt-3 flex flex-col justify-center items-center">
        <ModalHeader className="flex flex-col m-auto">
          <Image
            src={IconWarningDelete}
            className="mt-[20px]"
            alt="icons delete"
            width={100}
            height={100}
          />
        </ModalHeader>
        <ModalBody className="mt-auto">
          <p>Are you sure you want to remove this member?</p>
        </ModalBody>
        <ModalFooter className="mb-[20px]">
          <Button
            variant="light"
            onClick={handleClose}
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
  );
};

export default RemoveMemberPopup;
