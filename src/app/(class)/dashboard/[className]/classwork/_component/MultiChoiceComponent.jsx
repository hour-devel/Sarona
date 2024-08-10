import Image from "next/image";
import { Checkbox, Input, Snippet } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ChooseQuesttionTypeComponent from "./ChooseQuesttionTypeComponent";
import multipleChoice from "../../../../../../../public/icon/multipleChoice.svg";
import deleteIcon from "../../../../../../../public/icon/delete.svg";
import circle from "../../../../../../../public/icon/circle.svg";
import { CheckIcon } from "./icon/CheckIcon";
import { CopyIcon } from "./icon/CopyIcon";

const MultiChoiceComponent = ({
  taskType,
  formId,
  handleCopyForm,
  handleTypeChange,
  handleDeleteForm,
  handleDynamicAnswer,
  form,
  title,
}) => {
  //console.log("Data From Short Answer :", form);

  const [openOptionQuestion, setOpenOptionQuestion] = useState(false);
  const [zIndex, setZIndex] = useState(0);

  const [pageX, setPageX] = useState();
  const [pageY, setPageY] = useState();
  const handleOptionQuestion = (e) => {
    setPageX(e.pageX);
    setPageY(e.pageY);
    setZIndex(50);
    setOpenOptionQuestion(!openOptionQuestion);
  };

  const [options, setOptions] = useState([{ id: 1, val: "" }]);
  // State to track missing fields
  const [missingFields, setMissingFields] = useState([]);
  const [defaultAns, setDefaultAns] = useState([]);

  const [multipleChoiceAns, setMultipleChoiceAns] = useState([]);
  const [multipleChoiceValue, setMultipleChoiceValue] = useState({
    question: "",
    scores: "",
    typeOfQuestion: "multiple",
  });
  // set option to task form

  // Add More Options
  function handleAddOption() {
    const newOption = { id: options.length + 1, val: "" };
    setOptions([...options, newOption]);
  }
  // const id = parseInt(e.currentTarget.getAttribute("data-id"));

  function handleDeleteOption(id) {
    // Filter out the option to delete from options array
    const newOptionList = options.filter((option) => option.id !== id);
    setOptions(newOptionList);
    // Filter out the corresponding entry from multipleChoiceAns
    const newMultiChoiceAns = multipleChoiceAns.filter((ans) => ans.id !== id);
    setMultipleChoiceAns(newMultiChoiceAns);
  }

  function handleSetOption(e) {
    const id = parseInt(e.currentTarget.getAttribute("data-id"));
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, val: e.target.value } : option
    );
    setOptions(updatedOptions);
  }

  // Function to handle onBlur event and update state with Options
  const handleInputOption = (name, value, index) => {
    const idExists = multipleChoiceAns.findIndex(
      (answer) => answer.id == index + 1
    );
    //if the id do not exists add new
    if (idExists === -1) {
      setMultipleChoiceAns([...multipleChoiceAns, { id: index + 1, value }]);
    } else {
      //if the id exists update it
      const updatedMultipleChoiceAns = [...multipleChoiceAns];
      updatedMultipleChoiceAns[idExists] = {
        value,
        id: index + 1,
      };
      setMultipleChoiceAns(updatedMultipleChoiceAns);
    }
  };

  useEffect(() => {
    //console.log("default answer : ", defaultAns);
  }, [defaultAns]);

  // Convert into form answer for posting to api
  useEffect(() => {
    const output = multipleChoiceAns.map(({ id, ...rest }) => rest.value);
    setMultipleChoiceValue({
      ...multipleChoiceValue,
      defaultAnswer: [...defaultAns],
      options: output,
    });
  }, [multipleChoiceAns, defaultAns]);

  // Function to handle user input field
  const handleInputBlur = (name, value) => {
    if (value.trim() !== "") {
      setMultipleChoiceValue({
        ...multipleChoiceValue,
        [name]: value,
        no: formId,
      });
    }
  };

  //  Checking missing field
  const getMissingFields = () => {
    const missingFields = [];
    if (!multipleChoiceValue.question) {
      missingFields.push("question");
    }
    if (!multipleChoiceValue.scores) {
      missingFields.push("scores");
    }
    if (multipleChoiceAns.length < 2) {
      missingFields.push("options");
    }
    if (defaultAns.length == 0) {
      missingFields.push("defaultAns");
    }
    return missingFields;
  };

  useEffect(() => {
    //console.log(" multiple answer : ", multipleChoiceAns);
  }, [multipleChoiceAns]);

  // Submit form answer back to parents
  useEffect(() => {
    const missingFields = getMissingFields();
    if (missingFields.length === 0) {
      handleDynamicAnswer(multipleChoiceValue);
    } else {
      //console.log("Fields not input:", missingFields.join(", "));
    }
    setMissingFields(missingFields);
  }, [multipleChoiceValue]);

  return (
    <div
      className={`w-[100%] h-[350px] border-1 z-${zIndex} float-left mt-[20px] rounded-l-xl relative`}
    >
      <div className="w-[13px] h-[100%] absolute left-0 top-0 bg-primary rounded-l-full"></div>
      <div className="w-[90%] h-[80%] float-left absolute top-[50%] translate-y-[-50%] left-[5%]">
        {/* title question */}
        <div className="w-[58%] float-left">
          <Input
            onBlur={(e) => handleInputBlur("question", e.target.value)}
            name="question"
            type="text"
            placeholder={form?.question}
            label={
              <div className="text-inUseGray opacity-60 text-[16px] flex items-center ">
                Untitled Questions
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
                "bg-[#F6F6F6]",
                "hover:bg-white",
                "dark:hover:bg-white",
                "border-b-1",
                "border-inUseGray",
              ],
            }}
          />
          {missingFields.includes("question") && (
            <p className="text-red-500 mt-2 w-full text-xs">
              Question Title is required
            </p>
          )}
        </div>
        {/* choose question type */}
        <div
          className="border-2 cursor-pointer text-inUseGray hover:shadow-sd rounded-[12px] w-[40%] h-[58px] ml-[2%] float-left border-[#E3E7EC] flex justify-start items-center relative z-50"
          onClick={(e) => handleOptionQuestion(e)}
        >
          <Image src={multipleChoice} alt="" className=" mr-[10px] ml-[7px]" />
          Multi choice
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-[10px]"
          >
            <path
              d="M11.8079 15.4546L8.09346 10.9972C7.65924 10.4761 8.02976 9.68506 8.70803 9.68506L15.292 9.68506C15.9702 9.68506 16.3408 10.4761 15.9065 10.9972L12.1921 15.4546C12.0921 15.5745 11.9079 15.5745 11.8079 15.4546Z"
              fill="#757575"
            />
          </svg>
        </div>

        {openOptionQuestion && (
          <ChooseQuesttionTypeComponent
            taskType={taskType}
            formId={formId}
            pageY={pageY}
            pageX={pageX}
            openOptionQuestion={() =>
              setOpenOptionQuestion(!openOptionQuestion)
            }
            handleTypeChange={handleTypeChange}
          />
        )}
        {/* option question */}
        <div className="w-[58%] float-left overflow-y-scroll h-[165px] mt-[5px]">
          {title != "Edit"
            ? options?.map((option, index) => (
                <div className="flex gap-x-10">
                  <Input
                    onBlur={(e) =>
                      handleInputOption("options", e.target.value, index)
                    }
                    name="options"
                    radius={"none"}
                    key={option.id}
                    data-id={option.id}
                    type="text"
                    variant="bordered"
                    className="default shadow-0 mb-[7px]"
                    classNames={{
                      input: [
                        "shadow-0",
                        "text-black",
                        "placeholder:text-gray-300",
                      ],
                      inputWrapper: [
                        "bg-white",
                        "border-none",
                        "shadow-none",
                        "outline-0",
                      ],
                    }}
                    placeholder={`Option ${index + 1}`}
                    startContent={
                      <Image src={circle} alt="" className="mr-[10px]" />
                    }
                    endContent={
                      <>
                        {missingFields.includes("defaultAns") ? (
                          <Checkbox
                            isInvalid={true}
                            onClick={(e) =>
                              setDefaultAns([
                                ...defaultAns,
                                multipleChoiceAns[index]?.value,
                              ])
                            }
                          ></Checkbox>
                        ) : (
                          <Checkbox
                            isInvalid={false}
                            onClick={(e) =>
                              setDefaultAns([
                                ...defaultAns,
                                multipleChoiceAns[index]?.value,
                              ])
                            }
                          ></Checkbox>
                        )}
                        <i
                          className="fa-solid fa-xmark text-red-600 cursor-pointer"
                          data-id={option.id}
                          onClick={() => handleDeleteOption(option.id)}
                        ></i>
                      </>
                    }
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleSetOption(e);
                      }
                    }}
                    style={{ boxShadow: "none" }}
                  />
                </div>
              ))
            : form?.options?.map((option, index) => (
                <div className="flex gap-x-10">
                  <Input
                    onBlur={(e) =>
                      handleInputOption("options", e.target.value, index)
                    }
                    name="options"
                    radius={"none"}
                    key={option.id}
                    data-id={option.id}
                    type="text"
                    variant="bordered"
                    className="default shadow-0 mb-[7px]"
                    classNames={{
                      input: [
                        "shadow-0",
                        "text-black",
                        "placeholder:text-black",
                      ],
                      inputWrapper: [
                        "bg-white",
                        "border-none",
                        "shadow-none",
                        "outline-0",
                      ],
                    }}
                    placeholder={option}
                    startContent={
                      <Image src={circle} alt="" className="mr-[10px]" />
                    }
                    endContent={
                      <>
                        {missingFields.includes("defaultAns") ? (
                          <Checkbox
                            isInvalid={true}
                            onClick={(e) =>
                              setDefaultAns([
                                ...defaultAns,
                                multipleChoiceAns[index]?.value,
                              ])
                            }
                          ></Checkbox>
                        ) : (
                          <Checkbox
                            isInvalid={false}
                            onClick={(e) =>
                              setDefaultAns([
                                ...defaultAns,
                                multipleChoiceAns[index]?.value,
                              ])
                            }
                          ></Checkbox>
                        )}
                        <i
                          className="fa-solid fa-xmark text-red-600 cursor-pointer"
                          data-id={option.id}
                          onClick={() => handleDeleteOption(option.id)}
                        ></i>
                      </>
                    }
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleSetOption(e);
                      }
                    }}
                    style={{ boxShadow: "none" }}
                  />
                </div>
              ))}

          <p className="flex items-center ml-[12px] mt-[20px]">
            <Image src={circle} alt="" className="mr-[15.5px]" />
            <span
              className="text-primary cursor-pointer"
              onClick={() => handleAddOption()}
            >
              <i className="fa-solid fa-circle-plus text-[20px]"></i> Add
              "Other"
            </span>
          </p>
          {missingFields.includes("options") && (
            <p className="text-red-500 mt-2 w-full text-xs">
              Option must be more than 2
            </p>
          )}
        </div>
        {/* scores */}
        <div className="w-[40%] ml-[2%] float-left mt-[20px] flex items-center justify-end pr-[5px] relative text-[16px] text-inUseGray">
          <div className="w-[60px] pb-[30px] h-[20px] mr-[5px] absolute top-[6px] right-[50px]">
            <Input
              onBlur={(e) => handleInputBlur("scores", e.target.value)}
              name="scores"
              type="text"
              placeholder={form?.scores}
              variant="underlined"
              className="min-h-[20px] h-[20px] text-inUseGray"
              classNames={{
                input: [
                  "h-[100%] text-[16px] text-inUseGray text-center placeholder:text-black dark:placeholder:text-black",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: ["min-h-[30px]", "px-0", "text-inUseGray"],
              }}
            />
            {missingFields.includes("scores") && (
              <p className="text-red-500 mt-5 w-full text-xs">Required</p>
            )}
          </div>
          <p className="mt-[10px] text-[16px]">Points</p>
        </div>
        {/* line */}
        <div className="w-[100%] h-[1px] mt-[10px] bg-gray-300 float-left"></div>
        {/* copy and delete */}
        <div className="w-[40%] ml-[2%] float-right mt-[10px] flex justify-end items-center pr-[5px]">
          <Snippet
            tooltipProps={{
              content: "Copy the form",
            }}
            variant="bordered"
            className="border-0 w-[40px] flex justify-center items-center"
            symbol=""
            copyIcon={<CopyIcon />}
            checkIcon={<CheckIcon />}
            onCopy={() => handleCopyForm(formId)}
          ></Snippet>
          <Image
            src={deleteIcon}
            alt=""
            data-id="3"
            className="cursor-pointer"
            onClick={() => handleDeleteForm(formId)}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiChoiceComponent;
