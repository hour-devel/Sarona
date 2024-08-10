"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import BigCalendarComponent from "./BigCalendarComponent";
import React, { useEffect, useRef, useState } from "react";
import UpCommingExamComponent from "./UpCommingExamComponent";
import EventDraftComponent from "./EventDraftComponent";
import CreateEventFormComponent from "./CreateEventFormComponent";
import DropDownMonthComponent from "./DropDownMonthComponent";

const AllCalendarComponent = ({ classId, allEvent, allClasswork }) => {
  const formatDateToDMY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate() + 1).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [openCreateEventForm, setOpenCreateEventForm] = useState();
  const [allPostEvent, setAllEvents] = useState(allEvent);
  const [event, setEvent] = useState(allEvent);
  const [classwork, setClasswork] = useState(allClasswork);

  useEffect(() => {
    setEvent(allEvent);
  }, []);

  const calendarRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleMonthSelected = (monthIndex) => {
    const newDate = new Date(currentDate.getFullYear(), monthIndex);
    setCurrentDate(newDate);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(newDate); // Navigate calendar to the selected month
  };
  event
    ?.filter((item) => item.isDraft === false)
    .map((e) => console.log("Hello: ", formatDateToDMY(e.startedAt)));
  return (
    <>
      <div className="w-[75%] h-[100%] float-left">
        <div className="w-[100%] h-[6%] float-left relative flex items-center">
          <DropDownMonthComponent onMonthSelected={handleMonthSelected} />

          <Button
            onClick={() => setOpenCreateEventForm(true)}
            color="primary"
            className="absolute top-[50%] translate-y-[-50%] right-[0] w-[143px] h-[42px] text-[32pxq]"
          >
            <i className="fa-solid fa-plus"></i> Add Event
          </Button>
          {openCreateEventForm && (
            <CreateEventFormComponent
              classId={classId}
              header="Add"
              openCreateEventForm={() => setOpenCreateEventForm(false)}
            />
          )}
        </div>
        <div className="w-[100%] h-[94%] float-left overflow-hidden pr-[15px]">
          <BigCalendarComponent
            classId={classId}
            calendarRef={calendarRef}
            allActiveEvent={event
              ?.filter((item) => item.isDraft === false)
              .map((e) => ({
                title: e.eventTitle,
                start: formatDateToDMY(e.startedAt),
                end: formatDateToDMY(e.endedAt),
                allDay: true,
                color:
                  e.color === "gold"
                    ? "#F7DC6F"
                    : e.color === "pink"
                    ? "#FEBFC9"
                    : e.color === "blue"
                    ? "#ADD8E6"
                    : "#D3D3D3",
                id: e.eventId,
              }))}
          />
        </div>
      </div>
      <div className="w-[25%] h-[100%] float-left">
        <div className="w-[100%] h-[100%] float-left pl-[10px]">
          {/* event draft */}
          <EventDraftComponent
            params={classId}
            data={event?.filter((item) => item.isDraft === true)}
          />
          {/* upcoming exam */}
          <UpCommingExamComponent upcomingClasswork={classwork} />
        </div>
      </div>
    </>
    // </div>
  );
};

export default AllCalendarComponent;
