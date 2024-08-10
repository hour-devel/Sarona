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
      className={`${taskType == "examination" ? "h-[300px]" : "h-[300px]"} border-none min-w-[293px] w-[293px]`}
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
              <div className={`w-[293px] mb-[20px] rounded-xl ${taskType == "examination" ? "h-[300px]" : "h-[300px]"}  border-2 text-inUseGray cursor-pointer hover:shadow-sd`}>
                <div className={`w-[100%] ${taskType == "examination" ? "h-[30%]" : "h-[30%]"}  float-left border-b-2 relative overflow-hidden`}>
                  <div
                    className="w-[100%] hover:bg-blue-100 hover:rounded-r-[10px] h-[70%] absolute mt-[15px] flex items-center px-[15px]"
                    data-id="1"
                    onClick={(e) =>
                      handleOpenForm(e.currentTarget.getAttribute("data-id"))
                    }
                  >
                    <Image
                      src={shortAnswerIcon}
                      alt=""
                      className="mt-[10px] mr-[10px]"
                    />{" "}
                    Short answer
                  </div>
                  {/* <div
                    className="w-[100%] h-[45%] hover:bg-blue-100 hover:rounded-r-[10px] absolute bottom-0 flex items-center px-[15px]"
                    data-id="2"
                    onClick={(e) =>
                      handleOpenForm(e.currentTarget.getAttribute("data-id"))
                    }
                  >
                    <Image src={paragraph} alt="" className=" mr-[10px]" />{" "}
                    Paragrah
                  </div> */}
                </div>
                <div className={`w-[100%] ${taskType == "examination" ? "h-[70%]" : "h-[70%]"}  float-left ${taskType == "examination" ? "border-b-" : "border-b-2"} relative overflow-hidden`}>
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
                {/* {taskType == "assignment" ? (
                  <div className={`w-[100%] ${taskType != "examination" ? "h-[20%]" : ""}  float-left relative overflow-hidden`}>
                    <div
                      className="w-[100%] hover:bg-blue-100 hover:rounded-r-[10px] h-[75%] z-20 flex items-center px-[15px]"
                      data-id="6"
                      onClick={(e) =>
                        handleOpenForm(e.currentTarget.getAttribute("data-id"))
                      }
                    >
                      <Image
                        src={fileUpload}
                        alt=""
                        className=" mr-[10px] z-10"
                      />{" "}
                      File Upload
                    </div>
                  </div>
                ) : (
                  ""
                )} */}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ChooseQuesttionTypeComponent;
