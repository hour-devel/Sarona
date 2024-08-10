"use server";

import { insertNewSubjectService } from "@/service/class/subject/subject.service";
import { revalidateTag } from "next/cache";

export const insertSubjectAction = async (subjectData) => {
  const insertSubjectData = await insertNewSubjectService(subjectData);
  revalidateTag("subject");
  return insertSubjectData;
};
