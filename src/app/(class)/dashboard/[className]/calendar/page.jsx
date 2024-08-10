import React from "react";

import AllCalendarComponent from "./_component/AllCalendarComponent";
import {
  getAllClassworkByClassIdAction,
  getAllEventByClassIdAction,
} from "@/action/eventAction";

const calendar = async ({ params }) => {
  //console.log("ClassId: ",params.className)
  //console.log("Hello Cambodian:")
  const allEvent = await getAllEventByClassIdAction(params.className);
  const classwork = await getAllClassworkByClassIdAction(params.className);
  return (
    <div
      className="w-[100%] h-[88%] float-left transition-[0.5s] px-[30px]"
      id="main"
    >
      <AllCalendarComponent
        classId={params.className}
        allEvent={allEvent}
        allClasswork={classwork}
      />
    </div>
  );
};

export default calendar;
