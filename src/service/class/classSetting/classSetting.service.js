import { headerToken } from "@/app/api/headerToken";
import { baseUrl } from "@/utils/constants";
import { revalidateTag } from "next/cache";

export const getClassSettingServices = async (classId) => {
  const header = await headerToken();
  //console.log(classId);
  try {
    const res = await fetch(`${baseUrl}/classes/${classId}`, {
      method: "GET",
      headers: header,
      next: { tags: ["ClassSetting"] },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log(error);
  }
};

export const updateClassSettingServices = async (classId, body) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/classes/${classId}`, {
      method: "PUT",
      headers: header,
      cache: "no-store",
      body: JSON.stringify(body),
    });
    revalidateTag("ClassSetting");
    const data = await res.json();
    //console.log("Update Data: ", data);
    return data;
  } catch (error) {
    //console.log(error);
  }
};
 

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
    console.log("Error with get all team member ", error);
  }
}