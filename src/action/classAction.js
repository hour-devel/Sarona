"use server";

import {
  createClassService,
  disabledClassService,
  getAllClassService,
  getAllMembersInClassService,
  getClassByIDSevice,
  getUserByEmailService,
  joinClassByCodeService,
  updateClassService,
} from "@/service/class/class.service";
import {
  checkAnswerService,
  deleteClassWorkByClassWorkIdService,
  getAllClassWorkService,
  getAllScoringByAnswerIdService,
  getAllScoringByClassIdService,
  getAllUserExamService,
  getClassWorkByIdService,
  getSubjectByClassIdServerice,
  getSubjectBySubjectIdService,
  postAnswerService,
  postClassWorkService,
  updateClassWorkByClassWorkIdService,
} from "@/service/class/classWork/classwork.service";
import { formatDate } from "@fullcalendar/core";
import { formatIsoTimeString } from "@fullcalendar/core/internal";

import { getClassSettingServices } from "@/service/class/classSetting/classSetting.service";
import { revalidateTag } from "next/cache";
import {
  createSubjectService,
  deleteSubjectService,
} from "@/service/class/subject/subject.service";

//get all classes
export const getAllClassAction = async () => {
  const classData = await getAllClassService();
  return classData;
};

export const getClassByIDAction = async (classID) => {
  const data = await getClassByIDSevice(classID);
  return data;
};

// disable and enable
export const disabledClassAction = async (classID, status) => {
  const classData = await disabledClassService(classID, status);
  revalidateTag("Class");
  return classData;
};

//create class
export const createClassAction = async (classInfo) => {
  const classData = await createClassService(classInfo);
  revalidateTag("Class");
  return classData;
};

//update class
export const updateClassAction = async (classID, classInfo) => {
  const classData = await updateClassService(classID, classInfo);
  revalidateTag("Class");
  return classData;
};

export const getClassSettingAction = async (classId) => {
  try {
    const classSettingData = await getClassSettingServices(classId);
    revalidateTag("ClassSetting");
    return classSettingData;
  } catch (error) {
    console.error("Error : ", error);
  }
};

export const updateClassSettingAction = async (classId, classInfo) => {
  const classSettingData = await updateClassSettingServices(classId, classInfo);
  revalidateTag("ClassSetting");
  return classSettingData;
};

// Member

export const joinClassByCodeAction = async ({ classCode }) => {
  const data = await joinClassByCodeService(classCode);
  revalidateTag("Class");
  return data;
};

export const getAllMembersInClassAction = async (classId) => {
  const data = await getAllMembersInClassService(classId);
  return data;
};

// =====================================================TASK=====================================================

// DELETE classwork
export const deleteClassWorkAction = async (classWorkId) => {
  const deleteClasswork = await deleteClassWorkByClassWorkIdService(
    classWorkId
  );
  return deleteClasswork;
};
// UPDATE classWork
export const updateClassWorkAction = async (classWorkId) => {
  const update = await updateClassWorkByClassWorkIdService(classWorkId);
  return update;
};
// POST classWork
export const postClassWorkActon = async (subjectId, dataPost) => {
  const post = await postClassWorkService(subjectId, dataPost);
  return post;
};
// GET all classwork
export const getAllClassWorkActon = async (clasID) => {
  const classWorkData = await getAllClassWorkService(clasID);
  return classWorkData;
};
// GET all classwork by id
export const getClassWorkByIdActon = async (clasID) => {
  const classWorkData = await getClassWorkByIdService(clasID);
  return classWorkData;
};
// GET subject by subject id
export const getSubjectBySubjectIdAction = async (subjectId) => {
  const dataSub = await getSubjectBySubjectIdService(subjectId);
  return dataSub;
};
// GET subject by classId
export const getSubjectByClassIdAction = async (classId) => {
  const dataSub = await getSubjectByClassIdServerice(classId);
  return dataSub;
};

// POST subject
export const createSubjectAction = async (subjectData) => {
  const newSubject = await createSubjectService(subjectData);
  revalidateTag("subject");
  return newSubject;
};

// DELETE subject
export const deleteSubjectAction = async (subId, classID) => {
  const delSubject = await deleteSubjectService(subId, classID);
  revalidateTag("subject");
  return delSubject;
};

// POST Answer
export const postAnswerAction = async (classworkId, dataAns) => {
  const postAns = await postAnswerService(classworkId, dataAns);
  return postAns;
};
// GET answer by classworkID
export const getAnwerByClassworkIdAction = async (classworkId) => {
  const data = await getAnwerByClassworkIdService(classworkId);
  return data;
};

// GET all user exam
export const getAllUserExamAction = async (classworkId) => {
  const userExam = await getAllUserExamService(classworkId);
  return userExam;
};

// GET all user by email
export const getUserByEmailAction = async (userEmail) => {
  const user = await getUserByEmailService(userEmail);
  return user;
};

// Check answer
export const checkAnswerAction = async (answerId, answers) => {
  console.log("Log Answer From Action :", answers);
  const checkAnswer = await checkAnswerService(answerId, answers);
  return checkAnswer;
};

// GET all scoring by ClassId
export const getAllScoringByClassIdAction = async (classId) => {
  const score = await getAllScoringByClassIdService(classId);
  return score;
};

// GET all scoring by Answer id
export const getAllScoringByAnswerIdAction = async (answerId) => {
  const score = await getAllScoringByAnswerIdService(answerId);
  return score;
};

// Get all member
export const getAllMemberInClassAction = async (classId) => {
  const memberData = await getAllMemberService(classId);
  return memberData;
};
