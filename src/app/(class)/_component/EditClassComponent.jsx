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
  modal,
} from "@nextui-org/react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { updateClassAction } from "@/action/classAction";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUrl } from "@/utils/constants";
import { fileUploadAction } from "@/action/fileUpdateActions";

const EditClassComponent = ({ openEditClass, classData }) => {
  const formData = new FormData();
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [loading, setLoading] = useState(false);
  // Handle class edit
  const classEditHandle = async (data) => {
    setLoading(true);
    formData.append("file", file);
    const fileUpload = await fileUploadAction(formData);
    const updateClassInfo = {
      className: data.className ? data.className : classData?.className,
      description: data.description ? data.description : classData?.description,
      profileUrl: fileUpload?.payload?.fileUrl ?? classData?.profileUrl,
    };
    const updateClass = await updateClassAction(
      classData?.classId,
      updateClassInfo
    );
    if (updateClass?.statusCode == 200) {
      toast.success(updateClass?.message);
      setLoading(false);
      openEditClass();
    } else {
      toast.error("something went wrong");
      setLoading(false);
    }
  };

  const handleFileChange = (file) => {
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (classData?.profileUrl) {
      setImagePreviewUrl(classData?.profileUrl);
    }
  }, [classData]);
  // useEffect(() => {
  //   if (classData?.profileUrl) {
  //     setFile(`${imageUrl}=${classData?.profileUrl}`);
  //   }
  // }, []);

  return (
    <div>
      <Modal isOpen={true} onClose={openEditClass} placement="top-center">
        <ModalContent>
          {(open) => (
            <>
              <form onSubmit={handleSubmit(classEditHandle)}>
                <ModalHeader className="flex flex-col gap-1">
                  <h2 className="text-[24px] text-primary">Edit Class</h2>
                </ModalHeader>
                <ModalBody>
                  <div className="w-[100%] h-auto">
                    <div className="w-[20%] h-[80px] rounded-[22.64px] overflow-hidden float-left relative border-dashed border-1 border-primary bg-[#e3ecfb]">
                      <SingleImageDropzone
                        width={100}
                        height={100}
                        value={imagePreviewUrl}
                        onChange={handleFileChange}
                      />
                    </div>  
                    <div className="w-[75%] h-[80px] float-left ml-[5%]">
                      <Input
                        {...register("className")}
                        name="className"
                        type="text"
                        variant="underlined"
                        placeholder={classData?.className}
                        label="Class Title"
                      />
                    </div>
                  </div>
                  <div className="w-[100%] h-[80px]">
                    <Textarea
                      {...register("description")}
                      name="description"
                      variant="faded"
                      labelPlacement="outside"
                      placeholder={classData?.description}
                      className="col-span-12"
                      classNames={{
                        input: ["text-[#757575]"],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                          "position:relative",
                          "hover:shadow-sd",
                          "bg-default-200/50",
                          "dark:bg-white",
                          "border-2",
                          "transition-[.5s]",
                          // "hover:border-0",
                          "dark:hover:bg-white",
                          "h-[100px]",
                        ],
                      }}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="flat"
                    onClick={openEditClass}
                    className="bg-white border-2 border-[#757575] text-[#757575]"
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit" isLoading={loading}>
                    Update
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

export default EditClassComponent;
