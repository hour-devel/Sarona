// "use server"
import { headerToken } from "@/app/api/headerToken";
import { baseUrl } from "@/utils/constants";

export async function getAllMaterialsService() {
  const header = await headerToken();
  const res = await fetch(`${baseUrl}/materials/getAllMaterials`, {
    method: "GET",
    headers: header,
    next: { tags: ['subjectMaterial'] },
  });
  const data = await res.json();
  return data;
}
export const getAllMaterialBySubjectIdService = async (subjectId) => {
  console.log('subject id in service:',subjectId)
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/materials/getAllMaterials/${subjectId}?subjectId=${subjectId}`,
      {
        method: "GET",
        headers: header,
        next: { tags: ["materialCard"] },
      }
    );
    const data = await res.json();
    console.log('data src in service:',data)
    return data;
  } catch (error) {
    //console.log("error : ", error);
  }
};

export const deleteCardMaterialSubjectByIdService = async (subjectId) => {
  //console.log("subject id:", subjectId);
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/subjects/${subjectId}`, {
      method: "DELETE",
      headers: header,
    });
    const data = await res.json();
    // //console.log("Delete subject id: ", data);
    return data;
  } catch (error) {
    //console.log("error delete subject:", error);
  }
};

export const deleteMaterialByIdService = async (materialId) => {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/materials/deleteMaterialById/${materialId}`,
      {
        method: "DELETE",
        headers: header,
        next: { tags: ["material"] },
      }
    );
    const data = await res.json();
    // //console.log("Material delete id:", data);
    return data;
  } catch (error) {
    console.error("Error deleting material:", error);
  }
};

export const insertMaterialBySubjectIdService = async (subjectId, body) => {
  //console.log("subject id:", subjectId);
  //console.log("body:", body);
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/materials/createMaterial/${subjectId}`,
      {
        method: "POST",
        headers: header,
        // cache: "no-store",
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    //console.log("data insert material:", data);
    return data;
  } catch (error) {
    //console.log("error insert material");
  }
};

export const editMaterialByMaterialAndSubjectIdService = async (
  materialId,
  subjectId,
  materailBody
) => {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/materials/updateMaterialById/${materialId}/${subjectId}`,
      {
        method: "PUT",
        headers: header,
        cache: "no-store",
        body: JSON.stringify(materailBody),
      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    //console.log("update material in service is error", error);
  }
};

