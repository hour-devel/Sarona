import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoAddCircle } from "react-icons/io5";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import IconSelectSubject from "../../../../../../../public/icon class materail svg/Select Subject and Select Class.svg";
import CreateIcon from "../../../../../../../public/icon class materail svg/Create icon.svg";
import IconEdit from "../../../../../../../public/icon class materail svg/Edit.svg";
import IconDelete from "../../../../../../../public/icon class materail svg/Delete Icon.svg";
import { getSubjectByClassIdAction } from "@/action/classAction";
import { useForm } from "react-hook-form";
import { insertSubjectAction } from "@/action/subjectAction";
import toast from "react-hot-toast";

export default function SelectSubjectComponent({
  subjectId,
  setSubject,
  handleSubject,
  valid,
  classId,
}) {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const inputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const handleGetAllSubject = async () => {
      const getAllSubject = await getSubjectByClassIdAction(classId);
      setSubjects(getAllSubject?.payload || []);
    };
    handleGetAllSubject();
  }, [classId, isCreating]);

  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreating]);

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      setSubjects([
        ...subjects,
        { key: newSubject.toLowerCase(), label: newSubject },
      ]);
      setNewSubject("");
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddSubject();
    }
  };

  const handleCreateNewSubjectClick = () => {
    setIsCreating(true);
    setNewSubject("");
  };

  const handleEditSubject = (key) => {
    const subjectToEdit = subjects.find((subject) => subject.key === key);
    if (subjectToEdit) {
      setNewSubject(subjectToEdit.label);
      setIsCreating(true);
      setSubjects(subjects.filter((subject) => subject.key !== key));
    }
  };

  const handleDeleteSubject = (key) => {
    setSubjects(subjects.filter((subject) => subject.key !== key));
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    if (handleSubject) {
      handleSubject(selectedValue);
    }
  };
  const [isOpen, setIsOpen] = React.useState(false);

  async function handleSubmitSubject() {
    const subjectInfo = {
      subjectName: newSubject,
      classId: [classId],
    };
    const subjectData = await insertSubjectAction(subjectInfo);
    //console.log(subjectData);
    if (subjectData.statusCode == 201) {
      toast.success(subjectData?.message);
      setIsCreating(false);
      setValue(subjectData?.subjectId);
    } else if (subjectData.status == 400) {
      toast.error("Please Input Subject Name");
    }
  }

  return (
    <div className="flex w-[100%] h-[60px] line outline-none rounded-[12px] flex-wrap items-center justify-center md:flex-nowrap gap-4 mt-[-2px] border-none">
      {!isCreating && (
        <Select
          name="subjectName"
          label="Select Subject"
          variant="bordered"
          className={`max-w-[100%] h-[94%] hover:bg-gray-100 rounded-[14px] hover:shadow-sd`}
          style={{ border: !isHovered ? "2px solid #eee" : "none" }}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          onChange={handleSelectionChange}
          defaultSelectedKeys={[subjectId]}
          startContent={
            <Image src={IconSelectSubject} className="w-[18px] h-[18px]" />
          }
        >
          {subjects.map((subject) => (
            <SelectItem
              key={subject.subjectId}
              className="w-[100%] h-[100%] relative text-gray-400 pl-[15px]"
              name="subject"
              endContent={
                <div>
                  <Dropdown className="min-w-[120px]">
                    <DropdownTrigger>
                      <button
                        className="w-[15%] text-red-500 outline-none absolute top-[22%] right-[-16%]"
                        onClick={(e) => e.stopPropagation()} // Prevent dropdown click from closing the select
                      >
                        <p className="rotate-90 text-[24px]">...</p>
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key="edit"
                        className="w-[100%] h-[100%] data-[hover=true]:bg-blue-200"
                        onClick={(e) => {
                          e.stopPropagation(); // Also prevent further propagation in dropdown items
                          handleEditSubject(subject.subjectId); // Ensure correct identifier is used
                        }}
                      >
                        <button className="flex">
                          <Image src={IconEdit} alt="Edit" />
                          <p className="ml-[8px]">Edit</p>
                        </button>
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="data-[hover=true]:bg-blue-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSubject(subject.subjectId);
                        }}
                      >
                        <button className="flex">
                          <Image src={IconDelete} alt="Delete" />
                          <p className="ml-[8px]">Delete</p>
                        </button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              }
            >
              {subject?.subjectName}
            </SelectItem>
          ))}
          <SelectItem key="createSubject" onClick={handleCreateNewSubjectClick}>
            <button className="flex">
              <Image
                src={CreateIcon}
                alt="create new subject"
                className="mt-[-2px]"
              />
              <p className="text-primary text-[14px] font-bold ml-[4px]">
                Create Subject
              </p>
            </button>
          </SelectItem>
        </Select>
      )}
      {isCreating && (
        <div className="flex flex-col w-[100%] h-[90%] outline-none">
          {/* <form onSubmit={handleSubmit(handleSubmitSubject)}> */}
          <Input
            name="subject"
            value={newSubject}
            // {...register("subject")}
            onChange={(e) => setNewSubject(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            type="text"
            label={
              <div className="text-[#757575] opacity-60 font-[24px] flex">
                <Image
                  src={IconSelectSubject}
                  alt="not found"
                  className="w-[20px] h-[20px]"
                />
                &nbsp;
                <p className="pl-[8px]">Enter new subject</p>
              </div>
            }
            className="max-w-[100%] h-[60px]"
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
                "bg-white",
                "dark:bg-white",
                "border-2",
                "hover:border-0",
                "hover:bg-white",
                "dark:hover:bg-white",
              ],
            }}
            endContent={
              <button
                type="button"
                onClick={handleSubmitSubject}
                className="bg-blue-500 hover:bg-blue-700 p-1 rounded-full border-none transition duration-300"
              >
                <IoAddCircle className="w-5 h-5 text-white" />
              </button>
            }
          />
          {/* </form> */}
        </div>
      )}
    </div>
  );
}
