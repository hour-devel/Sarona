import { getClassByIDAction } from "@/action/classAction";
import { Snippet } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import LodaingCode from "../../../../../../components/loading/LoadingCode";

const InviteMemberByCode = ({ classId }) => {
  const [classCode, setClassCode] = useState();
  const [loading, setLoading] = useState(false);
  // get class code
  async function getClassCode() {
    setLoading(true);
    const classCodeValue = await getClassByIDAction(classId);
    if (classCodeValue?.statusCode == 200) {
      setClassCode(classCodeValue?.payload?.classCode);
      setLoading(false);
    }
  }
  useEffect(() => {
    getClassCode();
  }, []);

  // Copy Code
  const handleCopyCode = (value) => {
    const textToCopy = `${value}-${classCode}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        //console.log(`Text copied to clipboard\n${textToCopy}`);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };
  return (
    <div>
      <div className="absolute top-[15px] left-[10px] ml-[20px] z-20 w-[250px] rounded-2xl shadow-sd bg-white mt-[55px]">
        <div className="px-3 py-3 rounded-2xl ">
          <div className=" text-lg font-bold text-primary">Class code</div>
          <div>
            {/* Teacher code */}
            <Snippet
              tooltipProps={{
                content: "Copy Class Code",
              }}
              variant="bordered"
              className="border border-gray-300 w-full mt-2 rounded-xl px-2 h-9 flex justify-between items-center"
              symbol=""
              onCopy={() => handleCopyCode("Th")}
            >
              <div className="flex gap-x-6">
                <i className="fa-solid mt-1 fa-chalkboard-user text-inUseGray"></i>
                {loading ? (
                  <div className="ml-10 mt-1">
                    <LodaingCode />
                  </div>
                ) : (
                  `Th-${classCode}`
                )}
              </div>
            </Snippet>
            {/* Student code */}
            <Snippet
              tooltipProps={{
                content: "Copy Class Code",
              }}
              variant="bordered"
              className="border border-gray-300 w-full mt-2 rounded-xl px-2 h-9 flex justify-between items-center"
              symbol=""
              onCopy={() => handleCopyCode("St")}
            >
              <div className="flex gap-x-6">
                <i className="fa-solid ml-1 mt-1 fa-user-graduate text-inUseGray"></i>
                {loading ? (
                  <div className="ml-11 mt-1">
                    <LodaingCode />
                  </div>
                ) : (
                  `St-${classCode}`
                )}
              </div>
            </Snippet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberByCode;
