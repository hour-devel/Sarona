"use server";

import {
  createEventService,
  deleteDraftService,
  editEventDraftByEventIdService,
  getAllClassworkByClassIdService,
  getAllEventByClassIdService,
  getEventByIDSevice,
} from "@/service/class/calendar/calendar.service";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const getAllEventByClassIdAction = async (classId) => {
  const newEvent = await getAllEventByClassIdService(classId);
  return newEvent?.payload;
};

export const getAllClassworkByClassIdAction = async (classId) => {
  const newClasswork = await getAllClassworkByClassIdService(classId);
  return newClasswork?.payload;
};

export const createEventAction = async (evenInfo) => {
  console.log("H: ", evenInfo)
  const newEvent = await createEventService(evenInfo);
  revalidateTag("events");
  return newEvent;
};

export const deleteDraftEventAction = async (classId, eventId) => {
  const deleteData = await deleteDraftService(classId, eventId);
  revalidateTag("events");
  return deleteData;
};

export const editEventDraftByEventIdAction = async (
  eventId,
  eventDraftBody
) => {
  const dataEditevent = await editEventDraftByEventIdService(
    eventId,
    eventDraftBody
  );
  revalidateTag("events");
  return dataEditevent;
};

export const getEventByIDAction = async (classId, eventId) => {
  console.log("Action",classId,eventId);
  const data = await getEventByIDSevice(classId, eventId);
  return data;
};
