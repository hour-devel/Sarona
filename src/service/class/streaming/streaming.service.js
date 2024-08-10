import { headerToken } from "@/app/api/headerToken";
import { baseUrl } from "@/utils/constants";

export async function getAnnouncementService(classId) {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/announcements/class/${classId}`, {
      method: "GET",
      headers: header,
      next: { tags: ["announce"] },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error service", error);
  }
}

export async function createAnnouncementService(announcementInfo) {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/announcements`, {
      method: "POST",
      body: JSON.stringify(announcementInfo),
      headers: header,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error in svc", error);
  }
}

export async function updateAnnounceService(announceId, announceInfo) {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/announcements/${announceId}`, {
      method: "PUT",
      body: JSON.stringify(announceInfo),
      headers: header,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error service", error);
  }
}

export async function getAnnounceByIdService(classId, announceId) {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/announcements/class/${classId}/announcement/${announceId}`,
      {
        method: "GET",
        headers: header,
        next: { tags: ["announce"] },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error in svc", error);
  }
}

export async function deleteAnnounceByIdSevice(announceId, classId) {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/announcements/class/${classId}/announcement/${announceId}`,
      {
        method: "DELETE",
        headers: header,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error service", error);
  }
}

export async function getAnnounceService(announceId) {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/announcements/class/announcement/${announceId}`,
      {
        method: "GET",
        headers: header,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error in svc", error);
  }
}

//========================= Announc Comments ==========================

export async function getAllAnnounceCommentService(classId, announceId) {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/announcementComment/class/${classId}/announcementId/${announceId}`,
      {
        method: "GET",
        headers: header,
        next: { tags: ["comments"] },
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error service", error);
  }
}

export async function postCommentService(commentInfo) {
  //console.log("CommentINFO", commentInfo);
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/announcementComment`, {
      method: "POST",
      body: JSON.stringify(commentInfo),
      headers: header,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error in svc ", error);
  }
}

export async function deleteCommentService(classId, announceId, cmtId) {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/announcementComment/class/${classId}/announcement/${announceId}/announceCmt/${cmtId}`,
      {
        method: "DELETE",
        headers: header,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error in svc ", error);
  }
}

export async function getCommentByIDService(classId, announceId, cID) {
  const header = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/announcementComment/class/${classId}/announcement/${announceId}/announceCmt/${cID}`,
      {
        method: "GET",
        headers: header,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error in svc ", error);
  }
}

export async function updateCommentService(cmtId, commentInfo) {
  const header = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/announcementComment/${cmtId}`, {
      method: "PUT",
      body: JSON.stringify(commentInfo),
      headers: header,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log("error in svc ", error);
  }
}
