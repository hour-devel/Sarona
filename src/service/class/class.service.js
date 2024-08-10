import { baseUrl } from "@/utils/constants";
import { headerToken } from "@/app/api/headerToken";

export const getAllClassService = async () => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/classes`, {
      method: "GET",
      headers: header,
      next: { tags: ["Class"] },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) { 
    console.error("error in svc : ", error);
  }
};

export const disabledClassService = async (classID, status) => {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/classes/disabled-class/${classID}?status=${status}`,
      {
        method: "PUT",
        headers: header,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error in svc : ", error);
  }
};

export const createClassService = async (classInfo) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/classes`, {
      method: "POST",
      body: JSON.stringify(classInfo),
      headers: header,
    });
    const data = await res.json();
    //console.log("create class inside svc : ", data);
    return data;
  } catch (error) {
    console.error("error in svc : ", error);
  }
};

export const updateClassService = async (classID, classInfo) => { 
  console.log("Hi : ", classInfo)
  const header = await headerToken();

  try { 
    const res = await fetch(`${baseUrl}/classes/${classID}`, {
      method: "PUT",
      body: JSON.stringify(classInfo),
      headers: header,
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("error with update class : ", error);
  }
};

// Member
export const joinClassByCodeService = async (classCode) => {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/class-member/joinClassByCode/${classCode}`,
      {
        method: "POST",
        headers: header,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error in svc: ", error);
  }
};

export const getAllMembersInClassService = async (classId) => {
  const header = await headerToken();
  try {
    const response = await fetch(
      `${baseUrl}/class-member/getAllMemberInClass/${classId}`,
      {
        method: "GET",
        headers: header,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error in svc : ", error);
  }
};

export const getClassByIDSevice = async (classID) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/classes/${classID}`, {
      method: "GET",
      headers: header,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in svc : ", error);
  }
};


//GET  user by email
export const getUserByEmailService = async (userEmail) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/user-setting/searchUser${userEmail}`, {
      method: "GET",
      headers: header,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error in svc : ", error);
  }
}