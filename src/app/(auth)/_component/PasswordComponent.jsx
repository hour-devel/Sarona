"use client";
import React from "react";
import { Input } from "@nextui-org/input";
import keyPassword from "../../../../public/icon/keyPassword.svg";
import Image from "next/image";
import eye from "../../../../public/icon/eye.svg";
import eyeHide from "../../../../public/icon/eyeHide.svg";

const PasswordComponent = ({ name, placeHolder, valid, error }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <Input
        {...valid(name)}
        name={name}
        label={
          <div className="text-inUseGray opacity-60 flex items-center font-[24px] pl-[10px]">
            <Image src={keyPassword} alt="" className="pr-[4px]" /> &nbsp;{" "}
            {placeHolder}
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
            "position:relative",
            "hover:shadow-sd",
            "bg-white",
            "dark:bg-white",
            "border-2",
            "hover:border-0",
            "hover:bg-black",
            "dark:hover:bg-white",
          ],
        }}
        endContent={
          <button
            className="w-[5%] absolute right-[10px] top-[50%] translate-y-[-50%] flex justify-end items-center outline-none border-0"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <Image
                src={eyeHide}
                alt=""
                className="text-[20px] text-default-400 pointer-events-none"
              />
            ) : (
              <Image
                src={eye}
                alt=""
                className="text-[20px] text-default-400 pointer-events-none"
              />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />
      {error && <span className="text-red-500 text-sm">{error?.message}</span>}
    </div>
  );
};

export default PasswordComponent;
