import React, { useState } from "react";
import { Textarea } from "@nextui-org/react";

export default function InputSettingComponent({ classSettingData,valid }) {
  const [description, setDescription] = useState();

  //console.log(description);

  const variants = ["bordered"];

  return (
    <div className="w-full flex flex-col gap-4">
      {variants.map((variant) => (
        <div
          key={variant}
          className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
        >
          <div className="w-[100%] h-[80px]">
            <Textarea
              {...valid("description")}
              classSettingData={classSettingData}
              name="description"
              type="text"
              variant="faded"
              label="Description"
              placeholder={classSettingData?.payload?.description}
              value={description}
              className="col-span-12 text-[16px]"
              classNames={{
                input: ["text-black"],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "position:relative",
                  "hover:shadow-[#387ADF_0px_0px_4px]",
                  "bg-default-200/50",
                  "dark:bg-white",
                  "border-2",
                  "transition-[.5s]",
                  "dark:hover:bg-white",
                  "h-[94px]",
                  "w-[100%]",
                ],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}