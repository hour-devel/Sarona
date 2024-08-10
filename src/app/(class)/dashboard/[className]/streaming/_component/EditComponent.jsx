"use client";
import {
  Button,
  Link,
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
import React, { useEffect, useState } from "react";

import cancel from "../../../../../../../public/icon streaming/cancel.svg";
import { useForm } from "react-hook-form";

import {
  getAnnounceAction,
  getAnnounceByIdAction,
  updateAnnounceAction,
} from "@/action/streamingAction";
import { fileUploadAction } from "@/action/fileUpdateActions";

import toast from "react-hot-toast";

const EditComponent = ({ model, classID, editId, allClassData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const { register, handleSubmit, setValue } = useForm();
  const formData = new FormData();
  const announcId = editId;
  const [links, setLinks] = useState([]);
  const [announce, setAnnounce] = useState();
  const [isDraft, setIsDraft] = useState(false);
  const [postDate, setPostDate] = useState(new Date());
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [defaultClassId, setDefaultClassId] = useState([]);
  useEffect(() => {
    async function getAnnouce() {
      const data = await getAnnounceAction(announcId);
      setAnnounce(data?.payload);
    }
    getAnnouce();
  }, []);

  useEffect(() => {
    const ids = announce?.classInfo?.map((c) => c.classId);
    setDefaultClassId(ids);
  }, [announce]);
  const onSelectClass = (event) => {
    const selectedValues = event.target.value.split(",");
    setSelectedClasses(selectedValues);
    setValue("classId", selectedValues);
  };

  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const handleUpdate = async (data) => {
    setLoading(true);
    if (isDraft) {
      setDraftLoading(true);
    }
    let normalizedLinks = [];
    if (Array.isArray(links)) {
      normalizedLinks = links;
    } else if (links) {
      normalizedLinks = [links];
    }
    const date = new Date(postDate);
    formData.append("file", file);
    var fileUpload = await fileUploadAction(formData);
    data.isDraft = isDraft;
    let linkUrls = announce?.linkAttachments.map(
      (attachment) => attachment.linkUrl
    );
    const updateInfo = {
      title: data.title ? data.title : announce?.title,
      description: data.description ? data.description : announce?.description,
      imageUrl: fileUpload?.payload?.fileUrl
        ? fileUpload?.payload?.fileUrl
        : announce?.imageUrl,
      classId: selectedClasses.length > 0 ? selectedClasses : defaultClassId,
      isDraft: data.isDraft,
      postDate: date != null ? date : announce?.postDate,
      linkAttachments:
        normalizedLinks.length === 0 ? linkUrls : normalizedLinks,
    };

    if (updateInfo.imageUrl) {
      const validExtensions = [".jpg", ".jpeg", ".png"];
      const hasValidExtension = validExtensions.some((extension) =>
        updateInfo.imageUrl.toLowerCase().endsWith(extension)
      );
      if (!hasValidExtension) {
        setLoading(false);
        setDraftLoading(false);
        return toast.error("Invalid image!");
      }
    }
    if (updateInfo?.postDate) {
      const nDate = new Date();
      const currentDate = formatDateToDMY(nDate);
      const postDate = formatDateToDMY(updateInfo?.postDate);
      if (postDate < currentDate) {
        setLoading(false);
        setDraftLoading(false);
        return toast.error("Invalid date!");
      }
    }
    try {
      const newUpadate = await updateAnnounceAction(announcId, updateInfo);
      if (newUpadate?.statusCode === 200) {
        toast.success(newUpadate?.message);
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

  useEffect(() => {
    if (announce?.fileUrl) {
      setFile(`${imageUrl}=${announce?.fileUrl}`);
    }
  }, []);

  const formatDateToDMY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Show image and file name after choose file on upload image
  const [file, setFile] = useState(null);
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

  return (
    <Modal isOpen={true} onClose={model} isDismissable={false} size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <ModalHeader className="flex flex-col gap-1 text-[24px] text-[#387ADF]">
                <div className="text-2xl font-bold flex justify-between items-center mt-2">
                  <div className="text-primary"> Edit Announcement</div>
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
                    <p className="text-gray-400 mb-[15px]">Title</p>
                    <Input
                      {...register("title")}
                      name="title"
                      type="text"
                      placeholder={announce?.title}
                      label={
                        <div className="text-[#757575] opacity-60 font-[24px] ">
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
                    />
                  </div>
                  <div className="w-[100%] float-left p-[5px]">
                    <p className="text-gray-400 mb-[15px]">Description</p>
                    <Textarea
                      {...register("description")}
                      name="description"
                      placeholder={announce?.description}
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
                  </div>
                  {/* upload image */}
                  <div className="w-[100%] float-left p-[5px]">
                    <p className="text-gray-400 mb-[15px]">Upload Image</p>
                    <div className="relative w-[100%] h-[56px]">
                      <button
                        name="file"
                        type="button"
                        className="w-[100%] h-[56px] hover:shadow-sd border-2 hover:border-0 dark:hover:bg-white text-[#757575] font-[24px] rounded-[12px] text-justify pl-[16px] cursor-pointer flex items-center relative"
                      >
                        {imagePreviewUrl || announce?.imageUrl ? (
                          <>
                            <img
                              src={imagePreviewUrl || announce?.imageUrl}
                              alt="Selected File"
                              className="h-[40px] w-[40px] object-cover rounded-md"
                            />
                            <div className="ml-[10px] flex">
                              <p className="text-[15px] opacity-60">
                                {file ? file.name : announce?.imageUrl}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-arrow-up-from-bracket opacity-60"></i>
                            <div className="ml-[10px] flex">
                              <p className="text-[15px] opacity-60">
                                Announcement Image
                              </p>
                            </div>
                          </>
                        )}
                      </button>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        className="absolute top-0 left-0 w-[100%] h-[100%] opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  {/* upload link */}
                  <div className="w-[100%] float-left p-[5px] mt-3 mb-2">
                    <p className="text-gray-400 mb-[15px]">Upload Links</p>
                    <Input
                      type="text"
                      placeholder={announce?.linkAttachments.map(
                        (attachment) => attachment.linkUrl
                      )}
                      value={links}
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
                      placeholder={announce?.classInfo?.map((c) => c.className)}
                      value={allClassData?.payload?.map((c) => c.classId)}
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
                      onChange={onSelectClass}
                    >
                      {allClassData?.payload
                        ?.filter((e) => e.isTeacher && e.status)
                        ?.map((data) => (
                          <SelectItem key={data?.classId} value={data?.classId}>
                            {data?.className}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>

                  {/* Date */}
                  <div className="w-[50%] float-left p-[5px]">
                    <p className="text-gray-400 mb-[15px]">Post Date</p>
                    <DatePicker
                      label="Post Date"
                      variant="bordered"
                      onChange={(e) => setPostDate(e)}
                      className="hover:border-none hover:shadow-sd rounded-xl"
                      showMonthAndYearPickers
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
export default EditComponent;
