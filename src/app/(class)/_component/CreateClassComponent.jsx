"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  useDisclosure,
  Input,
  ModalFooter,
  Textarea,
  image,
} from "@nextui-org/react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { createClassAction } from "@/action/classAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { classSchema, classSchemena } from "@/lib/schema/classSchema";
import { fileUploadAction } from "@/action/fileUpdateActions";

const CreateClassComponent = ({ model }) => {
  const [file, setFile] = useState();
  const formData = new FormData();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(classSchema),
  });

  //create class
  const classHandle = async (data) => {
    setLoading(true);
    formData.append("file", file);
    const fileUpload = await fileUploadAction(formData);
    const newClassInfo = { ...data, profileUrl: fileUpload?.payload?.fileUrl };
    const createClass = await createClassAction(newClassInfo);
    if (createClass?.statusCode == 201) {
      toast.success(createClass?.message);
      setLoading(false);
      model();
    } else {
      toast.error("something went wrong");
    }
  };



  return (
    <div>
      <Modal
        isOpen={true}
        onClose={model}
        isDismissable={false}
        placement="top-center"
      >
        <ModalContent>
          {(open) => (
            <>
              <form onSubmit={handleSubmit(classHandle)}>
                <ModalHeader className="flex flex-col gap-1">
                  <div>
                    <Toaster position="top-center" reverseOrder={false} />
                  </div>
                  <h2 className="text-[24px] text-primary">Create Classes</h2>
                </ModalHeader>
                <ModalBody>
                  <div className="w-[100%] h-auto">
                    <div className="w-[20%] h-[80px] rounded-[22.64px] overflow-hidden float-left relative border-dashed border-1 border-primary bg-[#e3ecfb]">
                      <SingleImageDropzone
                        width={100}
                        height={100}
                        value={file}
                        onChange={(e) => setFile(e)}
                      />
                    </div>
                    {/* title */}
                    <div className="w-[75%] h-[80px] float-left ml-[5%]">
                      <Input
                        name="className"
                        {...register("className")}
                        type="text"
                        variant="underlined"
                        label="Class Title"
                      />
                      {errors && (
                        <span className="text-red-500 mt-2 text-sm">
                          {errors?.className?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Description */}
                  <div className="w-[100%] mt-4">
                    <Textarea
                      name="description"
                      {...register("description")} // This will handle the binding with react-hook-form
                      labelPlacement="outside"
                      placeholder="Description..."
                      className="col-span-12 h-[150px]"
                      style={{ height: "100%" }}
                      classNames={{
                        input: [
                          "text-[#757575]",
                          "h-[150px]",
                          "placeholder:text-[#c4c4c4]",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                          "position:relative",
                          "hover:shadow-sd",
                          "bg-default-200/50",
                          "dark:bg-white",
                          "border-2",
                          "transition-[.5s]",
                          "dark:hover:bg-white",
                          "min-h-[150px]",
                          "h-[100%]",
                        ],
                      }}
                    />
                    {errors && (
                      <span className="text-red-500 mt-2 text-sm">
                        {errors?.description?.message}
                      </span>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="flat"
                    className="bg-white border-2 border-[#757575] text-[#757575]"
                    onClick={() => model()}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" isLoading={loading} type="submit">
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateClassComponent;
