"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  ModalFooter,
  Input,
  DatePicker,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import cancel from "../../../../../../../public/icon streaming/cancel.svg";
import { useForm } from "react-hook-form";
import { createAnnounceAction } from "@/action/streamingAction";
import { fileUploadAction } from "@/action/fileUpdateActions";
import { announceSchema } from "@/lib/schema/announceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const PopUpAnnouncementComponent = ({ title, model, allClassData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(announceSchema),
  });
  const [link, setLinks] = useState([]);
  const [file, setFile] = useState();
  const [isDraft, setIsDraft] = useState(false);
  const [postDate, setPostDate] = useState(new Date());
  const formData = new FormData();
  const formatDateToDMY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    if (isDraft) {
      setDraftLoading(true);
    }

    let normalizedLinks = [];
    if (Array.isArray(link)) {
      normalizedLinks = link;
    } else if (link) {
      normalizedLinks = [link];
    }

    const date = new Date(postDate);
    formData.append("file", file);
    const fileUpload = await fileUploadAction(formData);
    data.isDraft = isDraft;
    const newClassInfo = {
      ...data,
      postDate: date,
      linkAttachments: normalizedLinks,
      profileUrl: fileUpload?.payload?.fileUrl,
    };
    console.log(newClassInfo);
    if (newClassInfo?.profileUrl) {
      const validExtensions = [".jpg", ".jpeg", ".png"];
      const hasValidExtension = validExtensions.some((extension) =>
        newClassInfo.profileUrl.toLowerCase().endsWith(extension)
      );
      if (!hasValidExtension) {
        setLoading(false);
        setDraftLoading(false);
        return toast.error("Invalid image!");
      }
    }
    if (newClassInfo?.postDate) {
      const nDate = new Date();
      const currentDate = formatDateToDMY(nDate);
      const postDate = formatDateToDMY(newClassInfo?.postDate);
      if (postDate < currentDate) {
        setLoading(false);
        setDraftLoading(false);
        return toast.error("Invalid date!");
      }
    }
    try {
      const annoucementData = await createAnnounceAction(newClassInfo);
      if (annoucementData?.statusCode === 201) {
        toast.success(annoucementData?.message);
        model();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("An error occurred!");
    } finally {
      setLoading(false);
      setDraftLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={model} isDismissable={false} size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit(submit)}>
              <ModalHeader className="flex flex-col gap-1 text-[24px] text-[#387ADF]">
                <div className="text-2xl font-bold flex justify-between items-center mt-2">
                  <div className="text-primary">{title} Announcement</div>
                  <div variant="light" onClick={model}>
                    <Image
                      src={cancel}
                      className="hover:text-inUseGray hover:border-2 hover:rounded-full hover:cursor-pointer"
                    ></Image>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="w-[100%] ">
                  <div className="w-[100%] float-left p-[5px] ">
                    <p className="text-gray-400 mb-[15px] mt-3">Title</p>
                    <Input
                      {...register("title")}
                      name="title"
                      type="text"
                      label={
                        <div className="text-[#757575] opacity-60 font-[24px]">
                          <i class="fa-regular fa-pen-to-square"></i> &nbsp;
                          Announcement Title
                        </div>
                      }
                      classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                          "bg-transparent",
                          "text-black/90 dark:text-white/90",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                          "hover:shadow-sd",
                          "dark:bg-white",
                          "border-2",
                          "hover:border-0",
                          "hover:bg-black",
                          "dark:hover:bg-white",
                        ],
                      }}
                      // required
                    />
                    {errors && (
                      <span className="text-red-500 mt-3 text-sm">
                        {errors?.title?.message}
                      </span>
                    )}
                  </div>
                  <div className="w-[100%] float-left p-[5px]">
                    <p className="text-gray-400 mb-[15px]">Description</p>
                    <Textarea
                      {...register("description")}
                      name="description"
                      label={
                        <div className="text-[#757575] opacity-60 font-[24px]">
                          <i class="fa-regular fa-pen-to-square"></i> &nbsp;
                          Description...
                        </div>
                      }
                      className="col-span-12"
                      classNames={{
                        input: ["text-inUseGray"],
                        inputWrapper: [
                          "hover:shadow-sd",
                          "dark:bg-white",
                          "border-2",
                          "dark:hover:bg-white",
                          "h-[100px]",
                        ],
                      }}
                    />
                    {errors && (
                      <span className="text-red-500 mt-3 text-sm">
                        {errors?.description?.message}
                      </span>
                    )}
                  </div>

                  {/* upload image */}

                  <div className="w-[100%] float-left p-[5px]">
                    <p className="text-gray-400 mb-[15px]">Upload Image</p>
                    <div className="relative w-[100%] h-[56px]">
                      <button
                        name="file"
                        type="button"
                        accept="image/*"
                        className="w-[100%] h-[56px] hover:shadow-sd border-2 hover:border-0 dark:hover:bg-white text-[#757575] font-[24px] rounded-[12px] text-justify pl-[16px] cursor-pointer flex items-center relative"
                      >
                        {imagePreviewUrl ? (
                          <img
                            src={imagePreviewUrl}
                            alt="Selected File"
                            className="h-[40px] w-[40px] object-cover rounded-md"
                          />
                        ) : (
                          <i className="fa-solid fa-arrow-up-from-bracket opacity-60"></i>
                        )}
                        <div className="ml-[10px] flex">
                          <p className="text-[15px] opacity-60">
                            {file ? file.name : "Announcement Image"}
                          </p>
                        </div>
                      </button>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        className=" text-[25px] dark:hover:bg-white w-[100%] h-[100%] cursor-pointer absolute left-0 top-0 opacity-0"
                        onChange={handleFileChange}

                        // onChange={(e) => {
                        //   const file = e.target.files[0];
                        //   if (file) {
                        //     setFile(file);
                        //     () => onChange(file); // Update the form state with the file
                        //   }
                        // }}
                      />
                    </div>
                  </div>
                  {/* upload link */}
                  <div className="w-[100%] float-left p-[5px] mt-3 mb-2">
                    <p className="text-gray-400 mb-[15px]">Upload Links</p>
                    <Input
                      type="text"
                      value={link}
                      onChange={(e) => setLinks(e.target.value)}
                      label={
                        <div className="text-[#757575] opacity-60 font-[24px]">
                          <i class="fa-regular fa-pen-to-square"></i> &nbsp;
                          Links
                        </div>
                      }
                      classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                          "bg-transparent",
                          "text-black/90 dark:text-white/90",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                          "hover:shadow-sd",
                          "dark:bg-white",
                          "border-2",
                          "hover:border-0",
                          "hover:bg-black",
                          "dark:hover:bg-white",
                        ],
                      }}
                    />
                  </div>

                  {/* select class */}
                  <div className="w-[50%] float-left p-[5px]">
                    <p className="text-gray-400 mb-[15px]">Select Class</p>
                    <Select
                      variant="bordered"
                      name="classId"
                      style={{ border: !isHovered ? "2px solid #eee" : "none" }}
                      onMouseOver={handleMouseOver}
                      onMouseLeave={handleMouseLeave}
                      label={
                        <div className="text-[#757575] opacity-60 font-[24px]">
                          <i class="fa-regular fa-hand-pointer"></i> &nbsp;
                          Select Class
                        </div>
                      }
                      selectionMode="multiple"
                      className="w-[100%] hover:border-none hover:shadow-sd rounded-xl"
                      {...register("classId")}
                      onChange={(data) =>
                        setValue("classId", data.target.value.split(","))
                      }
                    >
                      {allClassData?.payload
                        ?.filter(
                          (data) =>
                            data.isTeacher === true && data.status === true
                        )
                        .map((data) => (
                          <SelectItem key={data?.classId} value={data?.classId}>
                            {data?.className}
                          </SelectItem>
                        ))}
                    </Select>
                    {errors && (
                      <span className="text-red-500 mt-3 text-sm">
                        {errors?.classId?.message}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="w-[50%] float-left p-[5px]">
                    <p className="text-gray-400 mb-[15px]">Post Date</p>
                    <DatePicker
                      name="postDate"
                      label="Post Date"
                      onChange={(e) => setPostDate(e)}
                      variant="bordered"
                      className="hover:border-none hover:shadow-sd rounded-xl"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => setIsDraft(true)}
                  name="isDraft"
                  type="submit"
                  isLoading={draftLoading}
                >
                  Draft
                </Button>
                <Button
                  color="primary"
                  onClick={() => setIsDraft(false)}
                  name="isDraft"
                  type="submit"
                  isLoading={loading && !draftLoading}
                >
                  Post
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PopUpAnnouncementComponent;
