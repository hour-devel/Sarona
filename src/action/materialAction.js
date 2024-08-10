'use server'
import { deleteCommentByMaterialCommentIdService, deleteCommentMaterialByIdService, getAllCommentByMaterialIdService, getCommentByIdMaterialService, getUserCommentByEmailService, insertCommentMaterialService, updateCommentByMaterialIdService } from "@/service/class/material/comment.service";
import { editMaterialByMaterialAndSubjectIdService, getAllMaterialUploadBySubjectIdService, insertMaterialBySubjectIdService } from "@/service/class/material/material.service";
import { deleteCardMaterialSubjectByIdService, deleteMaterialByIdService, getAllMaterialBySubjectIdService } from "@/service/class/material/material.service";
import { deleteSubjectInService, editSubjectService, getAllSubjectService } from "@/service/class/subject/subject.service";
import { revalidateTag } from "next/cache";

export const getAllSubjectAction = async (classId) => {
    const subjectData = await getAllSubjectService(classId);
    revalidateTag('subject');
    return subjectData;
};

export const getAllMaterialsBySubjectIdAction = async (subjectId) => {
    const materialData = await getAllMaterialBySubjectIdService(subjectId);
    revalidateTag('materialCard');
    return materialData;
};

export const getAllCommentByMaterialIdAction = async (classId,subjectId) => {
    const dataCommentByMaterialIdService = await getAllCommentByMaterialIdService(classId,subjectId);
    revalidateTag('materialCard')
    return dataCommentByMaterialIdService;
};

export const getCommentByIdMaterialAction = async (materialId)=>{
    const dataComment = await getCommentByIdMaterialService(materialId);
    return dataComment;
}


export const deleteCardMaterialSubjectByIdAction = async (subjectId) => {
    const dataCardMaterialSubjectById = await deleteCardMaterialSubjectByIdService(subjectId);
    revalidateTag('subjectMaterial');
    return dataCardMaterialSubjectById;
};

export const deleteMaterialByIdAction = async (materialId) => {
    const dataMaterial = await deleteMaterialByIdService(materialId);
    revalidateTag('materialCard');
    return dataMaterial;
}

export const handlePostCommentAction = async (commentData) => {
    const dataCommentMaterial = await insertCommentMaterialService(commentData);
    revalidateTag('commentData')
    return dataCommentMaterial;
};

export const updateCommentByMaterialIdAction = async (materialCommentId, bodyComment) => {
    const dataCommentUpdate = await updateCommentByMaterialIdService(materialCommentId, bodyComment);
    revalidateTag('comment')
    return dataCommentUpdate;
};

export const deleteCommentByMaterialCommentIdAction = async (materialCommentId) => {
    const dataCommentDelete = await deleteCommentByMaterialCommentIdService(materialCommentId);
    revalidateTag('commentData')
    return dataCommentDelete;
}

export const editSubjectAction = async (subjectId, subBody) => {
    const dataUpSub = await editSubjectService(subjectId, subBody);
    revalidateTag('subject')
    return dataUpSub;
}

export const insertMaterialBySubjectIdAction = async (subjectId, body) => {
    const dataInsertMaterial = await insertMaterialBySubjectIdService(subjectId, body);
    revalidateTag('materialCard');
    return dataInsertMaterial;
}


export const editMaterialByMaterialAndSubjectIdAction = async (materialId, subjectId, materailBody) => {
    const dataEditMaterial = await editMaterialByMaterialAndSubjectIdService(materialId, subjectId, materailBody);
    revalidateTag('materialCard');
    return dataEditMaterial;
}

export const deleteSubjectInAction = async (classId, subjectId)=>{
    const dataDeleteSubject = await deleteSubjectInService(classId,subjectId);
    revalidateTag('subject');
    return dataDeleteSubject;
}


export const getUserCommentByEmailAction = async (email) =>{
    const userEmail = await getUserCommentByEmailService(email);
    return userEmail;
}