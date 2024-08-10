"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import PasswordComponent from "@/app/(auth)/_component/PasswordComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/schema/authSchema";
import { changePasswordSettingAction } from "@/action/authAction";
import toast, { Toaster } from "react-hot-toast";

const ChangePasswordComponent = ({ onClose, passwordUserSettingData }) => {
  const [newPassword, setNewPassword] = useState();
  const [comfirmPassword, setComfirmPassword] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ resolver: zodResolver(resetPasswordSchema)});

  async function changepassword(newPasswordData) {
    try {
      //console.log('new password data : ',newPasswordData);
      const changePassword = await changePasswordSettingAction(newPasswordData);
      //console.log('change password : ',changePassword);
      if (changePassword?.statusCode === 200) {
        toast.success(changePassword?.message);
        onClose()
      } else {
        throw new Error("Failed to change password .");
      }
    } catch (error) {
      // console.error("Error updating user settings:", error.message);
      toast.error("Failed to change password .");
    }
  }

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={true}></Toaster>
      </div>
      <div>
        <Modal isOpen={true} onClose={onClose}>
          <ModalContent className="max-w-[600px] h-auto pt-[15px] pb-[5px]">
            <ModalHeader>
              <h1 className="text-inUseGray text-[20px] capitalize">
                Change your password
              </h1>
            </ModalHeader>
            <ModalBody className="mt-[-1px]">
              <form onSubmit={handleSubmit(changepassword)}>
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-[16px] font-normal text-gray-700 mb-[9px]"
                  >
                    New password
                  </label>
                  <PasswordComponent
                    valid={register}
                    name="password"
                    placeHolder="New password"
                    error={errors.password}
                    passwordUserSettingData={passwordUserSettingData}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-[16px] font-normal text-gray-700 mb-[9px]"
                  >
                    Confirm password
                  </label>
                  <PasswordComponent
                    valid={register}
                    name="confirmPassword"
                    placeHolder="Confirm password"
                    error={errors.confirmPassword}
                    passwordUserSettingData={passwordUserSettingData}
                  />
                </div>

                <ModalFooter>
                  <Button
                    className="bg-white border-2 border-gray-200 2xl:text-[14px] xl:text-[13px]"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary ml-[16px] text-white"
                    type="submit"
                  >
                    Save Change
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default ChangePasswordComponent;
