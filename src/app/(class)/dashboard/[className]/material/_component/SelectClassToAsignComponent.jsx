import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import IconSelectSubject from "../../../../../../../public/icon class materail svg/Select Subject and Select Class.svg";
import { getAllClassAction } from "@/action/classAction";

export default function SelectClassToAsignComponent({ handleClassID, valid }) {
  // get all class action
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const handleGetAllClass = async () => {
      const getAllClass = await getAllClassAction();
      const classData = getAllClass.payload.filter(
        (cls) => cls.status === true
      );
      setClasses(classData || []);
    };
    handleGetAllClass();
  }, []);
  //console.log("Class Data :", classes);

  // hover to handle shadow
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // get value from multi selected
  const [newArray, setNewArray] = useState([]);
  const handleSelectionChange = (selectedKeys) => {
    const selectedArray = Array.from(selectedKeys);
    setNewArray(selectedArray);
  };


  useEffect(() => {
    if (typeof handleClassID === "function") {
      handleClassID(newArray);
    }
  }, [newArray, handleClassID]);

  const handleSelectvalue = (e) => {
    //console.log("selected value ", e.target.value);
  };

  return (
    <div className="flex w-[100%] h-[56px] rounded-[15px] items-center flex-wrap md:flex-nowrap gap-4 object-cover justify-center">
      <Select
        items={classes.map((classitem) => {
          return classitem?.className;
        })}
        name="className"
        label="Select class to assign"
        selectionMode="multiple"
        variant="bordered"
        selectedKeys={newArray}
        onSelectionChange={handleSelectionChange}
        className={`max-w-[100%] h-[100%] hover:bg-gray-100 rounded-[14px] hover:shadow-sd`}
        style={{ border: !isHovered ? "2px solid #eee" : "none" }}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        startContent={
          <Image
            src={IconSelectSubject}
            className="w-[18px] h-[18px]"
            alt="select icon"
          />
        }
        onChange={handleSelectvalue}
      >
        {classes?.map((classItem) => (
          <SelectItem
            key={classItem.classId}
            className="pl-[15px]"
            name="class"
            value={classItem?.className}
          >
            {classItem.className}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
