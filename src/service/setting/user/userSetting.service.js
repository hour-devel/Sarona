import { headerToken } from "@/app/api/headerToken";
import { baseUrl } from "@/utils/constants";

export const getUserInfo = async (userInfo) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: header,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in service :", error);
  }
};

export const getUserSettingByEmailServices = async (email) => {
  //console.log("Email : ", email);
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/user-setting/searchUser${email}`, {
      method: "GET",
      headers: header,
      next: { tags: ["UserSetting"] },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in service :", error);
  }
};

export const updateUserSettingServices = async (body) => {
  const header = await headerToken();
  //console.log("body in service: ", body);
  try {
    const res = await fetch(`${baseUrl}/user-setting/userinfo`, {
      method: "PUT",
      headers: header,
      cache: "no-store",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    //console.log("Update Data User : ", data);
    return data;
  } catch (error) {
    //console.log("update user error", error);
  }
};

// Change Password

export const changePasswordSettingService = async (body) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/auth/resetPassword`, {
      method: "PUT",
      headers: header,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("Change Password Error ", error);
  }
};
