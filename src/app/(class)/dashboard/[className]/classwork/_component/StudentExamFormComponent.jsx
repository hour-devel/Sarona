import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ScrollShadow,
} from "@nextui-org/react";
import Image from "next/image";
import feedback from "../../../../../../../public/feedback.svg";
import cancel from "../../../../../../../public/X.svg";
import RadioQuestionComponent from "./_typeQuesttion/RadioQuestionComponent";
import CheckBoxQuestionComponent from "./_typeQuesttion/CheckBoxQuestionComponent";
import WhQuestionComponent from "./_typeQuesttion/WhQuestionComponent";
import FileUploadQuesttionComponent from "./_typeQuesttion/FileUploadQuesttionComponent";
import DropDownQuesttionComponent from "./_typeQuesttion/DropDownQuesttionComponent";
const StudentExamFormComponent = ({ openStudentExamForm, data }) => {
  // const [isFullScreen, setIsFullScreen] = useState(false);

  // const toggleFullScreen = () => {
  //   if (!document.fullscreenElement) {
  //     document.documentElement.requestFullscreen().catch((err) => {
  //       console.error(
  //         `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
  //       );
  //     });
  //     setIsFullScreen(true);
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //       setIsFullScreen(false);
  //     }
  //   }
  // };

  // const closeFullscreen = () => {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   } else if (document.webkitExitFullscreen) {
  //     /* Safari */
  //     document.webkitExitFullscreen();
  //   } else if (document.msExitFullscreen) {
  //     /* IE11 */
  //     document.msExitFullscreen();
  //   }
  // };

  // if (!isFullScreen) {
  //   toggleFullScreen();
  // }

  // function handleClose() {
  //   closeFullscreen();
  //   openStudentExamForm();
  // }

  // /* detect Ctrl C and Ctrl V */
  // document.addEventListener("keydown", function (event) {
  //   if (event.ctrlKey && (event.key === "c" || event.key === "C")) {
  //     //console.log("You are cheating on Ctrl C");
  //   }
  //   if (event.ctrlKey && (event.key === "v" || event.key === "V")) {
  //     //console.log("You are cheating on Ctrl V");
  //   }
  // });

  // //  detect user switch tab,window,lost focus
  // window.onblur = function () {
  //   //console.log("Your are cheating");
  // };
  // window.onfocus = function () {
  //   //console.log("do not do it again");
  // };

  // /** TO DISABLE SCREEN CAPTURE **/
  // document.addEventListener("keyup", (e) => {
  //   if (e.key == "PrintScreen") {
  //     navigator.clipboard.writeText("");
  //     alert("Screenshots disabled!");
  //   }
  // });

  // /** TO DISABLE PRINTS WHIT CTRL+P **/
  // document.addEventListener("keydown", (e) => {
  //   if (e.ctrlKey && e.key == "p") {
  //     alert("This section is not allowed to print or export to PDF");
  //     // e.cancelBubble = true;
  //     // e.preventDefault();
  //     // e.stopImmediatePropagation();
  //   }
  // });
  // // prevent ESC key
  // document.onkeydown = function (e) {
  //   if (e.key == 27){
  //     alert(1);
  //     e.preventDefault();
  //   }
  // };

  return (
    <Modal
      backdrop="transparent"
      isOpen={true}
      className="absolute left-[-24px] top-[-65px] max-w-[100%] h-[100vh] shadow-sd"
      id="popUpAnnounce"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="w-[100%] p-0 m-0 relative">
              <div className="ml-[97%] mt-3 mr-5">
                <Image
                  src={cancel}
                  alt=""
                  className="w-[40px] h-[40px] object-cover cursor-pointer"
                  onClick={handleClose}
                ></Image>
              </div>
              <div className="w-[80%] h-[95%] absolute left-[50%] translate-x-[-50%] bottom-0">
                <ScrollShadow
                  hideScrollBar
                  className="w-[100%] h-[100%] overflow-y-scroll float-left px-[100px] pb-[20px]"
                >
                  {/* header form */}
                  <div className="w-[100%] h-[140px] rounded-xl bg-white shadow-sd">
                    <div className="w-[100%] h-[19%] bg-primary rounded-[20px] relative float-left">
                      <div className="absolute left-0 bottom-0 bg-white h-[50%] w-[100%]"></div>
                    </div>
                    <div className="w-[100%] h-[71%] float-left px-[20px] py-3">
                      <h5 className="font-bold text-black text-[24px]">
                        {data?.classworkTitle} # 01
                      </h5>
                      <p className="text-[16px] mt-[8px] text-black">
                        Student's name : Ly houy
                      </p>
                    </div>
                  </div>
                  
                  {data?.form.map((form) =>
                    form.typeOfQuestion == "qa" ? (
                      <WhQuestionComponent form={form} />
                    ) : form.typeOfQuestion == "multiple" ? (
                      <RadioQuestionComponent form={form} />
                    ) : form.typeOfQuestion == "checkbox" ? (
                      <CheckBoxQuestionComponent form={form} />
                    ) : form.typeOfQuestion == "dropdown" ? (
                      <DropDownQuesttionComponent form={form} />
                    ) : (
                      ""
                    )
                  )}

                  {/* Feed back */}
                  <div className="w-[100%] h-[139px] mt-[25px] rounded-[10px] bg-white shadow-small border-1 p-[20px]">
                    <div className="w-[100%] h-[15%] float-left flex justify-between text-black">
                      <p className="text-primary font-medium text-[16px]">
                        Feedback
                      </p>
                    </div>
                    <div className="w-[100%] h-[75%] float-left block">
                      <div className="w-[100%] h-[80%] float-left mt-[10px] py-5  relative top-0">
                        <div className="w-[40%] h-[62px] border-1 bg-white flex items-center rounded-[10px] text-[16px] cursor-pointer">
                          <Image
                            src={feedback}
                            alt=""
                            className="ml-3 w-[30px] h-[30px] absolute top-[40px]"
                          ></Image>
                          <input
                            type="text"
                            placeholder="add feedback for answer"
                            className="w-[100%] h-[100%] ml-16"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* submite */}
                  <div className="w-[100%] h-auto py-[20px] mt-[20px] text-end">
                    <Button
                      color="primary"
                      // variant="light"
                      className="w-[85px] text-white bg-primary hover:bg-blue-600"
                    >
                      Submit
                    </Button>
                  </div>
                </ScrollShadow>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default StudentExamFormComponent;
