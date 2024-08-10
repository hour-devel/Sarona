import { baseUrl } from "@/utils/constants";
import { revalidateTag } from "next/cache";
import { headerToken } from "@/app/api/headerToken";
import { answers } from "@/app/(class)/dashboard/setting/_component/data";

// delete classWork
export const deleteClassWorkByClassWorkIdService = async (classworkId) => {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/classwork/deleteClasswork?classworkId=${classworkId}`,
      {
        method: "DELETE",
        headers: header,
      }
    );
    const data = await res.json();
    revalidateTag("Task");
    return data;
  } catch (error) {
    console.error("error :", error);
  }
};

// get all classWork
export const getAllClassWorkService = async (classId) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/classwork/${classId}/classwork`, {
      method: "GET",
      headers: header,
      next: { tags: ["Task"] },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error :", error);
  }
};

// get classWork by id
export const getClassWorkByIdService = async (classworkId) => {
  const header = await headerToken();

  try {
    const res = await fetch(`${baseUrl}/classwork/${classworkId}`, {
      method: "GET",
      headers: header,
      next: { tags: ["Task"] },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error :", error);
  }
};

// update classwork
export const updateClassWorkByClassWorkIdService = async (classWorkId) => {
  const header = await headerToken();

  try {
    const res = await fetch(
      `${baseUrl}/classwork/updateClasswork/${classWorkId}`,
      {
        method: "PUT",
        body: JSON.stringify(dataPost),
        headers: header,
      }
    );
    const data = await res.json();
    revalidateTag("Task");
    return data;
  } catch (error) {
    console.error("error :", error);
  }
};

// post classWork
export const postClassWorkService = async (subjectId, dataPost) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/classwork/postClasswork/${subjectId}`, {
      method: "POST",
      body: JSON.stringify(dataPost),
      headers: header,
    });
    const data = await res.json();
    //console.log("Exam Data :",data);
    revalidateTag("Task");
    return data;
  } catch (error) {
    console.error("error post:", error);
  }
};

// ====================================================== subject ======================================================


// subject get subject by subjectID
export const getSubjectBySubjectIdService = async (subjectId) => {
  const header = await headerToken();

  try {
    const res = await fetch(`${baseUrl}/subjects/${subjectId}`, {
      method: "GET",
      headers: header,
      next: { tags: ["Subject"] },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error :", error);
  }
};

// subject get subject by classID
export const getSubjectByClassIdServerice = async (classId) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/subjects/class/${classId}`, {
      method: "GET",
      headers: header,
      next: { tags: ["Subject"] },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error :", error);
  }
};

// ====================================================== answer ======================================================
export const postAnswerService = async (classworkId, dataAns) => {
  //console.log("classwork id : ", classworkId);
  //console.log("classworkd ans : ", dataAns);
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/answer/submitAnswer/${classworkId}`, {
      method: "POST",
      body: JSON.stringify(dataAns),
      headers: header,
    });
    const data = await res.json();
    //console.log("after submit exam : ", data);
    revalidateTag("UserExam");
    return data;
  } catch (error) {
    console.error("error in submit exam :", error);
  }
};

// get user exam
export const getAllUserExamService = async (classworkId) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/answer/${classworkId}/`, {
      method: "GET",
      headers: header,
      next: { tags: ["UserExam"] },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error :", error);
  }
};
// ====================================================== score ======================================================
//get all score
export const getAllScoringByClassIdService = async (classId) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/scoring/class/${classId}`, {
      method: "GET",
      headers: header,
      next: { tags: ["score"] },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("error :", error);
  }
};

//get score by answer ID
export const getAllScoringByAnswerIdService = async (answerId) => {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/scoring/${answerId}`, {
      method: "GET",
      headers: header,
      next: { tags: ["score"] },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("error :", error);
  }
};


export const checkAnswerService = async (answerId, answers) => {
  //console.log('working');
  console.log('request body : ',answers);
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/answer/checkAnswer/${answerId}`, {
      method: "PUT",
      headers: header,
      body: JSON.stringify(answers),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error in check services : ", error);
  }
};
