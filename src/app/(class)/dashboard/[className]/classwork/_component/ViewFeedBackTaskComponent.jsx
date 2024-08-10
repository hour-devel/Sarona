import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Radio,
  RadioGroup,
  ScrollShadow,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import pds from "../../../../../../../public/pds.svg";
import feedback from "../../../../../../../public/feedback.svg";
import cancel from "../../../../../../../public/X.svg";
import { getAllScoringByAnswerIdAction } from "@/action/classAction";
import WhQuestionComponent from "./_typeQuesttion/WhQuestionComponent";
import RadioQuestionComponent from "./_typeQuesttion/RadioQuestionComponent";
import CheckBoxQuestionComponent from "./_typeQuesttion/CheckBoxQuestionComponent";
import DropDownQuesttionComponent from "./_typeQuesttion/DropDownQuesttionComponent";
// import  from "./"
const ViewFeedBackTaskComponent = ({ model, answerId }) => {
  const [feedback, setFeedBack] = useState();
  const [dynamicAnswer, setDynamicAnswer] = useState([]);

  //console.log("answerId :",answerId);

  useEffect(() => {
    const handleFeedBack = async () => {
      const feedBackData = await getAllScoringByAnswerIdAction(answerId);
      setFeedBack(feedBackData);
    };
    handleFeedBack();
  }, []);

  console.log(
    "feedback?.payload?.answer :",
    feedback?.payload?.answer?.formAnswer
  );
  const handleDynamicAnswer = (data) => {
    // Check if the incoming data is valid based on the specified criteria
    if (
      data?.no !== "" &&
      data?.score !== "" &&
      !(data?.answers.length === 1 && data?.answers[0] === "")
    ) {
      setDynamicAnswer((prevAnswers) => {
        const existingAnswerIndex = prevAnswers.findIndex(
          (answer) => answer?.no === data?.no
        );
        if (existingAnswerIndex !== -1) {
          // If the answer already exists, update it
          return prevAnswers.map((answer, index) =>
            index === existingAnswerIndex ? data : answer
          );
        } else {
          // If the answer doesn't exist, add it
          return [...prevAnswers, data];
        }
      });
    } else {
      // Optionally, you can handle invalid data here, such as logging it or setting error messages.
      //console.log("Invalid data received:", data);
    }
  };

  return (
    <Modal
      backdrop="transparent"
      isOpen={true}
      onClose={model}
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
                  className="w-[40px] h-[40px] object-cover cursor-pointer"
                  onClick={model}
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
                    <div className="w-[100%] h-[71%] float-left px-[20px] py-3 relative">
                      <h5 className="font-bold text-black text-[24px]">
                        {feedback?.payload?.answer?.classwork?.classworkTitle}
                      </h5>
                      <p className="text-[16px] mt-[8px] text-black">
                        Student's name :{" "}
                        {feedback?.payload?.answer?.submitBy?.firstName}-
                        {feedback?.payload?.answer?.submitBy?.lastName}
                      </p>
                      <div className="w-[60px] h-[60px] absolute right-[40px] top-[50%] translate-y-[-50%] text-[30px] flex items-center justify-center">
                        {feedback?.payload?.score}
                      </div>
                    </div>
                  </div>
                  {feedback?.payload?.answer?.classwork?.form.map((form) =>
                    form.typeOfQuestion == "qa" ? (
                      <WhQuestionComponent
                        // socre={feedback?.payload}
                        scoreAns={feedback?.payload?.answer?.formAnswer?.map(
                          (Ans) => {
                            if (form.no == Ans.no) {
                              return Ans?.score;
                            }
                          }
                        )}
                        Ans={feedback?.payload?.answer?.formAnswer?.map(
                          (Ans) => {
                            if (form.no == Ans.no) {
                              return Ans.answers.toString();
                            }
                          }
                        )}
                        form={form}
                        handleDynamicAnswer={handleDynamicAnswer}
                        formAns={feedback?.payload?.answer?.formAnswer}
                      />
                    ) : form.typeOfQuestion == "multiple" ? (
                      <RadioQuestionComponent
                        form={form}
                        formAns={feedback?.payload?.answer?.formAnswer}
                        handleDynamicAnswer={handleDynamicAnswer}
                        answerValue={feedback?.payload?.answer?.classwork?.form}
                      />
                    ) : form.typeOfQuestion == "checkbox" ? (
                      <CheckBoxQuestionComponent
                        form={form}
                        handleDynamicAnswer={handleDynamicAnswer}
                        formAns={feedback?.payload?.answer?.formAnswer}
                      />
                    ) : form.typeOfQuestion == "dropdown" ? (
                      <DropDownQuesttionComponent
                        form={form}
                        handleDynamicAnswer={handleDynamicAnswer}
                        formAns={feedback?.payload?.answer?.formAnswer}
                      />
                    ) : (
                      ""
                    )
                  )}
                  {/* Feed back */}
                  {/* <div className="w-[100%] h-[139px] mt-[25px] rounded-[10px] bg-white shadow-small border-1 p-[20px]">
                    <div className="w-[100%] h-[15%] float-left flex justify-between text-black">
                      <p className="text-primary font-medium text-[16px]">
                        Feed back
                      </p>
                    </div>
                    <div className="w-[100%] h-[80%] float-left mt-[10px] block">
                      <div className="w-[373px] h-[60px] px-5 border-1 mt-4 bg-white flex items-center rounded-[10px] text-[16px]">
                        <Image
                          src={feedback}
                          className="w-[25px] h-[25px] object-cover"
                        ></Image>
                        <p className="text-inUseGray px-2 text-[16px]">
                          Feedback From teacher....
                        </p>
                      </div>
                    </div>
                  </div> */}
                </ScrollShadow>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewFeedBackTaskComponent;
