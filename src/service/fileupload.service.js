import { baseUrl } from "@/utils/constants";

export const fileUploadService = async (file) => {
  try {
    const res = await fetch(`${baseUrl}/fileUpload`, {
      method: "post",
      body: file,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error : ", error);
  }
};

export const getFileUploadService = async (fileName) => {
  try {
    const res = await fetch(
      `${baseUrl}/fileUpload?fileName=${encodeURIComponent(fileName)}`
    );
    const imageBlob = await res.blob();
    const imageUrl = URL.createObjectURL(imageBlob);
    return imageUrl;
  } catch (error) {
    return null;
  }
};
