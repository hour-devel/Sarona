"use server";
import {
  forgetPassWordService,
  registerService,
  resendOTPCodeService,
  resetPasswordService,
  verifyOTPService,
} from "@/service/auth/auth.service";
import {
  changePasswordSettingService,
  getUserSettingByEmailServices,
  updateUserSettingServices,
} from "@/service/setting/user/userSetting.service";
import { revalidateTag } from "next/cache";

export const registerAction = async (registerInfo, useGoogle) => {
  const res = await registerService(registerInfo, useGoogle);
  return res;
};

export const forgetPasswordAction = async (forgetInfo) => {
  const res = await forgetPassWordService(forgetInfo.email);
  return res;
};

export const resetPasswordAction = async (email, passwordInfo) => {
  const restPassword = await resetPasswordService(email, passwordInfo);
  return restPassword;
};

export const verifyOptAction = async (optCode) => {
  try {
    const res = await verifyOTPService(optCode);
    return res;
  } catch (error) {
    console.log("error :", error);
  }
};

export const resendOtpCodeAction = async (email) => {
  const resendCode = await resendOTPCodeService(email);
  return resendCode;
};

// Get  User by Email
export const getUserSettingByEmailAction = async (email) => {
  const userData = await getUserSettingByEmailServices(email);
  revalidateTag("UserSetting");
  return userData;
};

// Update User by Email

export const updateUserSettingAction = async (newUserData, email) => {

  const userSettingData = await updateUserSettingServices(newUserData);
  revalidateTag("UserSetting");
  return userSettingData;
};



// Change Password
export const changePasswordSettingAction = async (newPasswordData) => {
  const passwordUserSettingData = await changePasswordSettingService(newPasswordData);
  revalidateTag("Change Password");
  return passwordUserSettingData;
}
