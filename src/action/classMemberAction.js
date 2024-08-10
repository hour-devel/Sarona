"use server"
import { getAllMemberService } from "@/service/class/member/member.service";

export async function getAllMemberByClassIdAction(id){
   const data = await getAllMemberService(id);
   return data;
}