import { headerToken } from "@/app/api/headerToken";
import { baseUrl } from "@/utils/constants";

export const loginService = async (loginInfo) => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-type": "application/json", 
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    //console.log("error : ", e);
  }
};

export const registerService = async (registerInfo, useGoogle) => {
  const newRegister = {
    firstName: registerInfo?.firstName,
    lastName: registerInfo?.lastName,
    email: registerInfo?.email,
    password: registerInfo?.password,
  };
  try {
    const res = await fetch(
      `${baseUrl}/auth/register?withGoogle=${useGoogle}`,
      {
        method: "POST",
        body: JSON.stringify(newRegister),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error with register :", error);
  }
};

export const forgetPassWordService = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/auth/resendOtp?email=${email}`, {
      method: "POST",
    });
    return res;
  } catch (error) {
    //console.log("error", error);
  }
};

export const verifyOTPService = async (optCode) => {
  try {
    const res = await fetch(`${baseUrl}/auth/verify?otpCode=${optCode}`, {
      method: "PUT",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error", error);
  }
};

export const resendOTPCodeService = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/auth/resendOtp?email=${email}`, {
      method: "POST",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error : ", error);
  }
};

export const resetPasswordService = async (email, passwordInfo) => {
  try {
    const res = await fetch(`${baseUrl}/auth/forgetPassword?email=${email}`, {
      method: "PUT",
      body: JSON.stringify(passwordInfo),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error :", error);
  }
};
