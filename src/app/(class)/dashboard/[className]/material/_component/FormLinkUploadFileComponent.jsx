"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import IconLink from "../../../../../../../public/icon class materail svg/Upload Link.svg";
import IconPast from "../../../../../../../public/icon class materail svg/Past Link icon.svg";
import { useForm } from "react-hook-form";

const FormLinkUploadFileComponent = ({
  onCloseLinkUpload,
  handleLink,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleLink(data);
    onCloseLinkUpload();
  };


  return (
    <div>
      <Modal isOpen={true} isDismissable={false} onClose={onCloseLinkUpload}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent className=" max-w-[500px] h-auto pt-[5px] pb-[5px]">
            <ModalHeader className="flex flex-col">
              <h1 className="text-primary text-[24px]">Upload Link</h1>
              <p className="text-[14px] text-[#000000aa]">
                Please enter your link to upload
              </p>
            </ModalHeader>
            <ModalBody className="mt-[-5px]">
              <Input
                {...register("linkAttachments", { required: true })}
                name="linkAttachments"
                type="text"
                label={
                  <div className="text-[#757575] opacity-60 font-[24px] flex">
                    <Image
                      src={IconLink}
                      alt="not found"
                      className="w-[20px] h-[20px]"
                    />{" "}
                    &nbsp;
                    <div className="w-[420px] flex justify-between">
                      <p className="pl-[8px] ">Please paste your link</p>
                    </div>
                  </div>
                }
                endContent={
                  <div className="absolute top-[18px] right-[10px]">
                    <Image src={IconPast} className="cursor-pointer" />
                  </div>
                }
                className="w-[100%] h-[60px]"
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
              />
              {errors.linkAttachments && (
                <span className="text-red-500">This field is required</span>
              )}
            </ModalBody>
            <ModalFooter className="mt-[-5px]">
              <Button
                variant="light"
                onClick={onCloseLinkUpload}
                className="bg-gray-200 border-2 border-gray-200"
              >
                Close
              </Button>
              <Button color="primary" type="submit">
                Ok
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default FormLinkUploadFileComponent;
