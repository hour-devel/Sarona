"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ScrollShadow,
} from "@nextui-org/react";
import Image from "next/image";
import feedback from "../../../../../../../public/feedback.svg";
import cancel from "../../../../../../../public/X.svg";
import CheckBoxQuestionComponent from "../_component/_typeQuesttion/CheckBoxQuestionComponent";
import WhQuestionComponent from "../_component/_typeQuesttion/WhQuestionComponent";
import FileUploadQuesttionComponent from "../_component/_typeQuesttion/FileUploadQuesttionComponent";
import DropDownQuesttionComponent from "../_component/_typeQuesttion/DropDownQuesttionComponent";
import RadioQuestionComponent from "../_component/_typeQuesttion/RadioQuestionComponent";
import Link from "next/link";
import { getAllClassWorkService } from "@/service/class/classWork/classwork.service";
import { usePathname, useRouter } from "next/navigation";
import { getAllClassWorkActon, postAnswerAction } from "@/action/classAction";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import PopUpDisableExamComponent from "../_component/_typeQuesttion/PopUpDisableExamComponent";
import WarningExaminationComponent from "@/app/(class)/_component/WarningExaminationComponent";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import LoadingComponent from "@/app/(auth)/_component/LoadingComponent";
import { getSession } from "next-auth/react";
import LoadingClound from "@/components/loading/LoadingClound";

