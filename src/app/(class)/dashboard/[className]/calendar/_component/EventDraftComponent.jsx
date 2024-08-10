import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button, ScrollShadow } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CreateEventFormComponent from "./CreateEventFormComponent";
import DeleteEventForm from "../../../../_component/DeletePopUpForm";
import ConfirmForm from "../../../../_component/ConfirmPopUpForm";
import Image from "next/image";
import examIcon from "../../../../../../../public/icon/exam.svg";

import edit from "../../../../../../../public/icon/Edit.svg";
import trash from "../../../../../../../public/icon/Trash.svg";
import {
  deleteDraftEventAction,
  editEventDraftByEventIdAction,
  getEventByIDAction,
} from "@/action/eventAction";
import toast from "react-hot-toast";
import EditDraftEventComponent from "./EditDraftEventComponent";

const EventDraftComponent = ({ params, data }) => {
  // open edit event
  const [open1, setOpen1] = useState(false);
  // open delete event
  const [open2, setOpen2] = useState(false);
  // open confirm
  const [open3, setOpen3] = useState(false);


  const [allDraftData, setAllDraftData] = useState();
  useEffect(()=>{
    setAllDraftData(data)
  },[setAllDraftData])


  //delete Draft Event
  async function deleteDraftEvent(e) {
    console.log("Hello: Id", e)
    console.log("Befor delete :", allDraftData)
    setAllDraftData(allDraftData.filter((iteam) => iteam.eventId !== e));
    console.log("After delete :", allDraftData)
    const data = await deleteDraftEventAction(params, e);
    if (data?.statusCode == 200) {
      toast.success(data?.message);
    } else {
      toast.error("something went wrong");
    }
  }

  function handleDeletePopup(isOpen) {
    setOpen2(isOpen);
  }

  const [eventID, setEventID] = useState();
  const [eventData, setEventData] = useState([]);

  async function handleUpdate(e) {
    setEventID(e.eventId);
    setOpen1(false);
    setOpen1(true);
    setEventData(e);
  }

  async function handleConfirmPopup(isOpen) {
    const data = await deleteDraftEventAction(params.className, e);
    if (data?.statusCode === 200) {
      setOpen2(false);
    }
    setOpen3(isOpen);
  }
  return (
    <div className="w-[100%] h-[53%] float-left mt-0 border-2 rounded-xl overflow-hidden">
      <div className="w-[100%] h-[15%] float-left flex items-center px-[10px]">
        <p>Event Draft</p>
      </div>
      <div
        id="draggable-el"
        className="w-[100%] h-[85%] float-left overflow-y-auto px-[10px] pb-[20px]"
      >
        {/* Show image if no data */}

        {!data || data.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            {/* <Image
              src={noDraft}
              alt="No Data"
              className="w-[50%] h-[50%] object-contain"
            /> */}
            <p className="text-sm text-gray-400">
              No draft events planned yet.
            </p>
          </div>
        ) : (
          /* card event */
          data?.map((e) => (
            <div
              key={e.eventId}
              id="item"
              className="fc-event cursor-pointer w-[100%] mt-[10px] h-[60px] bg-white rounded-[12px] float-left relative border-2 overflow-hidden"
            >
              <div
                id="border"
                className="w-[27%] h-[100%] float-left flex justify-center items-center"
              >
                <div
                  id="sideColor"
                  className={`w-[9px] h-[100%] absolute left-0 top-0`}
                  style={{
                    backgroundColor:
                      e.color === "gold"
                        ? "#F7DC6F"
                        : e.color === "pink"
                        ? "#FEBFC9"
                        : e.color === "blue"
                        ? "#ADD8E6"
                        : "#D3D3D3",
                  }}
                ></div>
                <div className="w-[42px] h-[42px] ml-[5px] rounded-[10px] flex justify-center items-center">
                  <Image src={examIcon} alt="" />
                </div>
              </div>
              <div className="w-[60%] h-[100%] pt-[2px] float-left">
                <h5 className={`text-[14px] mt-[5px] text-black line-clamp-1`}>
                  {e?.eventTitle}
                </h5>
                <p className="text-[12px] line-clamp-1">
                  {e?.eventDescription}
                </p>
              </div>
              <Dropdown className="text-start min-w-[120px]">
                <DropdownTrigger className="bg-white">
                  <Button className="min-w-0 w-0 py-[16px] h-[15px] text-[#757575] hover:bg-inUseGray bg-transparent hover:text-white absolute top-[2px] right-[2px] rounded-[50%]">
                    <i className="fa-solid fa-ellipsis"></i>
                  </Button>
                  <button
                    id="dropdownBottomButton"
                    data-dropdown-toggle="dropdownBottom"
                    data-dropdown-placement="bottom"
                    class="me-3 mb-3 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Dropdown bottom{" "}
                    <svg
                      class="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  <div
                    id="dropdownBottom"
                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                  >
                    <ul
                      class="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownBottomButton"
                    >
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="new"
                    data-id={e?.eventId}
                    className="relative hover:bg-transparent data-[hover=true]:bg-blue-200"
                    onClick={() => handleUpdate(e)}
                    // onClick={() => setOpen1(true)}
                  >
                    <Image src={edit} alt="" />{" "}
                    <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
                      Edit
                    </p>
                  </DropdownItem>

                  {/* Delete */}

                  <DropdownItem
                    key="delete"
                    data-id={e?.eventId}
                    className="relative hover:bg-transparent data-[hover=true]:bg-blue-200"
                    onClick={() => deleteDraftEvent(e?.eventId)}
                  >
                    <Image src={trash} alt="" />{" "}
                    <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
                      Delete
                    </p>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ))
        )}

        {open1 && (
          <EditDraftEventComponent
            classId={params}
            eventData={eventData}
            eventId={eventID}
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
      </div>
    </div>
  );
};

export default EventDraftComponent;
