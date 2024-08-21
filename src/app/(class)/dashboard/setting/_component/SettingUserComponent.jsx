"use client";
import React, { useState } from "react";
import { Button, DatePicker, Input } from "@nextui-org/react";
import { parseAbsoluteToLocal } from "@internationalized/date";
import Image from "next/image";
import IconUsername from "../../../../../../public/icon setting svg/Username.svg";
import IconEmail from "../../../../../../public/icon setting svg/Email.svg";
import IconLocation from "../../../../../../public/icon setting svg/Address.svg";
import IconContact from "../../../../../../public/icon setting svg/Contact.svg";
import IconEditProfile from "../../../../../../public/icon setting svg/Edit Profile.svg";

import ChangePasswordComponent from "./ChangePasswordComponent";
import SelectGenderComponent from "./SelectGenderComponent";
import NavbarSettingComponent from "./NavbarSettingComponent";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { updateUserSettingAction } from "@/action/authAction";
import { fileUploadAction } from "@/action/fileUpdateActions";
import { CircleFadingPlus } from "lucide-react";

const SettingUserComponent = ({ userSettingData }) => {
  const [profileUrl, setProfileUrl] = useState(
    userSettingData?.payload?.profileUrl
  );

  console.log("Hello: ", userSettingData)

  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isHovered, setIsHovered] = useState(false);
  let [dob, setDate] = useState(
    // parseAbsoluteToLocal(userSettingData?.payload?.dob?.toString() + "Z")
  );
  const [gender, setGender] = useState(userSettingData?.payload?.gender);
  const [telephone, setTelePhone] = useState(
    userSettingData?.payload?.telephone
  );
  const [address, setAddress] = useState(userSettingData?.payload?.address);
  const [email, setEmail] = useState(userSettingData?.payload?.email);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const { register, handleSubmit } = useForm();

  async function handleOnSubmit(data) {
    //console.log("data :", data);
    // try {
      // Upload the profile image if it exists
      let profileImageUrl = profileUrl;
      if (profileUrl && profileUrl.startsWith("data:")) {
        const formData = new FormData();
        const response = await fetch(profileUrl);
        const blob = await response.blob();
        formData.append("file", blob, "profile.jpg");
        const fileUploadResponse = await fileUploadAction(formData);
        profileImageUrl = fileUploadResponse?.payload?.fileUrl;
      }

      // Split username into firstName and lastName
      const fullName = data.username.split(" ");
      const firstName = fullName[0];
      const lastName = fullName[1];
      const email = data.email;
      const address = data.address;
      const telephone = data.telephone;

      console.log("Dob: ", dob)
      const dateObj = new Date(dob);
      const formattedDate = `${dateObj.getFullYear().toString().slice(-2)}/${(
        dateObj.getMonth() + 1
      )

        .toString()
        .padStart(2, "0")}/${dateObj.getDate().toString().padStart(2, "0")}`;

      console.log("Date: ", dateObj);
      console.log("HellO: ", userSettingData?.payload.email)
      var time;
      if (isNaN(dateObj.getTime())){
        time = null
      }else{
         time = dateObj.toISOString();
      }
      const newUserData = {
        email: email || userSettingData?.payload.email,
        address: address || userSettingData?.payload.address,
        telephone: telephone || userSettingData?.payload.telephone,
        profileUrl: profileImageUrl || userSettingData?.payload.profileImageUrl,
        dob: time || userSettingData?.payload.dob,
        gender: gender || userSettingData?.payload.gender,
        firstName: firstName || userSettingData?.payload.firstName,
        lastName: lastName || userSettingData?.payload.lastName,
      };

      // console.log(" New User Data : ", newUserData);

      const UserAddress = userSettingData?.payload?.address;

      // upload
      const updateUserResponse = await updateUserSettingAction(
        newUserData,
        UserAddress
      );

      console.log("Server response : ", updateUserResponse);
      if (updateUserResponse?.statusCode === 200) {
        toast.success(updateUserResponse?.message);
      } else {
        // throw new Error("Failed to update user's Info");
        toast.success("Failed to update user's Info");
      }
    // } catch (error) {
    //   console.error("Error updating user settings:", error.message);
    //   toast.error("Failed to update user settings sadfas.");
    // }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <div className="w-[100%] h-screen float-left transition-[0.5s]" id="main">
        <div className="w-[100%] h-[100%] float-left px-[40px]">
          {/* navbar setting  */}
          <NavbarSettingComponent />
          {/* profile details  */}

          <div className="w-[400px] h-[11%] flex justify-between relative">
            {/* img  */}
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden object-cover ">
              {profileUrl && (
                <img
                  src={profileUrl}
                  alt="Profile"
                  className="object-cover w-[100%] h-[100%]"
                />
              )}
            </div>
            {/* icon edit  */}
            <div className="w-[35px] h-[30px] overflow-hidden absolute left-[63px] top-12 text-primary cursor-pointer">
              <Image src={IconEditProfile} className="w-[25px] h-[25px]" />

              <input
                type="file"
                onChange={handleFileChange}
                className="absolute top-0 right-1 w-[30px] h-[30px] rounded-full opacity-0 cursor-pointer"
              />
            </div>

            {/* detials  */}
            <div className="w-[300px] h-[100%] pt-[8px]">
              <h1 className="2xl:text-[24px] xl:text-[21px] font-semibold text-primary">
                Profile
              </h1>
              <p className="2xl:text-[13px] xl:text-[12px]">
                Manage your profile setting
              </p>
            </div>
          </div>
          {/* modal form  */}

          <div className="w-[80%] h-[75%] mt-[10px]">
            <div>
              <h1 className="text-primary 2xl:text-[20px] xl:text-[18px] font-medium">
                Basic information
              </h1>
              <p className="2xl:text-[13px] xl:text-[12px] pb-3">
                Tell us your Basic info details
              </p>
            </div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              {/* input  */}
              <div className=" grid grid-cols-1 gap-4 ">
                {/* username and email */}
                <div className="flex justify-between">
                  <div>
                    <label
                      htmlFor="description"
                      className="block 2xl:text-[16px] xl:text-[15px] font-normal text-gray-700 mb-[7px]"
                    >
                      Username
                    </label>
                    <Input
                      userSettingData={userSettingData}
                      name="username"
                      placeholder={
                        userSettingData?.payload?.firstName +
                        " " +
                        userSettingData?.payload?.lastName
                      }
                      type="text"
                      {...register("username")}
                      label={
                        <div className="text-[#757575] opacity-60 font-[24px] flex">
                          <Image
                            src={IconUsername}
                            alt="not found"
                            className="w-[16px] h-[16px]"
                          />{" "}
                          &nbsp;
                          <p className="pl-[8px] 2xl:text-[14px] xl:text-[13px]">
                            username
                          </p>
                        </div>
                      }
                      className="2xl:w-[570px] 2xl:h-[60px] xl:w-[400px]"
                      classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                          "bg-transparent",
                          "text-black/90 dark:text-white/90",
                          "placeholder:text-black dark:placeholder:text-black/60",
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
                  </div>
                  {/* email  */}
                  <div className="ml-[10%]">
                    <label
                      htmlFor="email"
                      className="block 2xl:text-[16px] xl:text-[15px] font-normal text-gray-700 mb-[7px]"
                    >
                      Email
                    </label>
                    <Input
                      userSettingData={userSettingData} 
                      onChange={(email) => setEmail(email)}
                      placeholder={userSettingData?.payload?.email}
                      name="email"
                      type="email"
                      {...register("email")}
                      label={
                        <div className="text-[#757575] opacity-60 font-[24px] flex">
                          <Image
                            src={IconEmail}
                            alt="not found"
                            className="w-[23px] h-[23px] "
                          />{" "}
                          &nbsp;
                          <p className="pl-[8px] mt-1 2xl:text-[14px] xl:text-[13px]">
                            sample@gmail.com
                          </p>
                        </div>
                      }
                      className="2xl:w-[570px] 2xl:h-[60px] xl:w-[400px]  "
                      classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                          "bg-transparent",
                          "text-black/90 dark:text-white/90",
                          "placeholder:text-black dark:placeholder:text-black/60",
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
                  </div>
                </div>
                {/* Date of birth and select gender */}
                <div className="flex justify-between">
                  <div className="">
                    <label
                      htmlFor="dob"
                      className="block 2xl:text-[16px] xl:text-[15px] font-normal text-gray-700 mb-[7px]"
                    >
                      Date of Birth
                    </label>
                    <DatePicker
                      label="Birth Date"
                      className="2xl:w-[570px] 2xl:h-[60px] xl:w-[400px]  hover:shadow-sd rounded-[12px] "
                      style={{ border: !isHovered ? "2px solid #eee" : "none" }}
                      onMouseOver={handleMouseOver}
                      onMouseLeave={handleMouseLeave}
                      granularity="day"
                      showMonthAndYearPickers
                      variant="bordered"
                      // value={dob}
                      // placeholder={userSettingData?.payload?.dob}
                      onChange={(date) => setDate(date)}
                      userSettingData={userSettingData}
                      isRequired
                    />
                  </div>

                  {/* select gender  */}
                  <div className="ml-[10%]">
                    <label
                      htmlFor="gender"
                      className="block 2xl:text-[16px] xl:text-[15px] font-normal text-gray-700 mb-[7px]"
                    >
                      Gender
                    </label>
                    <div className="relative 2xl:w-[570px] 2xl:h-[60px] xl:w-[400px] ">
                      <SelectGenderComponent
                        valid={register}
                        selectedGender={gender}
                        onChange={handleGenderChange}
                        userSettingData={userSettingData}
                      />
                    </div>
                  </div>
                </div>
                {/* address and contact */}
                <div className="flex justify-between">
                  <div className="">
                    <label className="block 2xl:text-[16px] xl:text-[15px] font-medium text-gray-700 mb-[7px]">
                      Address
                    </label>
                    <Input
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={userSettingData?.payload?.address}
                      name="address"
                      type="text"
                      {...register("address")}
                      label={
                        <div className="text-[#757575] opacity-60 font-[24px] flex">
                          <Image
                            src={IconLocation}
                            alt="not found"
                            className="w-[20px] h-[20px]"
                          />{" "}
                          &nbsp;
                          <p className="pl-[5px] mt-1 2xl:text-[14px] xl:text-[13px] ">
                            address
                          </p>
                        </div>
                      }
                      className="2xl:w-[570px] 2xl:h-[60px] xl:w-[400px] "
                      classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                          "bg-transparent",
                          "text-black/90 dark:text-white/90",
                          "placeholder:text-black dark:placeholder:text-black/60",
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
                  </div>
                  {/* contact  */}
                  <div className="mt-0 ml-[10%]">
                    <label className="block 2xl:text-[16px] xl:text-[15px] font-medium text-gray-700 mb-[7px]">
                      Contact
                    </label>
                    <Input
                      placeholder={userSettingData?.payload?.telephone}
                      onChange={(e) => setTelePhone(e.target.value)}
                      name="phone"
                      type="number"
                      {...register("telephone")}
                      label={
                        <div className="text-[#757575] opacity-60 font-[24px] flex">
                          <Image
                            src={IconContact}
                            alt="not found"
                            className="w-[22px] h-[22px] mt-1"
                          />{" "}
                          &nbsp;
                          <p className="pl-[8px] mt-1 2xl:text-[14px] xl:text-[13px]">
                            telephone
                          </p>
                        </div>
                      }
                      className="2xl:w-[570px] 2xl:h-[60px] xl:w-[400px] "
                      classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                          "bg-transparent",
                          "text-black/90 dark:text-white/90",
                          "placeholder:text-black dark:placeholder:text-black/60",
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
                  </div>
                </div>
              </div>
              {/* password and button save/cancel  */}
              <div className="w-[100%] h-[auto]">
                <div className="w-[100%] mt-[20px] flex justify-end 2xl:ml-[3%] xl:ml-[10%]">
                  <div className=" outline-none ">
                    <Button className="bg-white border-2 border-gray-200 2xl:text-[14px] xl:text-[13px]">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-primary ml-[16px] text-white"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
            <div className="w-[100%] h-auto">
              <div className="mt-[10px]">
                <h1 className="text-primary 2xl:text-[20px] xl:text-[18px] font-medium pt-3">
                  Password
                </h1>
                <p className="2xl:text-[14px] xl:text-[13px] pb-3">
                  Modify your new password
                </p>
              </div>
              <div className="2xl:mt-[20px] xl:mt-[25px]">
                <Button
                  className="bg-white border-2 border-gray-200 2xl:text-[14px] xl:text-[13px]"
                  onClick={() => setOpen(true)}
                >
                  Change Password
                </Button>
                {open && (
                  <ChangePasswordComponent onClose={() => setOpen(false)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingUserComponent;
