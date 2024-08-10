"use server";
import {
  createAnnouncementService,
  deleteAnnounceByIdSevice,
  deleteCommentService,
  getAllAnnounceCommentService,
  getAnnounceByIdService,
  getAnnounceService,
  getAnnouncementService,
  getCommentByIDService,
  postCommentService,
  updateAnnounceService,
  updateCommentService,
} from "@/service/class/streaming/streaming.service";
import { revalidateTag } from "next/cache";

export async function getAllAnnouncementActionByClassId(id) {
  const data = await getAnnouncementService(id);
  return data;
}

export async function createAnnounceAction(announceInfo) {
  const announceAction = {
    title: announceInfo.title,
    description: announceInfo.description,
    classId: announceInfo.classId,
    linkAttachments: announceInfo.linkAttachments,
    imageUrl: announceInfo.profileUrl,
    postDate: announceInfo.postDate,
    isDraft: announceInfo.isDraft,
  };
  const announceData = await createAnnouncementService(announceAction);
  revalidateTag("announce");
  return announceData;
}

export async function updateAnnounceAction(announceId, announceInfo) {
  const announceAction = {
    title: announceInfo.title,
    description: announceInfo.description,
    classId: announceInfo.classId,
    linkAttachments: announceInfo.linkAttachments,
    imageUrl: announceInfo.imageUrl,
    postDate: announceInfo.postDate,
    isDraft: announceInfo.isDraft,
  };
  const announcData = await updateAnnounceService(announceId, announceAction);
  revalidateTag("announce");
  return announcData;
}

export async function getAnnounceByIdAction(classId, announceId) {
  const data = await getAnnounceByIdService(classId, announceId);
  return data;
}

export async function deleteAnnounceByIdAction(announceId, classId) {
  const data = await deleteAnnounceByIdSevice(announceId, classId);
  revalidateTag("announce");
  return data;
}
export async function getAnnounceAction(announceId) {
  const data = await getAnnounceService(announceId);
  return data;
}

//========================= Announce Comment =========================

export const getAllAnnounceCommentAction = async (classId, announceId) => {
  const data = await getAllAnnounceCommentService(classId, announceId);
  return data;
};

export async function postCommentAction(commentInfo) {
  const data = await postCommentService(commentInfo);
  revalidateTag("comments");
  return data;
}

export async function deleteCommentAction(classId, announceId, cmtId) {
  const data = await deleteCommentService(classId, announceId, cmtId);
  revalidateTag("comments");
  return data;
}

export async function getCommentByIDAction(classId, announceId, cID) {
  const data = await getCommentByIDService(classId, announceId, cID);
  return data;
}

export async function updateCommentAction(cmtId, commentInfo) {
  const data = await updateCommentService(cmtId, commentInfo);
  revalidateTag("comments");
  return data;
}
