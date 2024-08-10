import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import warning from "../../../../public/warning.svg";
import Image from "next/image";

const WarningExaminationComponent = ({ setTracking,incrementAttempt }) => {
  const [count, setCount] = useState(10);
  useEffect(() => {
    let timer;
    // if (isOpen) {
    timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    // }
    if (count == 0) {
      setTracking();
      setCount(10);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [count]);
  return (
    <Modal isOpen={true} placement="top-center" size="3xl">
      <ModalContent className="h-[130px] bg-white border-orange-300 border-1 shadow-0 cursor-pointer">
        {(onClose) => (
          <>
            <ModalBody className="flex items-center">
              <div className="w-[100%] h-auto py-1 flex">
                <Image
                  src={warning}
                  alt=""
                  className="w-[70px] h-[70px] mt-[15px] object-cover"
                ></Image>
                <div className="block mt-[10px] relative">
                  <p className="text-inUseGray text-[24] font-semibold  pl-5 pt-3">
                    Warning Examination{" "}
                    <span className="absolute right-[-170px] top-[-10px] font-bold text-[30px]">{count}</span>
                  </p>
                  <p className="text-inUseGray text-[16px] font-medium pl-5 mt-2">
                    You have violated our terms and can not enter the exam
                  </p>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WarningExaminationComponent;
