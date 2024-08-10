import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { getSubjectBySubjectIdAction } from "@/action/classAction";

export const subjects = [
  { key: "a", label: "Java programming" },
  { key: "b", label: "Spring Boot" },
  { key: "c", label: "C programming" },
  { key: "d", label: "C++ programming" },
  { key: "e", label: "C# programming" },
  { key: "f", label: "Presentor" },
];

export default function ButtonSelectFilterSubjectComponent({ mark }) {
  const [subject, setSubject] = useState([]);
  //console.log("Subject :",subject?.payload?.subjectName);

  const handleSubject = async (data) => {
    const sub = await getSubjectBySubjectIdAction(data);
    return sub?.payload?.subjectName
  }

  return (
    <div className="flex w-[150px] flex-wrap md:flex-nowrap gap-4">
      <Select placeholder="Filter subjects" className="max-w-[100%]">
        {mark?.payload?.map((data,ind) => (
          <SelectItem key={ind}>
            {handleSubject(data?.answer?.classwork?.subjectId)}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
