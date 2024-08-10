import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

export const genderOptions = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
  { key: "other", label: "Other" },
];

const SelectGenderComponent = ({ userSettingData,selectedGender, onChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleGenderChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex w-[100%] flex-wrap md:flex-nowrap gap-4">
      <Select
        value={selectedGender}
        onChange={handleGenderChange}
        label="Gender"
        variant="bordered"
        placeholder={userSettingData?.payload?.gender}
        className="max-w-[100%] hover:shadow-sd rounded-[12px]"
        style={{
          border: !isHovered ? "2px solid #eee" : "none",
          height: "10px",
          minHeight: "55px",
        }}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {genderOptions.map((gender) => (
          <SelectItem key={gender.key} value={gender.key}>
            {gender.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectGenderComponent;
