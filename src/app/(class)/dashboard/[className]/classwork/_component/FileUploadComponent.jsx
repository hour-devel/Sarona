import {
  Checkbox,
  CheckboxGroup,
  Input,
  Listbox,
  ListboxItem,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Snippet,
  Switch,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ChooseQuesttionTypeComponent from "./ChooseQuesttionTypeComponent";
import Image from "next/image";
import fileUpload from "../../../../../../../public/icon/fileUpload.svg";
import arrowDown from "../../../../../../../public/icon/Arrow_drop_down.svg";
import copyIcon from "../../../../../../../public/icon/copy.svg";
import deleteIcon from "../../../../../../../public/icon/delete.svg";
import { CopyIcon } from "./icon/CopyIcon";
import { CheckIcon } from "./icon/CheckIcon";

const FileUploadComponent = ({
  key,
  handleCopyForm,
  formId,
  handleTypeChange,
  handleDeleteForm,
  taskType,
  setCopyForm,
  handleDynamicAnswer,
}) => {
  const [openOptionQuestion, setopenOptionQuestion] = useState(false);
  const [zIndex, setzIndex] = useState(0);
  const [pageX, setPageX] = useState();
  const [pageY, setPageY] = useState();
  const handleOptionQuestion = (e) => {
    setPageX(e.pageX);
    setPageY(e.pageY);
    setzIndex(50);
    setopenOptionQuestion(!openOptionQuestion);
  };
  // State to track missing fields
  const [missingFields, setMissingFields] = useState([]);
  const [fileUploadValue, setFileUploadValue] = useState({
    question: "",
    socres: "",
    defaultAnswer: "",
    typeOfQuestion: "file",
  });

  // Function to handle onBlur event and update state
  const handleInputBlur = (name, value) => {
    setFileUploadValue({
      ...fileUploadValue,
      [name]: value,
      no: formId,
    });
  };

  // Check which fields are not input
  const getMissingFields = () => {
    const missingFields = [];
    if (!fileUploadValue.question) {
      missingFields.push("question");
    }
    if (!fileUploadValue.socres) {
      missingFields.push("socres");
    }
    if (!fileUploadValue.defaultAnswer) {
      missingFields.push("defaultAnswer");
    }
    return missingFields;
  };

  // passing dynamic value into parent component
  useEffect(() => {
    const missingFields = getMissingFields();
    if (!missingFields.length > 0) {
      handleDynamicAnswer(fileUploadValue);
    } else {
      //console.log("Fields not input:", missingFields.join(", "));
    }
    setMissingFields(missingFields);
  }, [fileUploadValue]);
  return (
    <div
      className={`w-[100%] h-[370px] border-1 z-${zIndex} float-left mt-[20px] rounded-l-xl relative`}
    >
      <div className="w-[13px] h-[100%] absolute left-0 top-0 bg-primary rounded-l-full"></div>
      <div className="w-[90%] h-[80%] float-left absolute top-[50%] translate-y-[-50%] left-[5%]">
        {/* title question */}
        <div className="w-[58%] float-left">
          <Input
            onBlur={(e) => handleInputBlur("question", e.target.value)}
            name="question"
            type="text"
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
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
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
          <Image src={fileUpload} alt="" className=" mr-[10px] ml-[7px]" /> File
          Upload
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
              setopenOptionQuestion(!openOptionQuestion)
            }
            handleTypeChange={handleTypeChange}
          />
        )}
        {/* option question */}
        <div className="w-[58%] float-left mt-[20px] text-inUseGray">
          <div className="w-[100%] h-[45px] float-left flex justify-between items-center">
            <p>Allow only specific file types</p>
            <Switch defaultSelected size="md"></Switch>
          </div>
          <div className="w-[100%] h-[45px] float-left flex justify-between items-center overflow-hidden">
            <p>Maximum number of files</p>{" "}
            <Select
              size="sm"
              defaultSelectedKeys={["10"]}
              className="max-w-[100px] h-[10px] mt-[30px]"
              selectorIcon={<Image src={arrowDown} alt="" />}
            >
              <SelectItem key="10">10</SelectItem>
              <SelectItem key="20">20</SelectItem>
              <SelectItem key="30">30</SelectItem>
              <SelectItem key="40">40</SelectItem>
            </Select>
          </div>
          <div className="w-[100%] h-[45px] float-left flex justify-between items-center">
            <p>Maximum file size</p>
            <Select
              size="sm"
              defaultSelectedKeys={["10"]}
              className="max-w-[100px] h-[10px] mt-[30px]"
              selectorIcon={<Image src={arrowDown} alt="" />}
            >
              <SelectItem key="10">10</SelectItem>
              <SelectItem key="20">20</SelectItem>
              <SelectItem key="30">30</SelectItem>
              <SelectItem key="40">40</SelectItem>
            </Select>
          </div>
          <div className="w-[100%] h-[45px] float-left flex justify-between items-center">
            <p>
              This form can accept up to 1 GB of file.{" "}
              <span className="text-primary">Change</span>
            </p>
          </div>
        </div>
        {/* point */}
        <div className="w-[40%] ml-[2%] float-left mt-[20px] flex items-center justify-end pr-[5px] relative text-[16px] text-inUseGray">
          <div className="w-[60px] pb-[30px] h-[20px] mr-[5px] absolute top-[6px] right-[50px]">
            <Input
              onBlur={(e) => handleInputBlur("socres", e.target.value)}
              name="socres"
              type="text"
              variant="underlined"
              className="min-h-[20px] h-[20px] text-inUseGray"
              classNames={{
                input: ["h-[100%] text-[16px] text-inUseGray text-center"],
                innerWrapper: "bg-transparent",
                inputWrapper: ["min-h-[30px]", "px-0", "text-inUseGray"],
              }}
            />
            {missingFields.includes("socres") && (
              <p className="text-red-500 mt-5 w-full text-xs">Required</p>
            )}
          </div>
          <p className="mt-[10px] text-[16px]">Points</p>
        </div>
        {/* line */}
        <div className="w-[100%] h-[1px] mt-[10px] bg-gray-300 float-left"></div>
        {/* copy and delete */}
        <div className="w-[40%] ml-[2%] float-right mt-[20px] flex justify-end items-center pr-[5px]">
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
            data-id="6"
            className="cursor-pointer"
            onClick={() => handleDeleteForm(formId)}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUploadComponent;
