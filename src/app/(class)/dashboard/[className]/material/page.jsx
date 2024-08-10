"use client";
import React, { useState, useEffect, Suspense } from "react";
import RightSideBarComponent from "@/components/RightSideBarComponent";
import { ScrollShadow, Spinner } from "@nextui-org/react";
import MaterialCardComponent from "./_component/MaterialCardComponent";
import SearchAndFilterComponent from "../../../_component/SearchAndFilterComponent";
import { getAllSubjectAction } from "@/action/materialAction";
// import ButtonCreateMaterialComponent from "./_component/ButtonCreateMaterialComponent";
import SpinnerLoadingComponent from "@/components/SpinnerLoadingComponent";
import ButtonCreateSubjectComponent from "./_component/ButtonCreateSubjectComponent";
import { deleteSubjectAction } from "@/action/classAction";
import { getAllClassworkByClassIdAction } from "@/action/eventAction";
import { useEdgeStore } from "@/lib/edgestore";
import { Link } from "lucide-react";

const MaterialPage = ({ params }) => {
  //class id
  const classID = params?.className;
  const [subjectData, setSubjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [classId, setClassId] = useState([]);
  const [subId, setSubId] = useState(null);
  const [classwork, setClasswork] = useState();

  useEffect(() => {
    const fetchSubjectData = async () => {
      // setIsLoading(true);
      const data = await getAllSubjectAction(params?.className);
      setSubjectData(data);
      // setIsLoading(false);
    };

    fetchSubjectData();
  }, [params?.className]);

  const handleClasswork = async () => {
    const classwork = await getAllClassworkByClassIdAction(classID);
    setClasswork(classwork)
  };
  useEffect(() => {
    handleClasswork()
  }, [])


  return (
    <div className="w-[100%] h-[88%] float-left transition-[0.5s]" id="main">
      <div className="w-[77%] h-[100%] bg-white float-left pt-5">
        {/* button create subject */}
        <div className="w-[100%] flex justify-between mb-[25px] px-[40px]">
          <ButtonCreateSubjectComponent params={params.className} />
          <div className="w-[393px] h-[40px]">
            <div className="w-[100%] h-[100%] float-left flex justify-end items-center">
              {/* <SearchAndFilterComponent  subjectData={subjectData}/> */}
            </div>
          </div>
        </div>
        {/* all material */}
        <ScrollShadow
          hideScrollBar
          className="w-[100%] h-[85%] px-[40px] pb-[50px]"
        >
          {/* card material */}
          <div>
            <Suspense fallback={<SpinnerLoadingComponent />}>
              <>
                {/* {isLoading ? (
                <div className="flex justify-center items-center w-full h-full">
                  <p className="ml-2"><Spinner /></p>
                </div>
              ) : ( */}
                <div>
                  <MaterialCardComponent
                    params={params.className}
                    subjectData={subjectData}
                    subId={subjectData?.payload?.subjectInfo?.subjectId}
                    setSubId={setSubId}
                  />
                </div>
                {/* )}  */}
              </>
            </Suspense>
          </div>
        </ScrollShadow>
      </div>

      <RightSideBarComponent upComingClasswork={classwork} />
    </div>
  );
};

export default MaterialPage;