const page = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const classworkId = params.classworkId;
  const currentUrl = usePathname();
  const backUrl = currentUrl.split("/").slice(0, -1).join("/");
  // state to open disable exam
  const [openDisable, setOpenDisable] = useState();
  // state to set time for disable exam when have cheating
  const [attempt, setAttempt] = useState(0);
  const [disable, setDisable] = useState();
  const [userInfo, setUserInfo] = useState();
  // state to hanlde null val
  const [valid, setValid] = useState(false);
  // dynamic answer
  const [dynamicAnswer, setDynamicAnswer] = useState([]);
  const { register, handleSubmit } = useForm();
  const [ans, setAns] = useState([]);
  const [taskData, setTaskData] = useState();
  const [cheating, setCheating] = useState(false);
  const [startDate, setStartDate] = useState();
  const [dueDate, setDueDate] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const [color, setColor] = useState("black");
  const [tracking, setTracking] = useState();
  const [isExam, setIsExam] = useState();

  useEffect(() => {
    taskData?.payload.map((data) => {
      if (data.classworkId == params.classworkId) {
        setIsExam(data?.isExamination);
      }
    });
  }, [taskData]);

  useEffect(() => {
    console.log("start date : ", startDate);
  }, [startDate]);

  const defaultAnswer = {
    answers: ["Cheating"],
    score: 0,
    no: "string",
  };

  useEffect(() => {
    toggleFullScreen();
  }, []);

  const incrementAttempt = (source) => {
    setAttempt((currentAttempt) => {
      const newAttempt = currentAttempt + 1;
      console.log("New attempt:", newAttempt);

      if (newAttempt >= 4) {
        // Automatically submit if this is the 3rd attempt
        setCheating(true);
        handleSubmitAnswer();
      }
      return newAttempt;
    });
  };

  console.log("IsExam :",isExam);

  // exam tracking
  useEffect(() => {
    if (isExam) {
      console.log('working');
      const handleVisibilityChange = () => {
        document.title =
          document.visibilityState === "visible" ? "Visible" : "Hidden";
        incrementAttempt("visibility change");
      };

      const keydownHandler = (e) => {
        if (
          (e.metaKey || e.ctrlKey) &&
          ["c", "C", "v", "V", "p", "P", "r", "R"].includes(e.key)
        ) {
          e.preventDefault();
          setTracking(true);
          incrementAttempt(`keydown ${e.key}`);
        }
      };

      // const shortCutExiteFullScreen = (e) => {
      //   if (e.metaKey && e.ctrlKey && ["f", "F"].includes(e.key)) {
      //     e.preventDefault();
      //     setTracking(true);
      //     incrementAttempt(`shortCutExiteFullScreen ${e.key}`);
      //   }
      // };

      const shortCutExiteFullScreen = (e) => {
        if (
          !document.webkitIsFullScreen &&
          !document.mozFullScreen &&
          !document.msFullscreenElement
        ) {
          alert(2);
          e.preventDefault();
          setTracking(true);
          incrementAttempt(`shortCutExiteFullScreen ${e.key}`);
        }
      };

      const focusHandler = () => {
        setTracking(true);
        incrementAttempt("focus");
      };

      const blurHandler = () => {
        setTracking(true);
        incrementAttempt("blur");
      };

      const contextMenuHandler = (event) => {
        event.preventDefault();
        setTracking(true);
        incrementAttempt("right click");
      };

      window.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("focus", focusHandler);
      window.addEventListener("blur", blurHandler);
      document.addEventListener("keydown", keydownHandler);
      document.addEventListener(
        "shortCutExiteFullScreen",
        shortCutExiteFullScreen
      );
      document.addEventListener("contextmenu", contextMenuHandler);

      return () => {
        window.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("focus", focusHandler);
        window.removeEventListener("blur", blurHandler);
        document.removeEventListener("keydown", keydownHandler);
        document.removeEventListener(
          "shortCutExiteFullScreen",
          shortCutExiteFullScreen
        );
        document.removeEventListener("contextmenu", contextMenuHandler);
      };
    }
  }, [isExam]);

  // Checking if it full screen
  function getFullscreenElement() {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement
    );
  }
  function toggleFullScreen() {
    if (getFullscreenElement()) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch((e) => {
        //console.log(e);
      });
    }
  }

  async function getUserInfo() {
    const userData = await getSession();
    setUserInfo(userData);
  }
  // get current user
  useEffect(() => {
    getUserInfo();
  }, []);

  // value of dynamic answer
  const handleDynamicAnswer = (data) => {
    // Check if the answer already exists
    const existingAnswerIndex = dynamicAnswer.findIndex(
      (answer) => answer?.no === data?.no
    );
    if (existingAnswerIndex !== -1) {
      // If the answer already exists, update it
      const updatedAnswers = [...dynamicAnswer];
      updatedAnswers[existingAnswerIndex] = data;
      setDynamicAnswer(updatedAnswers);
    } else {
      // If the answer doesn't exist, add it
      setDynamicAnswer([...dynamicAnswer, data]);
    }
  };

  useEffect(() => {
    const hanldeClassWorkData = async () => {
      const classWorkData = await getAllClassWorkActon(params.className);
      setTaskData(classWorkData);
    };
    hanldeClassWorkData();
  }, []);

  const handleSubmitAnswer = async () => {
    console.log("dynamic answer : ", dynamicAnswer);
    const examAnser = dynamicAnswer.filter(
      (item) => item?.score !== "" && item?.no !== "" && item !== undefined
    );
    console.log("exam anwer :", examAnser);
    const submitExam = await postAnswerAction(classworkId, examAnser);
    console.log("submit exam : ", submitExam);
    if (submitExam?.statusCode == 201) {
      toast.success(submitExam.message);
      setLoading(false);
      toggleFullScreen();
      router.push(`${backUrl}`);
    } else {
      console.log("post erro : ", submitExam);
      setLoading(false);
      toast.error("Failed to submit submitExam");
    }
  };
  const handleDuration = () => {
    // Create Date objects from the date strings
    const start = new Date(startDate);
    const due = new Date(dueDate);
    // Calculate the difference in milliseconds
    const differenceMs = due - start;
    // Convert milliseconds to minutes
    const differenceMinutes = differenceMs / (1000 * 60);
    // Round off the minutes (optional)
    const time = Math.round(differenceMinutes) * 60;

    setTimeLeft(time);
  };
  useEffect(() => {
    handleDuration();
  }, [startDate, dueDate]);

  useEffect(() => {
    console.log("Time Left :", timeLeft);
    if (timeLeft > 0 || isNaN(timeLeft)) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      if (timeLeft <= 10) {
        setColor("red");
      }

      return () => clearInterval(timer);
    } else {
      handleSubmitAnswer();
    }
  }, [timeLeft]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}h ${minutes}m ${seconds < 10 ? `0${seconds}` : seconds}s`;
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      {loading ? (
        <LoadingClound />
      ) : (
        <div>
          {tracking && (
            <WarningExaminationComponent
              incrementAttempt={incrementAttempt}
              setTracking={() => setTracking(false)}
            />
          )}
          <Modal
            backdrop="transparent"
            isOpen={true}
            isDismissable={false}
            className="absolute left-[-24px] top-[-65px] max-w-[100%] h-[100vh] shadow-sd"
            id="popUpAnnounce"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody className="w-[100%] p-0 m-0 relative">
                    <form onSubmit={handleSubmit(handleSubmitAnswer)}>
                      <div className="ml-[97%] mt-3 mr-5">
                        {/* <Link href={backUrl} onClick={() => toggleFullScreen()}>
                          <Image
                            src={cancel}
                            alt=""
                            className="w-[40px] h-[40px] object-cover cursor-pointer"
                          ></Image>
                        </Link> */}
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
                                {taskData?.payload.map((data) => {
                                  if (data.classworkId == params.classworkId) {
                                    return data?.classworkTitle;
                                  }
                                })}
                              </h5>
                              <p className="text-[16px] mt-[8px] flex items-center text-black">
                                <span>
                                  Student's name : {userInfo?.user?.name}
                                  {/* {userInfo?.user?.userInfo?.firstName}{" "}
                              {userInfo?.user?.userInfo?.lastName} */}
                                </span>
                              </p>
                              <div
                                className="w-[200px] h-[60px] absolute right-[40px] top-[50%] translate-y-[-50%] text-[30px] flex items-center justify-center"
                                style={{ color: color }}
                              >
                                {taskData?.payload?.map((data) => {
                                  if (data?.isExamination) {
                                    if (
                                      data?.classworkId == params?.classworkId
                                    ) {
                                      setStartDate(data?.startDate);
                                      setDueDate(data?.dueDate);
                                      return formatTime(timeLeft);
                                    }
                                  }
                                })}
                              </div>
                            </div>
                          </div>

                          {/*  */}
                          {taskData?.payload.map((data) => {
                            if (data.classworkId == params.classworkId) {
                              return data?.form.map((form) =>
                                form.typeOfQuestion == "qa" ? (
                                  <WhQuestionComponent
                                    valid={valid}
                                    handleDynamicAnswer={handleDynamicAnswer}
                                    form={form}
                                  />
                                ) : form.typeOfQuestion == "multiple" ? (
                                  <RadioQuestionComponent
                                    valid={valid}
                                    handleDynamicAnswer={handleDynamicAnswer}
                                    form={form}
                                  />
                                ) : form.typeOfQuestion == "checkbox" ? (
                                  <CheckBoxQuestionComponent
                                    valid={valid}
                                    handleDynamicAnswer={handleDynamicAnswer}
                                    form={form}
                                  />
                                ) : form.typeOfQuestion == "dropdown" ? (
                                  <DropDownQuesttionComponent
                                    valid={valid}
                                    handleDynamicAnswer={handleDynamicAnswer}
                                    form={form}
                                  />
                                ) : (
                                  ""
                                )
                              );
                            }
                          })}

                          {/* Feed back */}
                          {/* <div className="w-[100%] h-[139px] mt-[25px] rounded-[10px] bg-white shadow-small border-1 p-[20px]">
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
                          </div> */}

                          {/* submite */}
                          <div className="w-[100%] h-auto py-[20px] mt-[20px] text-end">
                            {/* {loading ? (
                          <Button
                            type="text"
                            color="primary"
                            variant="shadow"
                            className="w-[85px] mt-[10px]"
                          >
                            <LoadingComponent />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            color="primary"
                            className="w-[85px] text-white bg-primary hover:bg-blue-600"
                          >
                            Submit
                          </Button>
                        )} */}
                            <Button
                              type="submit"
                              color="primary"
                              className="w-[85px] text-white bg-primary hover:bg-blue-600"
                            >
                              Submit
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
        </div>
      )}
    </>
  );
};

export default page;
