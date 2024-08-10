"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ScrollShadow,
  Switch,
  Textarea,
  PopoverTrigger,
  PopoverContent,
  Popover,
  DatePicker,
  TimeInput,
} from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { HiClock } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import InputComponent from "@/app/(auth)/_component/InputComponent";
import MultiChoiceComponent from "./MultiChoiceComponent";
import ShortAnswerComponent from "./ShortAnswerComponent";
import CheckBoxComponent from "./CheckBoxComponent";
import ParagraphComponent from "./ParagraphComponent";
import DropDownComponent from "./DropDownComponent";
import FileUploadComponent from "./FileUploadComponent";
import SelectSubjectComponent from "../../material/_component/SelectSubjectComponent";
import SelectClassToAsignComponent from "../../material/_component/SelectClassToAsignComponent";
import allowLate from "../../../../../../../public/icon/allowLate.svg";
import { Controller, Form, useForm } from "react-hook-form";
import {
  getSubjectBySubjectIdAction,
  postClassWorkActon,
} from "@/action/classAction";
import toast, { Toaster } from "react-hot-toast";
import { convertDate } from "@/components/function/ConvertDate";
import { validateTime } from "@/components/function/ValidateTime";
import { validateFutureDate } from "@/components/function/ValidateDate";

const CreateFormExaminationComponent = ({ data, title, model, params }) => {
  const [isAllow, setIsAllow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { control, register, handleSubmit } = useForm();
  const [task, setTask] = useState({});
  const [dynamicAnswer, setDynamicAnswer] = useState([]);
  const [subjectId, setSubjectId] = useState();
  const [classId, setClassId] = useState([]);
  const [missingFields, setMissingFields] = useState();
  const [missingForm, setMissingForm] = useState(false);
  const [missingSubjectId, setMissingSubjectId] = useState(false);
  const [missingClassId, setMissingClassId] = useState(false);
  const [examdDate, setExamDate] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeError, setTimeError] = useState("");

  const handleChangeRole = () => {
    setIsAllow(!isAllow);
  };

  const defaultTime = {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };

  const [forms, setForms] = useState([
    {
      id: 1,
      type: 1,
      data: {},
    },
  ]);

  // value of dynamic answer
  const handleDynamicAnswer = (data) => {
    // Check if the answer already exists
    const existingAnswerIndex = dynamicAnswer?.findIndex(
      (answer) => answer.no === data.no
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

  // Validaion form not to be empty
  useEffect(() => {
    if (isSubmit) {
      if (dynamicAnswer.length == forms.length) {
        setMissingForm(false);
      } else {
        setMissingForm(true);
      }
    }
  }, [isSubmit, dynamicAnswer, forms]);

  // handle class ID
  const handleClassID = (assignClassId) => {
    setClassId([...assignClassId]);
  };
  // Validate to select class id
  useEffect(() => {
    if (isSubmit) {
      if (classId.length == 0) {
        setMissingClassId(true);
      } else {
        setMissingClassId(false);
      }
    }
  }, [isSubmit, classId]);

  // handle subject ID
  const handleSubject = (assignSubject) => {
    setSubjectId(assignSubject);
    setMissingSubjectId(false);
  };
  // Validate to select subject id
  useEffect(() => {
    if (isSubmit) {
      setMissingSubjectId(!subjectId);
    }
  }, [isSubmit, subjectId]);

  // Add New form Q&A
  const addForm = () => {
    const newForm = {
      id: forms.length + 1,
      type: 1,
      data: {},
    };
    setForms([...forms, newForm]);
  };
  // change form question type
  const handleTypeChange = (id, type) => {
    const updatedForms = forms.map((form) => {
      if (form.id === id) {
        const newForm = { ...form, type };
        return newForm;
      }
      return form;
    });
    setForms(updatedForms);
  };
  // copy form question type
  const handleCopyForm = (id) => {
    forms.map((form) => {
      if (form.id === id) {
        const newObj = { ...form, id: forms.length + 1 };
        setForms([...forms, newObj]);
        return newObj;
      }
    });
  };
  // delete form question type
  const handleDeleteForm = (id) => {
    const newFormObject = forms.filter((e, ind) => {
      return ind != id - 1;
    });
    forms.splice(id - 1, 1);
    setForms(newFormObject);
  };

  // Handlers for setting start and end time based on user input
  const handleStartTime = (time) => {
    const startTime = {
      hour: time?.hour || 0, // Default to 0 if undefined
      minute: time?.minute || 0,
      second: time?.second || 0,
    };
    setStartTime(startTime);
  };

  const handleEndTime = (time) => {
    const endTime = {
      hour: time?.hour || 0, // Default to 0 if undefined
      minute: time?.minute || 0,
      second: time?.second || 0,
    };
    setEndTime(endTime);
  };

  const taskType = "examination";
  const renderForm = (form) => {
    const commonProps = {
      taskType,
      key: form.id,
      formId: form.id,
      handleTypeChange,
      handleCopyForm,
      handleDeleteForm,
      currentType: form.type,
      handleDynamicAnswer,
    };
    switch (form.type) {
      case 1:
        return <ShortAnswerComponent {...commonProps} />;
      case 3:
        return <MultiChoiceComponent {...commonProps} />;
      case 4:
        return <CheckBoxComponent {...commonProps} />;
      case 5:
        return <DropDownComponent {...commonProps} />;
      default:
        return null;
    }
  };
  // task assign
  async function onSubmit(data) {
    setIsSubmit(true);
    let fields = [];
    if (!data.taskTitle) fields.push("TaskTitle");
    if (!data.totalsocres) fields.push("TotalScore");
    if (!examdDate) fields.push("ExamDate");
    if (!startTime) fields.push("StartTime");
    if (!endTime) fields.push("EndTime");

    // Validate Start time must be before end time
    if (!fields.includes("StartTime") && !fields.includes("EndTime")) {
      if (validateTime(startTime, endTime)) {
        setTimeError("Start time is before end time.");
      } else {
        setTimeError("Start time must be before end time.");
        fields.push("StartEndTime");
      }
    }

    // validate date picker and current date
    const examDate = convertDate(examdDate, startTime).toISOString();
    const validateDate = validateFutureDate(examDate);
    if (!validateDate) {
      fields.push("FuturDate");
    }

    // Validate selected Class
    if (classId.length == 0) {
      fields.push("ClassID");
      setMissingClassId(true);
    } else {
      setMissingClassId(false);
    }
    // Validate selected Subject
    if (!subjectId) {
      setMissingSubjectId(true);
    } else {
      setMissingSubjectId(false);
    }
    // Validate dynamic answer
    if (!dynamicAnswer || dynamicAnswer.length === 0) {
      fields.push("Form");
      setMissingForm(true);
    } else {
      setMissingForm(false);
    }
    if (fields.length > 0) {
      setMissingFields(fields);
      toast.error(
        ` Oops! Looks like You haven't completed all the required fields`
      );
    } else {
      function convertDateToUTC(dateString, timeString) {
        const [hour, minute, second] = timeString.split(":").map(Number);
        // Create a new Date object and set the time
        const date1 = new Date();
        date1.setHours(hour);
        date1.setMinutes(minute);
        date1.setSeconds(second);
        date1.setMilliseconds(0);
        const formattedTime = date1.toTimeString().split(" ")[0];
        const date = `${dateString}T${formattedTime}Z`;
        return date;
      }

      const newTask = {
        classworkTitle: data.taskTitle,
        instruction: data.instruction,
        form: [...dynamicAnswer],
        totalScore: data.totalsocres,
        allowLate: true,
        isExamination: true,
        // startDate: convertDate(examdDate, startTime).toISOString(),
        // dueDate: convertDate(examdDate, endTime).toISOString(),
        // duration: convertDate(examdDate, endTime).toISOString(),

        startDate: convertDateToUTC(
          new Date(examdDate).toISOString().split("T")[0],
          `${startTime.hour}:${startTime.minute}:${startTime.second}`
        ),
        dueDate: convertDateToUTC(
          new Date(examdDate).toISOString().split("T")[0],
          `${endTime.hour}:${endTime.minute}:${endTime.second}`
        ),
        duration: convertDateToUTC(
          new Date(examdDate).toISOString().split("T")[0],
          `${endTime.hour}:${endTime.minute}:${endTime.second}`
        ),
        classId: classId,
      };

      const createExam = await postClassWorkActon(subjectId, newTask);
      //console.log("create exam :", createExam);
      if (createExam?.statusCode == 201) {
        toast.success("Exam has been created successfully");
        model();
      } else if (createExam?.status == 404) {
        toast.error(
          "Subject not contain in class. Please unselect the class !"
        );
      } else {
        toast.error("Failed to create the exam.");
      }
    }
  }
  return (
    <Modal
      backdrop="transparent"
      isOpen={true}
      onClose={model}
      isDismissable={false}
      className="absolute left-[-24px] top-[-65px] max-w-[100%] h-[100vh] shadow-sd"
      id="popUpAnnounce"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="w-[100%] p-0 m-0 relative">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Toaster />
                </div>
                <div className="w-[100%] h-[100vh] px-[20px] py-[20px]">
                  <ScrollShadow
                    hideScrollBar
                    className="w-[100%] h-[100%] float-left pb-[30px] px-[10px]"
                  >
                    {/* left side form */}
                    <div className="w-[70%] h-[100%] float-left z-50">
                      <div className="w-[94%] h-[100%] float-left pb-[20px] px-[10px]">
                        <h2 className="font-bold text-[24px] text-primary">
                          {title} Examination
                        </h2>
                        {/* title */}
                        <div className="w-[100%] float-left mt-[10px]">
                          <p className="mb-[15px] text-[16px] text-inUseGray">
                            Title
                          </p>
                          <Input
                            {...register("taskTitle")}
                            value={data?.classworkTitle}
                            placeholder={data?.classworkTitle}
                            name="taskTitle"
                            type="text"
                            label={
                              <div className="text-[#757575] opacity-60 text-[12px] flex items-center ">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="flex justify-center items-center"
                                >
                                  <path
                                    d="M19.1979 22.4002H1.59983V4.80198H12.1747L13.7745 3.20215H1.59983C1.17553 3.20215 0.768604 3.3707 0.468578 3.67073C0.168553 3.97076 0 4.37768 0 4.80198V22.4002C0 22.8245 0.168553 23.2314 0.468578 23.5314C0.768604 23.8315 1.17553 24 1.59983 24H19.1979C19.6222 24 20.0292 23.8315 20.3292 23.5314C20.6292 23.2314 20.7978 22.8245 20.7978 22.4002V10.4014L19.1979 12.0012V22.4002Z"
                                    fill="#CCCCCC"
                                  />
                                  <path
                                    d="M23.6206 3.07418L20.9249 0.378456C20.8053 0.258492 20.6632 0.163313 20.5067 0.0983707C20.3502 0.0334286 20.1824 0 20.013 0C19.8436 0 19.6758 0.0334286 19.5194 0.0983707C19.3629 0.163313 19.2208 0.258492 19.1011 0.378456L8.13431 11.4093L7.2464 15.2569C7.20857 15.4434 7.21255 15.636 7.25805 15.8208C7.30354 16.0056 7.38942 16.178 7.50951 16.3256C7.6296 16.4732 7.78092 16.5924 7.95258 16.6746C8.12423 16.7567 8.31196 16.7998 8.50227 16.8008C8.60062 16.8116 8.69987 16.8116 8.79823 16.8008L12.6778 15.9449L23.6206 4.89799C23.7406 4.77836 23.8358 4.63623 23.9007 4.47975C23.9657 4.32326 23.9991 4.15551 23.9991 3.98608C23.9991 3.81666 23.9657 3.64891 23.9007 3.49242C23.8358 3.33594 23.7406 3.19381 23.6206 3.07418ZM11.8459 14.465L8.91822 15.1129L9.59815 12.2092L17.8533 3.89809L20.109 6.15386L11.8459 14.465ZM21.0129 5.24996L18.7572 2.99419L19.997 1.73032L22.2688 4.00208L21.0129 5.24996Z"
                                    fill="#CCCCCC"
                                  />
                                </svg>
                                &nbsp; Examination title
                              </div>
                            }
                            classNames={{
                              label: "text-black/50 dark:text-white/90",
                              input: [
                                "bg-transparent",
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-black dark:placeholder:text-black",
                              ],
                              innerWrapper: "bg-transparent",
                              inputWrapper: [
                                "hover:shadow-sd",
                                "bg-white",
                                "dark:bg-white",
                                "border-2",
                                "hover:border-0",
                                "hover:bg-white",
                                "dark:hover:bg-white",
                              ],
                            }}
                          />
                          {missingFields?.includes("TaskTitle") && (
                            <span className="text-red-500 text-sm">
                              Title is required
                            </span>
                          )}
                        </div>
                        {/* select subject */}
                        <div className="w-[49%] float-left mt-[10px]">
                          <p className="text-[16px] text-inUseGray mb-[15px]">
                            Subject
                          </p>
                          <SelectSubjectComponent
                            subjectId={data?.subjectId}
                            handleSubject={handleSubject}
                            classId={params}
                            valid={register}
                          />
                          {missingSubjectId && (
                            <span className="text-red-500 text-sm">
                              Please Select the Subject
                            </span>
                          )}
                        </div>
                        {/* assign to classs */}
                        <div className="w-[49%] float-left ml-[2%] mt-[10px]">
                          <p className="text-[16px] text-inUseGray mb-[15px]">
                            Assign to Class
                          </p>
                          <SelectClassToAsignComponent
                            handleClassID={handleClassID}
                            valid={register}
                          />
                          {missingClassId && (
                            <span className="text-red-500 text-sm">
                              Please Select the Class
                            </span>
                          )}
                        </div>
                        {/* Instructure */}
                        <div className="w-[100%] float-left mt-[10px]">
                          <p className="text-[16px] text-inUseGray mb-[15px]">
                            Instruction
                          </p>
                          <Textarea
                            {...register("instruction")}
                            name="instruction"
                            value={data?.instruction}
                            label={
                              <div className="text-[#757575] opacity-60 text-[12px] flex items-center">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="flex justify-center items-center mr-[10px]"
                                >
                                  <path
                                    d="M19.1979 22.4002H1.59983V4.80198H12.1747L13.7745 3.20215H1.59983C1.17553 3.20215 0.768604 3.3707 0.468578 3.67073C0.168553 3.97076 0 4.37768 0 4.80198V22.4002C0 22.8245 0.168553 23.2314 0.468578 23.5314C0.768604 23.8315 1.17553 24 1.59983 24H19.1979C19.6222 24 20.0292 23.8315 20.3292 23.5314C20.6292 23.2314 20.7978 22.8245 20.7978 22.4002V10.4014L19.1979 12.0012V22.4002Z"
                                    fill="#CCCCCC"
                                  />
                                  <path
                                    d="M23.6206 3.07418L20.9249 0.378456C20.8053 0.258492 20.6632 0.163313 20.5067 0.0983707C20.3502 0.0334286 20.1824 0 20.013 0C19.8436 0 19.6758 0.0334286 19.5194 0.0983707C19.3629 0.163313 19.2208 0.258492 19.1011 0.378456L8.13431 11.4093L7.2464 15.2569C7.20857 15.4434 7.21255 15.636 7.25805 15.8208C7.30354 16.0056 7.38942 16.178 7.50951 16.3256C7.6296 16.4732 7.78092 16.5924 7.95258 16.6746C8.12423 16.7567 8.31196 16.7998 8.50227 16.8008C8.60062 16.8116 8.69987 16.8116 8.79823 16.8008L12.6778 15.9449L23.6206 4.89799C23.7406 4.77836 23.8358 4.63623 23.9007 4.47975C23.9657 4.32326 23.9991 4.15551 23.9991 3.98608C23.9991 3.81666 23.9657 3.64891 23.9007 3.49242C23.8358 3.33594 23.7406 3.19381 23.6206 3.07418ZM11.8459 14.465L8.91822 15.1129L9.59815 12.2092L17.8533 3.89809L20.109 6.15386L11.8459 14.465ZM21.0129 5.24996L18.7572 2.99419L19.997 1.73032L22.2688 4.00208L21.0129 5.24996Z"
                                    fill="#CCCCCC"
                                  />
                                </svg>
                                Instruction (optional)
                              </div>
                            }
                            className="col-span-12"
                            classNames={{
                              input: ["text-[#757575]"],
                              innerWrapper: "bg-transparent",
                              inputWrapper: [
                                "position:relative",
                                "hover:shadow-sd",
                                "bg-default-200/50",
                                "py-[10px]",
                                "min-h-20",
                                "dark:bg-white",
                                "border-2",
                                "hover:border-white",
                                "hover:bg-black",
                                "dark:hover:bg-white",
                              ],
                            }}
                          />
                        </div>
                        {/* filter form and copy form */}
                        {title == "Edit"
                          ? data?.form?.map((form) => {
                            const commonProps = {
                              taskType,
                              key: form.id,
                              formId: form.id,
                              handleTypeChange,
                              handleCopyForm,
                              handleDeleteForm,
                              currentType: form.type,
                              handleDynamicAnswer,
                              form: form,
                              title,
                            };
                            switch (form?.typeOfQuestion) {
                              case "qa":
                                return (
                                  <ShortAnswerComponent {...commonProps} />
                                );
                              case "multiple":
                                return (
                                  <MultiChoiceComponent {...commonProps} />
                                );
                              case "checkbox":
                                return <CheckBoxComponent {...commonProps} />;
                              case "dropdown":
                                return <DropDownComponent {...commonProps} />;
                              default:
                                return null;
                            }
                          })
                          : forms.map((form) => (
                            <div key={form.id}>{renderForm(form)}</div>
                          ))}
                        {/* add more question */}
                        <div className="w-[100%] float-left pb-[30px] mt-[30px] flex justify-center">
                          <Button
                            className="border-none z-50 cursor-pointer  min-w-[32px] text-white rounded-full bg-primary h-[32px] px-0 py-0"
                            onClick={() => addForm()}
                          >
                            <i className="fa-solid fa-plus text-[20px]"></i>
                          </Button>
                          {missingForm && (
                            <span className="text-red-500 text-sm mt-2.5 ml-3">
                              Please ensure the dynamic form is completely
                              filled out.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* right side form */}
                    <div className="w-[30%] h-[580px] mt-[15px] float-left relative z-0 overflow-y-auto">
                      <div className="w-[100%] overflow-y-auto h-[500px] absolute left-[50%] px-[20px] py-[20px] translate-x-[-50%] top-[70px] rounded-lg overflow-hidden shadow-sd">
                        <div className="w-[100%] float-left mt-[25px]">
                          <p className="text-[16px] text-inUseGray mb-[10px]">
                            Total socres
                          </p>
                          <InputComponent
                            valid={register}
                            name="totalsocres"
                            label="Total socres"
                          />
                          {missingFields?.includes("TotalScore") && (
                            <span className="text-red-500 text-sm">
                              Total Score is required
                            </span>
                          )}
                        </div>
                        {/* schedule */}
                        <div className="w-[100%] float-left mt-[25px]">
                          <p className="text-[16px] text-inUseGray mb-[10px]">
                            Exam Date
                          </p>
                          <DatePicker
                            dateFormat="dd-MM-yyyy h:mm"
                            className="rounded-[15px]"
                            label="Exam Date"
                            onChange={(date) => setExamDate(date)}
                            selected={examdDate}
                          />
                        </div>
                        {missingFields?.includes("ExamDate") && (
                          <span className="text-red-500 text-sm">
                            The exam date must be today or in the future
                          </span>
                        )}
                        {missingFields?.includes("FuturDate") && (
                          <span className="text-red-500 text-sm">
                            Exam Date is required
                          </span>
                        )}

                        {/* Due */}
                        <div className="w-[100%] float-left mt-[25px]">
                          <p className="text-[16px] text-inUseGray mb-[10px]">
                            Duration
                          </p>
                          {/* <DatePicker
                            innerRef={register}
                            value={dueDate}
                            isDismissable={false}
                            onChange={(date) => setDueDate(date)}
                            label="Due Date"
                            className="rounded-[15px]"
                            showMonthAndYearPickers
                            variant="bordered"
                          /> */}
                          <div className="flex justify-between flex-wrap ">
                            <section>
                              <TimeInput
                                className="w-[195px]"
                                label="Start Time"
                                defaultValue={defaultTime}
                                onChange={handleStartTime}
                                endContent={
                                  <div>
                                    <HiClock />
                                  </div>
                                }
                              />
                              <div>
                                {/* Other components here */}
                                {missingFields?.includes("StartTime") && (
                                  <span className="text-red-500 text-sm">
                                    Start Time is required
                                  </span>
                                )}
                                {missingFields?.includes("StartEndTime") && (
                                  <span className="text-red-500 text-sm">
                                    Start Time must be before End Time
                                  </span>
                                )}
                              </div>
                            </section>
                            <section>
                              <TimeInput
                                className="w-[195px]"
                                label="End Time"
                                defaultValue={defaultTime}
                                onChange={handleEndTime}
                                endContent={
                                  <div>
                                    <HiClock />
                                  </div>
                                }
                              />
                              {missingFields?.includes("EndTime") && (
                                <span className="text-red-500 text-sm">
                                  End Time is required
                                </span>
                              )}
                            </section>
                          </div>
                        </div>
                        <div className="w-[100%] mb-5 float-left mt-[25px] flex justify-between items-center">
                          <p className="flex justify-center items-center text-inUseGray pt-[5px]">
                            Allowed Late
                            <Popover placement="bottom" showArrow={true}>
                              <PopoverTrigger>
                                <Button className="w-[10px] px-0 min-w-10 bg-white">
                                  <Image
                                    src={allowLate}
                                    alt=""
                                    className="w-[28px] h-[27px]"
                                  ></Image>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <div className="px-1 py-2">
                                  <div className="text-tiny">
                                    This task will be allowed to submit in late.
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </p>
                          <Switch
                            size="md"
                            onValueChange={() => handleChangeRole()}
                          ></Switch>
                        </div>
                      </div>
                    </div>
                  </ScrollShadow>
                  {/* action */}
                  <div className="w-[17%] h-auto py-[20px] pr-[7px] mt-[20px] text-end fixed bottom-[30px] right-[20px]">
                    <Button
                      variant="light"
                      className="mr-[10px] cursor-pointer w-[120px] text-inUseGray border-2 hover:bg-inUseGray"
                      onClick={model}
                    >
                      Close
                    </Button>
                    {/* {loading ? (
                      <Button
                        type="text"
                        color="primary"
                        variant="shadow"
                        className="w-[120px] mt-[10px]"
                      >
                        <LoadingComponent />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        color="primary"
                        variant="light"
                        className="w-[120px] cursor-pointer text-white bg-primary hover:bg-blue-600"
                      >
                        Send
                      </Button>
                    )} */}
                    <Button
                      type="submit"
                      color="primary"
                      variant="light"
                      className="w-[120px] cursor-pointer text-white bg-primary hover:bg-blue-600"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateFormExaminationComponent;
