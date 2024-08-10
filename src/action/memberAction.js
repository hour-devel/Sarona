"use server";
import {
  changeRoleService,
  findUserService,
  getAllMemberService,
  inviteUserService,
  removerMemberService,
} from "@/service/class/member/member.service";
import { user } from "@nextui-org/theme";
import { revalidateTag } from "next/cache";

export const getAllMemberInClassAction = async (classId) => {
  const memberData = await getAllMemberService(classId);
  return memberData;
};
export const findUserAction = async (userEmail) => {
  const findUser = await findUserService(userEmail);
  revalidateTag("member");
  return findUser;
};

export const inviteUserAction = async (email, classId, role) => {
  const inviteUser = await inviteUserService(email, classId, role);
  revalidateTag("member");
  return inviteUser;
};

export const removeMemberAction = async (memberId, classId) => {
  const removeMember = await removerMemberService(memberId, classId);
  revalidateTag("member");
  return removeMember;
};

export const changeRoleAction = async (classId, userId, role) => {
  const changeRole = await changeRoleService(classId, userId, role);
  revalidateTag("member");
  return changeRole;
};

export const getClassByIDAction = async (classID) => {
  const data = await getClassByIDSevice(classID);
  return data;
};