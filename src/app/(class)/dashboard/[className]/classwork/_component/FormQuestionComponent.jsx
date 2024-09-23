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
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import x from "../../../../../../../public/icon/x.svg";
import Image from "next/image";
import WhQuestionComponent from "./_typeQuesttion/WhQuestionComponent";
import DropDownQuesttionComponent from "./_typeQuesttion/DropDownQuesttionComponent";
import {
  checkAnswerAction,
  getAllUserExamAction,
} from "@/action/classAction";
import RadioQuestionComponent from "./_typeQuesttion/RadioQuestionComponent";
import CheckBoxQuestionComponent from "./_typeQuesttion/CheckBoxQuestionComponent";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const FormQuestionComponent = ({ studentId, classworkId, classId, model }) => {
  const { register, handleSubmit } = useForm();
  const [ans, setAns] = useState([]);
  const [feedback, setFeedback] = useState("");

  // get user has been exam already
  const [userExam, setUserExam] = useState();
  const handleUsersExam = async () => {
    const allUserExam = await getAllUserExamAction(classworkId);
    {
      allUserExam?.payload.map((data) => {
        if (data?.submitBy?.userId === studentId) {
          setUserExam(data);
        }
      });
    }
  };
  useEffect(() => {
    handleUsersExam();
    console.log("User Exam :",userExam);
  }, []);

  // dynamic answer
  const [dynamicAnswer, setDynamicAnswer] = useState([]);

  // value of dynamic answer
  // const handleDynamicAnswer = (data) => {
  //   // Check if the answer already exists
  //   const existingAnswerIndex = dynamicAnswer.findIndex(
  //     (answer) => answer.no === data.no
  //   );
  //   if (existingAnswerIndex !== -1) {
  //     // If the answer already exists, update it
  //     const updatedAnswers = [...dynamicAnswer];
  //     updatedAnswers[existingAnswerIndex] = data;
  //     setDynamicAnswer(updatedAnswers);
  //   } else {
  //     // If the answer doesn't exist, add it
  //     setDynamicAnswer([...dynamicAnswer, data]);
  //   }
  // };

  const handleDynamicAnswer = (data) => {
    // Check if the incoming data is valid based on the specified criteria
    if (
      data?.no !== "" &&
      data?.score !== "" &&
      !(data?.answers?.length === 1 && data?.answers[0] === "")
    ) {
      setDynamicAnswer((prevAnswers) => {
        const existingAnswerIndex = prevAnswers.findIndex(
          (answer) => answer?.no === data?.no
        );

        console.log("existingAnswerIndex :",existingAnswerIndex);
        
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

  const formatAnswers = (answers) => {
    return Object.keys(answers).map((key) => ({
      answers: answers[key]?.answers.flat(),
      score: answers[key]?.score,
      no: answers[key]?.no?.toString(),
    }));
  };

  const onSubmit = async (data) => {
    const formattedAnswers = formatAnswers(dynamicAnswer);
    console.log("formattedAnswers :",formattedAnswers);

    console.log("dynamicAnswer :",dynamicAnswer);
    
    
    const checkingAnswer = dynamicAnswer.filter(
      (answer) =>
        answer?.score !== "" && answer?.no !== "" && answer !== undefined
    );
    const checkAnswerValue = {
      answerForm: checkingAnswer,
      comment: data?.comment,
    };
    const answerId = userExam?.answerId;
    console.log("value before check : ", checkAnswerValue);
    // setLoading(true);
    const checkAnswer = await checkAnswerAction(answerId, checkAnswerValue);
    console.log("check answer :", checkAnswer);
    if (checkAnswer?.statusCode == 200) {
      toast.success("Answer was submitted back successfully.");
      model();
    } else {
      toast.error("Failed to submit answer!");
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
              <Image
                alt=""
                src={x}
                onClick={model}
                className="absolute right-[10px] top-[10px]"
              />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Toaster />
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
                          {userExam?.classwork?.classworkTitle}
                        </h5>
                        <p className="text-[16px] mt-[8px] text-black">
                          Student's name : {userExam?.submitBy?.firstName}-
                          {userExam?.submitBy?.lastName}
                        </p>
                      </div>
                    </div>
                    {userExam?.classwork?.form.map((form) =>
                      form.typeOfQuestion == "qa" ? (
                        <WhQuestionComponent
                          handleDynamicAnswer={handleDynamicAnswer}
                          socre={userExam?.formAnswer?.map((Ans) => {
                            if (form.no == Ans.no) {
                              if (
                                form?.defaultAnswer.toString() ===
                                Ans?.answers.toString()
                              ) {
                                return form?.scores;
                              } else {
                                return 0;
                              }
                            }
                          })}
                          Ans={userExam?.formAnswer?.map((Ans) => {
                            if (form.no == Ans.no) {
                              return Ans.answers.toString();
                            }
                          })}
                          form={form}
                          formAns={userExam?.formAnswer}
                        />
                      ) : form.typeOfQuestion == "multiple" ? (
                        <RadioQuestionComponent
                          handleDynamicAnswer={handleDynamicAnswer}
                          form={form}
                          formAns={userExam?.formAnswer}
                          answerValue={userExam?.classwork?.form}
                        />
                      ) : form.typeOfQuestion == "checkbox" ? (
                        <CheckBoxQuestionComponent
                          handleDynamicAnswer={handleDynamicAnswer}
                          form={form}
                          formAns={userExam?.formAnswer}
                        />
                      ) : form.typeOfQuestion == "dropdown" ? (
                        <DropDownQuesttionComponent
                          handleDynamicAnswer={handleDynamicAnswer}
                          form={form}
                          formAns={userExam?.formAnswer}
                        />
                      ) : (
                        ""
                      )
                    )}
                    {/* {taskData?.map((data) => {
                    if (data.classworkId == classworkId) {
                      return data?.form.map((form) =>
                        form.typeOfQuestion == "qa" ? (
                          <WhQuestionComponent
                            // handleDynamicAnswer={handleDynamicAnswer}
                            form={form}
                          />
                        ) : form.typeOfQuestion == "multiple" ? (
                          <RadioQuestionComponent
                            // handleDynamicAnswer={handleDynamicAnswer}
                            form={form}
                          />
                        ) : form.typeOfQuestion == "checkbox" ? (
                          <CheckBoxQuestionComponent
                            // handleDynamicAnswer={handleDynamicAnswer}
                            form={form}
                          />
                        ) : form.typeOfQuestion == "dropdown" ? (
                          <DropDownQuesttionComponent
                            // handleDynamicAnswer={handleDynamicAnswer}
                            form={form}
                          />
                        ) : (
                          ""
                        )
                      );
                    }
                  })} */}
                    {/* Feed back */}
                    <div className="w-[100%] h-[170px] mt-[25px] rounded-[10px] bg-white shadow-small border-1 p-[20px]">
                      <div className="w-[100%] h-[15%] float-left flex justify-between text-black">
                        <p className="text-primary text-[16px] font-medium">
                          Feed back
                        </p>
                      </div>
                      <div className="w-[100%] h-[100%] float-left mt-[10px] block">
                        <Textarea
                          type="text"
                          // onChange={(e) => setFeedback(e.target.value)}
                          {...register("comment")}
                          startContent={<i class="fa-regular fa-message"></i>}
                          placeholder="add feedback for answer"
                          className="max-w-[100%] rounded-none h-[100px] mt-[10px]"
                          classNames={{
                            label: "text-black/50 dark:text-white/90",
                            input: [
                              "bg-transparent",
                              "text-black",
                              "placeholder:text-inUseGray",
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                              "hover:shadow-sd",
                              "h-[50px]",
                              "border-2",
                              "bg-[#fff]",
                              "rounded-lg",
                              "hover:border-0",
                            ],
                          }}
                        />
                      </div>
                    </div>
                    {/* action */}
                    <div className="w-[100%] h-auto py-[20px] mt-[20px] text-end">
                      {/* <Button
                        variant="light"
                        size="lg"
                        className="mr-[20px] w-[120px] text-inUseGray border-2 hover:bg-inUseGray"
                        onClick={model}
                      >
                        Draft
                      </Button> */}
                      <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        variant="light"
                        className="w-[120px] text-white bg-primary hover:bg-blue-600"
                      >
                        Send
                      </Button>
                    </div>
                  </ScrollShadow>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FormQuestionComponent;
