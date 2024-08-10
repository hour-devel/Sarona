"use client";



import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import React from "react";
import success from "../../../../public/icon/success.svg";
import Image from "next/image";
import Link from "next/link";

const RegisterSuccessComponent = ({ Model }) => {
  return (
    <Modal isOpen={true} onClose={Model} placement="top-center">
      <ModalContent className="overflow-visible bg-transparent h-[370px]">
        {(onClose) => (
          <>
            <ModalBody className="flex justify-center items-center py-[20px]">
              <div className="left-[5px] w-[578px] bg-white rounded-2xl text-center h-[100%] py-5">
                <div className=" px-6 pb-5 text-2xl font-bold">
                  <div className="py-1 flex justify-center mt-[-90px]">
                    <Image src={success} alt="not found" />
                  </div>
                </div>
                <div className="pb-4 text-[#51CC64] mt-5 text-[32px] font-bold">
                  REGISTRATION SUCCESS
                </div>
                <div className="pb-4 text-inUseGray">
                  Your account has been successfully created.
                </div>
                <div className="w-full px-16 mt-6 mb-2">
                  <Button className="w-full py-2 border rounded-xl text-white bg-primary">
                    {/* <Link href="/userInfo" className="w-[100%] h-[100%]"> */}
                      OK
                    {/* </Link> */}
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

export default RegisterSuccessComponent;
