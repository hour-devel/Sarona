import { headerToken } from "@/app/api/headerToken";
import { baseUrl } from "@/utils/constants";
import { revalidateTag } from "next/cache";

export const getAllSubjectService = async (classId) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/subjects/class/${classId}`, {
      headers: header,
      cache: "no-store",
      next: { tags: ['subject'] },
    });
    const data = await res.json();
    //console.log("data");
    return data;
  } catch (error) {
    //console.log("error", error);
  }
};

export const insertNewSubjectService = async (subjectData) => {
  //console.log("working");
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/subjects`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(subjectData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error", error);
  }
};

export const createSubjectService = async (subjectData) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/subjects`, {
      method: "POST",
      body: JSON.stringify(subjectData),
      headers: header,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error", error);
  }
};

export const editSubjectService = async (subjectId, subBody) => {
  //console.log("subject id:", subjectId);
  //console.log("subject body:", subBody);
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/subjects/${subjectId}`, {
      method: "PUT",
      headers: header,
      cache: "no-store",
      body: JSON.stringify(subBody),
    });
    const data = await res.json();
    //console.log("Update data is:", data);
    return data;
  } catch (error) {
    //console.log("Update has been error hz boy", error);
    return { statusCode: 500, message: "Update failed" };
  }
};

export const deleteSubjectInService = async (classId, subjectId) => {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/subjects/class/${classId}/subject/${subjectId}`,
      {
        method: "DELETE",
        headers: header,
        // cache: "no-store",
      }
    );
    const data = res.json();
    //console.log("data delete in service:", data);
    return data;
  } catch (error) {
    //console.log("Delete has been error!!", error);
  }
};
