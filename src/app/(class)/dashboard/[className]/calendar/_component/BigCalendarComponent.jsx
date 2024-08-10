"use client";
import React, { useEffect, useState, Fragment, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import CreateEventFormComponent from "./CreateEventFormComponent";
import DeleteEventForm from "../../../../_component/DeletePopUpForm";
import ConfirmForm from "../../../../_component/ConfirmPopUpForm";
import edit from "../../../../../../../public/icon/Edit.svg";
import trash from "../../../../../../../public/icon/Trash.svg";
import Image from "next/image";
import calendar from "../../../../../../../public/icon/calendar.svg";
import PopUpMoreEvent from "./PopUpMoreEvent";
import { CloudCog } from "lucide-react";
import {
  createEventAction,
  deleteDraftEventAction,
  editEventDraftByEventIdAction,
} from "@/action/eventAction";
import toast from "react-hot-toast";

const BigCalendarComponent = ({ calendarRef, allActiveEvent, classId }) => {
  const [open, setOpen] = useState(false);
  const [pageX, setPageX] = useState();
  const [pageY, setPageY] = useState();
  const [eventColor, setEventColor] = useState();
  const [eventTitle, setEventTitle] = useState();
  const [isOpenMoreEvent, setIsOpenMoreEvent] = useState(false);
  // open edit event
  const [open1, setOpen1] = useState(false);
  // open delete event
  const [open2, setOpen2] = useState(false);
  // open confirm event
  const [open3, setOpen3] = useState(false);

  const [allEvents, setAllEvents] = useState();
  useEffect(() => {
    setAllEvents(allActiveEvent);
  }, [setAllEvents]);

  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  // const [idToDelete, setIdToDelete] = (useState < number) | (null > null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    allDay: false,
    id: 0,
  });

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");
          return { title, id, start };
        },
      });
    }
  }, []);

  async function handleDateClick(arg) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  }

  function rgbToHex(rgb) {
    // Extract the rgb values
    var rgbValues = rgb.match(/\d+/g);
    var r = parseInt(rgbValues[0]);
    var g = parseInt(rgbValues[1]);
    var b = parseInt(rgbValues[2]);

    // Convert to hex
    return (
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    );
  }

  var i = 0;
  async function addEvent(data) {
    console.log("addEvent function called");
    //  console.log("Color iteam: ", data.draggedEl.item.border.sideColor.getAttribute('background-color'))
    const color = data.draggedEl.children[0].children[0].style.backgroundColor;
    let oldId = new Date().getTime();
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      end: data.date.toISOString() + 1,
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      color: rgbToHex(color),
      id: oldId,
    };
    setAllEvents([...allEvents, event]);

    const convertDate = {
      eventTitle: event.title.split("\n\n")[0],
      eventDescription: event?.title.split("\n\n")[1],
      color:
        event.color === "#F7DC6F"
          ? "gold"
          : event.color === "#FEBFC9"
          ? "pink"
          : event.color === "#ADD8E6"
          ? "blue"
          : "gey",
      isDraft: false,
      startedAt: event?.start.split("Z")[0],
      endedAt: event?.end.split("Z")[0],
      classId: classId,
    };
    console.log("Number:", (i = i + 1));
    if (i % 2 != 0) {
      const eventInfo = await createEventAction(convertDate);
      const updateDate = {
        start: data.date.toISOString(),
        end: data.date.toISOString() + 1,
        title: eventInfo?.payload?.eventTitle,
        allDay: data.allDay,
        color:
          eventInfo?.payload?.color === "gold"
            ? "#F7DC6F"
            : eventInfo?.payload?.color === "pink"
            ? "#FEBFC9"
            : eventInfo?.payload.color === "blue"
            ? "#ADD8E6"
            : "#D3D3D3",
        id: eventInfo?.payload?.eventId,
      };

      setAllEvents(
        allEvents?.map((event) =>
          event.id === oldId ? { ...allEvents, ...updateDate } : event
        )
      );
      setAllEvents([...allEvents, updateDate]);
    }
  }

  // resize event
  async function resizeEvent(data) {
    const originalStart = new Date(data.event._instance.range.start);
    const originalEnd = new Date(data.event._instance.range.end);
    const start = new Date(originalStart);
    const end = new Date(originalEnd);
    start.setDate(start.getDate() - 1);
    end.setDate(end.getDate() - 1);
    let e = data.el.fcSeg.eventRange.def.ui.backgroundColor;
    const convertDate = {
      eventTitle: data.el.fcSeg.eventRange.def.title,
      eventDescription: data.el.fcSeg.eventRange.def.title,
      color:
        e === "#F7DC6F"
          ? "gold"
          : e === "#FEBFC9"
          ? "pink"
          : e === "#ADD8E6"
          ? "blue"
          : "grey",
      isDraft: false,
      startedAt: start.toISOString(),
      endedAt: end.toISOString(),
      classId: classId,
    };

    const returnUpdateAfterDrop = await editEventDraftByEventIdAction(
      data.event.id,
      convertDate
    );
  }

  // drop event
  async function dropEvent(data) {
    const originalStart = new Date(data.event._instance.range.start);
    const originalEnd = new Date(data.event._instance.range.end);
    const start = new Date(originalStart);
    const end = new Date(originalEnd);
    start.setDate(start.getDate() - 1);
    end.setDate(end.getDate() - 1);
    let e = data.el.fcSeg.eventRange.def.ui.backgroundColor;

    const convertDate = {
      eventTitle: data.el.fcSeg.eventRange.def.title,
      eventDescription: data.el.fcSeg.eventRange.def.title,
      color:
        e === "#F7DC6F"
          ? "gold"
          : e === "#FEBFC9"
          ? "pink"
          : e === "#ADD8E6"
          ? "blue"
          : "grey",
      isDraft: false,
      startedAt: start.toISOString(),
      endedAt: end.toISOString(),
      classId: classId,
    };

    const returnUpdateAfterDrop = await editEventDraftByEventIdAction(
      data.event.id,
      convertDate
    );
    // console.log(" ID", data.event.id);
  }

  function handleDetailModal(data) {
    setEventTitle(data.event.title);
    setEventColor(data.event.borderColor);
    setOpen(true);
    setPageX(data.jsEvent.pageX);
    setPageY(data.jsEvent.pageY);
    setShowDetailModal(true);
    setIdToDelete(data.event.id);
  }

  async function handleDelete() {
    setAllEvents(allEvents.filter((event) => event.id !== idToDelete));
    const deleteEvent = await deleteDraftEventAction(classId, idToDelete);
    // setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
    });
  }

  function handleDeletePopup(isOpen) {
    setOpen2(isOpen);
  }

  function handleConfirmPopup(isOpen) {
    setOpen2(false);
    setOpen3(isOpen);
    if (isOpen === false) {
      handleDelete();
    }
  }

  const [moreEvent, setMoreEvent] = useState([]);
  const [dateMoreEvent, setDateMoreEvent] = useState();

  function handleMoreLinkClick(clickInfo) {
    setPageX(clickInfo.jsEvent.pageX);
    setPageY(clickInfo.jsEvent.pageY);
    setIsOpenMoreEvent(true);
    setMoreEvent(clickInfo);
    const date = clickInfo.date;
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const dateMoreEvent = date
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, " ");
    setDateMoreEvent(dateMoreEvent);
    return "destroy";
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "title",
          right: "prev,next",
        }}
        width="100%"
        dayMaxEvents={2}
        fixedWeekCount={false}
        events={allEvents}
        nowIndicator={true}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        dateClick={handleDateClick}
        drop={(data) => addEvent(data)}
        eventClick={(data) => handleDetailModal(data)}
        eventDrop={(data) => dropEvent(data)}
        eventResize={(data) => resizeEvent(data)}
        moreLinkClick={(data) => handleMoreLinkClick(data)}
        ref={calendarRef}
      />

      {isOpenMoreEvent && (
        <PopUpMoreEvent
          dateMoreEvent={dateMoreEvent}
          moreEvent={moreEvent}
          isOpenMoreEvent={setIsOpenMoreEvent}
          x={pageX}
          y={pageY}
        />
      )}

      {open1 && (
        <CreateEventFormComponent
          header="Edit"
          openCreateEventForm={() => setOpen1(false)}
        />
      )}

      {open2 && (
        <DeleteEventForm
          handleDeletePopup={handleDeletePopup}
          handleConfirmPopup={handleConfirmPopup}
        />
      )}

      {open3 && <ConfirmForm handleConfirmPopup={handleConfirmPopup} />}

      {showDetailModal ? (
        <Modal
          backdrop="transparent"
          isOpen={open}
          onClose={() => setOpen(false)}
          placement="top-center"
          className="max-w-[200px]"
          style={{
            position: "absolute",
            top: pageY - 80,
            left: pageX - 50,
            zIndex: "50",
          }}
        >
          <ModalContent className="px-0 py-0">
            {(onClose) => (
              <>
                <ModalBody className="px-0 py-0">
                  <div
                    className={`w-[100%] h-[70px] shadow-sd rounded-xl overflow-hidden`}
                    style={{
                      backgroundColor: eventColor,
                    }}
                  >
                    <div className="w-[100%] h-[50%] float-left relative flex items-center pt-[5px]">
                      <Image src={calendar} alt="" className="ml-[11px]" />
                      <p className="ml-[10px] text-[12px]">Sun,March 5</p>
                      <Dropdown className="text-start min-w-[120px]">
                        <DropdownTrigger className="bg-transparent">
                          <Button className="min-w-0 w-0 py-[16px] text-inUseGray h-[15px] absolute right-[5px] top-[50%] translate-y-[-50%] rounded-[50%]">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem
                            key="new"
                            className="data-[hover=true]:bg-blue-200"
                            onClick={() => setOpen1(true)}
                          >
                            <Image src={edit} alt="" />{" "}
                            <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
                              Edit
                            </p>
                          </DropdownItem>
                          <DropdownItem
                            key="copy"
                            className="data-[hover=true]:bg-blue-200"
                            onClick={() => setOpen2(true)}
                          >
                            <Image src={trash} alt="" />{" "}
                            <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
                              Delete
                            </p>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    <div className="w-[100%] h-[50%] float-left flex items-center pb-[5px]">
                      <i
                        className={`fa-solid fa-circle ml-[14px] text-[10px]`}
                        style={{
                          color: "#387ADF",
                        }}
                      ></i>
                      <p className="ml-[17px] text-[12px] text-black font-bold line-clamp-1">
                        {eventTitle}
                      </p>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default BigCalendarComponent;
