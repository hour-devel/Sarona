import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

const LogOutComponent = ({ onCloseLogout }) => {
  return (
    <div>
      <Modal isOpen={true} onClose={onCloseLogout}>
        <ModalContent className="max-w-[390px] h-auto pt-[10px] pb-[10px] text-center">
          <ModalHeader className="m-auto text-[24px] font-bold text-[gray]">
            Log Out
          </ModalHeader>
          <ModalBody>
            <p className="text-[#00000096] font-semibold">Are you sure want to log out?</p>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <Button
              variant="light"
              onClick={onCloseLogout}
              className="bg-white text-[16px] hover:bg-gray-200 border-2"
            >
              Cancel
            </Button>
            <Button onClick={()=>signOut()} className="text-white text-[16px] bg-[red]">
              Log Out
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default LogOutComponent;
