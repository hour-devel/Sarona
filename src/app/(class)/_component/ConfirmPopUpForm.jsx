import React from "react";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import success from "../../../../public/icon/success.svg";
import Image from "next/image";
const ConfirmPopUpForm = ({ handleConfirmPopup }) => {
  function handleConfirm() {
    handleConfirmPopup(false);
  }
  return (
    <>
      <Modal isOpen={true} onClose={handleConfirmPopup} placement="top-center">
        <ModalContent className="overflow-visible w-[450px] h-[271px]">
          {(onClose) => (
            <>
              <ModalHeader className="relative pb-0 flex flex-col gap-1 justify-center items-center pt-[30px] h-[120px] overflow-visible">
                <Image src={success} alt="" className="absolute top-[-80px]" />
                <h2 className="text-[32px] font-semibold text-[#51CC64] mt-[40px]">
                  SUCCESS !
                </h2>
              </ModalHeader>
              <ModalBody className="flex text-inUseGray justify-center items-center">
                <p>You're delete successfully!</p>
              </ModalBody>
              <ModalFooter className="flex justify-center pb-[30px]">
                <Button
                  variant="flat"
                  onClick={handleConfirm}
                  className="bg-primary border-primary border-2 text-white"
                >
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmPopUpForm;
