import React, { useState } from "react";
import { Input } from "@nextui-org/react";

export default function InputsComponent({ classSettingData, valid }) {
  const [className, setclassName] = useState();
  const variants = ["underlined"];
  return (
    <div className="w-full flex flex-col gap-4">
      {variants?.map((variant) => (
        <div
          key={variant}
          className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        >
          <Input
            {...valid("className")}
            name="className"
            type="text"
            variant={variant}
            label="Class Name"
            value={className}
            className="text-[16px] text-inUseGray"
            placeholder={classSettingData?.payload?.className}
          />
        </div>
      ))}
    </div>
  );
}
