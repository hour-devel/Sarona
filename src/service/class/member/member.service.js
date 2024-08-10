// import { baseUrl } from "@/utils/constants";
import { headerToken } from "@/app/api/headerToken";
import { baseUrl } from "@/utils/constants";

export async function getAllMemberService(classId) {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/class-member/getAllMemberInClass/${classId}`,
      {
        method: "GET",
        headers: header,
        cache: "no-store",
        next: { tags: ["member"] },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("Error with get all team member ", error);
  }
}

export const findUserService = async (userEmail) => {
  try {
    const header = await headerToken();
    const res = await fetch(`${baseUrl}/user-setting/searchUser${userEmail}`, {
      headers: header,
    });
    const data = await res.json();
    //console.log("find member : ", data);
    return data;
  } catch (error) {
    console.error("error with search user", error);
  }
};

export const inviteUserService = async (email, classId, role) => {
  try {
    const header = await headerToken();
    const res = await fetch(
      `${baseUrl}/class-member/joinClass/${classId}/${email}?isTeacher=${role}`,
      {
        method: "POST",
        headers: header,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error in invite user service : ", error);
  }
};

export const removerMemberService = async (memberId, classId) => {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/class-member/delete-member-from-class/${classId}?userId=${memberId}`,
      { headers: header, method: "DELETE" }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in svc remove member  :", error);
  }
};

export const changeRoleService = async (classId, userId, role) => {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/class-member/changeRole/${classId}/${userId}?role=${role}`,{
        headers: header,
        method: 'PUT'
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in change role : ", error);
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