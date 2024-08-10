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
} from "@nextui-org/react";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createClassAction } from "@/action/classAction";
import { fileUploadAction } from "@/action/fileUpdateActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { classSchema } from "@/lib/schema/classSchema";

const CreateComponent = () => {
  const formData = new FormData();
  const [file, setFile] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { loading, setLoading } = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(classSchema),
  });
  function handleImage(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }
  console.log("GG", formData);
  console.log("File", file);
  //create class
  const classHandle = async (data) => {
    console.log("Data", data);
    setLoading(true);
    formData.append("file", file);
    const fileUpload = await fileUploadAction(formData);
    console.log("file", fileUpload);
    // const newClassInfo = { ...data, profileUrl: fileUpload?.fileName };
    console.log("newCla", newClassInfo);
    // // const createClass = await createClassAction(newClassInfo);
    // if (createClass?.statusCode == 201) {
    //   toast.success(createClass?.message);
    //   setLoading(false);
    // } else {
    //   toast.error("something went wrong with create class");
    // }
  };
  return (
    <div>
      <Button
        onPress={onOpen}
        color="primary"
        variant="bordered"
        className="w-[120px] border-[#9e9e9e7a] border-[1.5px] text-[#757575]"
      >
        Create Class
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(classHandle)}>
                <ModalHeader className="flex flex-col gap-1 mt-3">
                  <h2 className="text-[24px] text-primary">Create Classes</h2>
                </ModalHeader>
                <ModalBody>
                  <div className="w-[100%] h-auto">
                    <div className="w-[20%] h-[80px] rounded-[22.64px] overflow-hidden float-left relative border-dashed border-1 border-primary bg-[#e3ecfb]">
                      {/* <Controller
                        name="file"
                        control={control}
                        defaultValue={null}
                        render={({ field: { onChange } }) => ( */}
                      <SingleImageDropzone
                        type="file"
                        name="file"
                        width={200}
                        height={200}
                        value={file}
                        onChange={handleImage}
                      />
                      {/* )}
                      /> */}
                    </div>
                    {/* Class name */}
                    <div className="w-[75%] h-[80px] float-left ml-[5%]">
                      <Input
                        {...register("className")}
                        name="className"
                        type="text"
                        variant="underlined"
                        label="Class Title"
                        error={errors.className}
                      />
                      {errors && (
                        <span className="text-red-500 text-sm">
                          {errors?.className?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Description */}
                  <div className="w-[100%] mt-4">
                    <Textarea
                      {...register("description")}
                      name="description"
                      labelPlacement="outside"
                      placeholder="Description..."
                      className="col-span-12 h-[150px] "
                      style={{
                        height: "100%",
                      }}
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
                          // "hover:border-0",
                          "dark:hover:bg-white",
                          "min-h-[150px]",
                          "h-[100%]",
                        ],
                      }}
                    />
                  </div>
                </ModalBody>
                <ModalFooter className="mb-3">
                  <Button
                    variant="flat"
                    onPress={onClose}
                    className="bg-white  border-1 border-[#75757575] text-[#757575]"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={loading}
                    onPress={onClose}
                  >
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

export default CreateComponent;
