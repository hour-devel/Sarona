'use server'

import { fileUploadService, getFileUploadService } from "@/service/fileupload.service"

export const fileUploadAction = async (file) => {
    const fileUpload = await fileUploadService(file);
    return fileUpload;
}

export const getFileUploadAction = async (fileName) => {
    const getFileUpload = await getFileUploadService(fileName);
    return getFileUpload;
}