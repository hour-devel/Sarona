"use client";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import React from "react";
import success from "../../../../public/icon/success.svg";
import Image from "next/image";
import Link from "next/link";

const ChangePassworkComplete = ({ Model }) => {
  return (
    <Modal isOpen={true} onClose={Model} placement="top-center">
      <ModalContent className="overflow-visible bg-transparent">
        {(onClose) => (
          <>
            <ModalBody className="flex justify-center items-center py-[20px]">
              <div className="left-[5px] w-[578px] h-[329px] rounded-2xl text-center bg-white py-5">
                <div className=" px-6 pb-5 text-2xl font-bold">
                  <div className="py-1 flex justify-center  mt-[-90px]">
                    <Image src={success} alt="not found" />
                  </div>
                </div>
                <div className="px-7 pb-4 mt-[20px] text-[#51CC64] text-3xl font-bold">
                  Password Changed !
                </div>
                <div className="px-7 pb-4 text-inUseGray">
                  Your password has been change successfully .
                </div>
                <div className="w-full px-16 mt-[30px] mb-2">
                  <Button className="w-full py-2 border rounded-xl text-white bg-primary">
                    <Link href="/login" className="w-[100%] h-[100%]">Back to Login</Link>
                  </Button>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ChangePassworkComplete;
