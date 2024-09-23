import React, { useState } from "react";
import shortAnswerIcon from "../../../../../../../public/icon/shortAnswerIcon.svg";
import paragraph from "../../../../../../../public/icon/paragraph.svg";
import multipleChoice from "../../../../../../../public/icon/multipleChoice.svg";
import checkBox from "../../../../../../../public/icon/checkBox.svg";
import dropDown from "../../../../../../../public/icon/dropDown.svg";
import fileUpload from "../../../../../../../public/icon/fileUpload.svg";
import Image from "next/image";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";

const ChooseQuesttionTypeComponent = ({
  taskType,
  pageX,
  pageY,
  openOptionQuestion,
  formId,
  handleTypeChange,
}) => {
  function handleOpenForm(e) {
    var type = Number(e);
    handleTypeChange(formId, type);
  }
  return (
    <Modal
      isOpen={true}
      backdrop="transparent"
      onClose={openOptionQuestion}
      className={`${taskType == "examination" ? "h-[200px]" : "h-[200px]"} border-none min-w-[293px] w-[293px]`}
      style={{
        position: "absolute",
        left: pageX + 80,
        top: pageY - 100,
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="p-0 m-0">
              <div className={`w-[293px] mb-[20px] rounded-xl ${taskType == "examination" ? "h-[200px]" : "h-[200px]"}  border-2 text-inUseGray cursor-pointer hover:shadow-sd`}>
                <div className={`w-[100%] ${taskType == "examination" ? "h-[100%]" : "h-[100%]"}  float-left ${taskType == "examination" ? "border-b-0" : "border-b-0"} relative overflow-hidden`}>
                  <div
                    className="w-[100%] h-[30%] hover:bg-blue-100 hover:rounded-r-[10px] absolute top-[10px] flex items-center px-[15px]"
                    data-id="3"
                    onClick={(e) =>
                      handleOpenForm(e.currentTarget.getAttribute("data-id"))
                    }
                  >
                    <Image src={multipleChoice} alt="" className=" mr-[10px]" />{" "}
                    Multi Choice
                  </div>
                  <div
                    className="w-[100%] h-[30%] hover:bg-blue-100 hover:rounded-r-[10px] absolute bottom-[33%] flex items-center px-[15px]"
                    data-id="4"
                    onClick={(e) =>
                      handleOpenForm(e.currentTarget.getAttribute("data-id"))
                    }
                  >
                    <Image src={checkBox} alt="" className=" mr-[10px]" />{" "}
                    CheckBoxs
                  </div>
                  <div
                    className="w-[100%] h-[30%] hover:bg-blue-100 hover:rounded-r-[10px] absolute bottom-0 flex items-center px-[15px]"
                    data-id="5"
                    onClick={(e) =>
                      handleOpenForm(e.currentTarget.getAttribute("data-id"))
                    }
                  >
                    <Image src={dropDown} alt="" className=" mr-[10px]" />{" "}
                    Drop-Down
                  </div>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ChooseQuesttionTypeComponent;
