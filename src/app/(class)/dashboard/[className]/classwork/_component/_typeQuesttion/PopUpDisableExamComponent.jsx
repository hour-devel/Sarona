import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const PopUpDisableExamComponent = ({ setAttempt }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let timer;
    // if (isOpen) {
    timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);
    // }
    if (count == 30000) {
      setAttempt();
      setCount(0);
    }
    return () => { 
      clearTimeout(timer);
    };
  }, [count]);

  ///
  return (
    <Modal isOpen={true}>
      <ModalContent className="bg-red-400 h-[100px] max-w-[500px] w-[500px] text-white">
        {(onClose) => (
          <>
            <ModalBody className="w-[100%] p-0 m-0 relative">
              <div className="w-[100%] h-[100px] float-left bg-orange-400">
                <div className="w-[20%] h-[100%] bg-black float-left">1</div>
                <div className="w-[50%] h-[100%] bg-blue-300 float-left px-[10px] py-[10px]">
                    <h1>Warning</h1>
                </div>
                <div className="w-[30%] h-[100%] bg-green-300 float-left">
                  3
                </div>
                {/* You're Cheating on Exam this is the first time warning to you, please don't do it again !!! */}
                {/* <p className="text-3xl text-center">{count}</p> */}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PopUpDisableExamComponent;
