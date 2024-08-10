import React from 'react'
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import disable from "../../../../public/disable.svg";
import clear from "../../../../public/clear.svg";
import Image from 'next/image';


const DisableExaminationComponent = ({openRestoreClass}) => {
  return (
    <Modal isOpen={true} placement="top-center">
    <ModalContent className="w-[312px] h-[84px] bg-red-100 border-inUseRed border-1 shadow-0">
      {(onClose) => (
        <>
          <ModalBody className="flex items-center">
            <div className="w-[100%] h-auto">
                <div className='flex justify-between py-1'> 
                  <Image src={disable} alt='' className='w-[24px] h-[24px] object-cover' ></Image>
                  <Image src={clear} alt='' className='w-[24px] h-[24px] object-cover cursor-pointer' onClick={openRestoreClass}></Image>
                 </div>
                <div className='text-inUseRed text-[14px] font-semibold py-1'>
                  <p>Your can't Continue to exam</p>
                </div>
            </div>
          </ModalBody>
        </>
      )}
    </ModalContent>
  </Modal>
  )
}

export default DisableExaminationComponent