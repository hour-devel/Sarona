import { headerToken } from "@/app/api/headerToken";
import { baseUrl } from "@/utils/constants";

export async function getAllCommentService() {
    const header = await headerToken();
    const res = await fetch(`http://34.143.147.188:8083/api/v1/material-comment/getAllCommentMaterials`,
        {
            method: "GET",
            headers: header,
            next: { tags: ['commentData'] }
        });
    const data = await res.json();
    // //console.log('data comment:', data)
    return data;
}

export async function getAllCommentByMaterialIdService(classId, subjectId) {
    console.log('class id:', classId);
    console.log('subject id:', subjectId)
    const header = await headerToken();
    const res = await fetch(`${baseUrl}/material-comment/class/${classId}/${subjectId}`,
        {
            method: "GET",
            headers: header,
            cache: 'no-store',
            next: { tags: ['comment'] }
        });
    const data = await res.json();
    //console.log("Comment data by :", data);
    return data;
}


export async function getCommentByIdMaterialService(materialId) {
    const header = await headerToken();
    try {
        const res = await fetch(`${baseUrl}/material-comment/getAllCommentByMaterialId/${materialId}`, {
            method: "GET",
            headers: header,
            next: {tags: ['comment']}
        }
        );
        const data = await res.json();
        console.log('data comment is service:',data);
        return data;
    } catch (error) {
        console.log('errors:',error.message);
    }
}


export async function insertCommentMaterialService(commentData) {
    const header = await headerToken();
    try {
        const res = await fetch(`${baseUrl}/material-comment/CommentMaterial`,
            {
                method: "POST",
                body: JSON.stringify(commentData),
                headers: header,
                // next: {tags: ['comment']}
            });
        const data = await res.json();
        //console.log('insert data is:', data);
        return data;
    } catch (error) {
        //console.log('insert data comment error', error)
    }
}

export async function updateCommentByMaterialIdService(materialCommentId, bodyComment) {

    const header = await headerToken();
    try {
        const res = await fetch(`${baseUrl}/material-comment/updateMaterialCommentById/${materialCommentId}`, {
            method: "PUT",
            headers: header,
            cache: "no-store",
            body: JSON.stringify(bodyComment)
        });
        const data = await res.json();
        //console.log('Update data is:', data);
        return data;
    } catch (error) {
        //console.log('Update comment error:', error);
    }
}

export async function deleteCommentByMaterialCommentIdService(materialCommentId) {
    const header = await headerToken();
    try {
        const res = await fetch(`${baseUrl}/material-comment/deleteMaterialCommentById/${materialCommentId}`, {
            method: "DELETE",
            headers: header,
        });
        const data = await res.json();
        //console.log(data)
        return data;
    } catch (error) {
        //console.log('delete comment error:', error);
        return { message: 'Error deleting comment', error };
    }
}

export async function getUserCommentByEmailService(email) {
    const header = await headerToken();
    const res = await fetch(`${baseUrl}/user-setting/searchUser${email}`, {
        method: "GET",
        headers: header
    });
    const data = await res.json();
    console.log('data email user:', data);
    return data;
}
