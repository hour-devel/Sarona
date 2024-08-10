import { Input } from "@nextui-org/react";
import React from "react";

const InputComponent = ({ name, label, icon, valid, error }) => { 
  return (
    <div>
      <Input
        {...valid(name)}
        name={name}
        type="text"
        required
        label={
          <div className="text-[#757575] opacity-60 2xl:text-[14px] xl:text-[12px] flex items-center">
            {icon} &nbsp;&nbsp;&nbsp; <p className="mt-[2px] text-[14px]">{label}</p>
          </div>
        }
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent ",
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
      {error && <span className="text-red-500 text-sm">{error?.message}</span>}
    </div>
  );
};

export default InputComponent;
