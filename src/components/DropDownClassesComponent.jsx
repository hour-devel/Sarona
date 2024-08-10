"use client";
import React, { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import Link from "next/link";
import teaching from "../../public/icon/teaching.svg";
import enroll from "../../public/icon/enroll.svg";
import arrowRight from "../../public/icon/arrowRight.svg";
import arrowDown from "../../public/icon/arrowDown.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";

const DropDownClassesComponent = ({ pathName, classData }) => {
  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];
  const [dropTeaching, setDropTeaching] = useState(true);
  const [dropEnroll, setDropEnroll] = useState(true);
  function handleDropTeaching() {
    if (dropTeaching) {
      setDropTeaching(false);
    } else {
      setDropTeaching(true);
    }
  }
  function handleDropEnroll() {
    if (dropEnroll) {
      setDropEnroll(false);
    } else {
      setDropEnroll(true);
    }
  }

  const currentUrl = usePathname();

  const segments = currentUrl.split("/");

  const lastTwoSegment = segments.slice(-2);

  return (
    <>
      {dropTeaching ? (
        <Listbox aria-label="Dynamic Actions" items={items}>
          <ListboxItem
            className={`${
              pathName == "/dashboard"
                ? "text-[#000] font-bold"
                : "text-inUseGray"
            } h-[40px]`}
            key="new"
            onClick={() => handleDropTeaching()}
          >
            <p className="flex items-center relative">
              <Image src={teaching} alt="" />
              <span
                id="disable"
                className={`${
                  pathName == "/classes" ? "font-bold" : ""
                } absolute left-[30px]`}
              >
                Teaching
              </span>
              <Image src={arrowRight} alt="" className="absolute right-0" />
            </p>
          </ListboxItem>
        </Listbox>
      ) : (
        <Listbox aria-label="Dynamic Actions">
          <ListboxItem
            className={`${
              pathName == "/dashboard"
                ? "text-[#000] font-bold"
                : "text-inUseGray"
            } h-[40px]`}
            key="new"
            onClick={() => handleDropTeaching()}
          >
            <p className="flex items-center relative">
              <Image src={teaching} alt="" />

              <span
                id="disable"
                className={`${
                  pathName == "/classes" ? "font-bold" : ""
                } absolute left-[30px]`}
              >
                Teaching
              </span>
              <Image src={arrowDown} alt="" className="absolute right-0" />
            </p>
          </ListboxItem>
          {classData?.map((data, i) =>
            data?.isTeacher && data?.status ? (
              <ListboxItem
                key={i}
                className={`${
                  lastTwoSegment[0] == data?.classId.replace(" ", "")
                    ? "text-[#000] font-bold"
                    : "text-inUseGray"
                } h-[40px] flex items-center w-[100%]`}
              >
                <Link
                  href={`/dashboard/${data?.classId.replace(
                    " ",
                    ""
                  )}/streaming`}
                  className="w-[100%] h-[100%]"
                >
                  <div className="flex gap-2 items-center">
                    <span
                      className="2xl:w-[35px] 2xl:h-[28px] xl:w-[35px] xl:h-[25px] flex items-center text-inUseGray justify-center text-[16px] rounded-full"
                      style={{
                        backgroundColor: i % 2 == 0 ? "#FEE6C9" : "#D2F0FF",
                        color: i % 2 == 0 ? "#FBA834" : "#387ADF",
                      }}
                    >
                      {data?.className[0]}
                    </span>
                    <span
                      id=""
                      className={`${
                        lastTwoSegment[0] == data.classId.replace(" ", '"')
                          ? "font-bold"
                          : ""
                      } w-[100%] h-[100%] line-clamp-1`}
                    >
                      {data?.className}
                    </span>
                  </div>
                </Link>
              </ListboxItem>
            ) : (
              ""
            )
          )}
        </Listbox>
      )}

      {dropEnroll ? (
        <Listbox aria-label="Actions">
          <ListboxItem
            className={`${
              pathName == "/classes"
                ? "text-[#000] font-bold"
                : "text-inUseGray"
            } h-[40px]`}
            key="copy"
            onClick={() => handleDropEnroll()}
          >
            <p className="flex items-center relative">
              <Image src={enroll} alt="" />
              <span
                id="disable"
                className={`${
                  pathName == "/classes" ? "font-bold" : ""
                } absolute left-[30px]`}
              >
                Enroll
              </span>
              <Image src={arrowRight} alt="" className="absolute right-0" />
            </p>
          </ListboxItem>
        </Listbox>
      ) : (
        <Listbox aria-label="Actions">
          <ListboxItem
            className={`${
              pathName == "/classes"
                ? "text-[#000] font-bold"
                : "text-inUseGray"
            } h-[40px]`}
            key="copy"
            onClick={() => handleDropEnroll()}
          >
            <p className="flex items-center relative">
              <Image src={enroll} alt="" />

              <span
                id="disable"
                className={`${
                  pathName == "/classes" ? "font-bold" : ""
                } absolute left-[30px]`}
              >
                Enroll
              </span>
              <Image src={arrowDown} alt="" className="absolute right-0" />
            </p>
          </ListboxItem>
          {classData?.map((data, i) =>
            !data.isTeacher && data?.status ? (
              <ListboxItem
                key={data.key}
                className={`${
                  lastTwoSegment[0] == data?.classId.replace(" ", '"')
                    ? "text-[#000] font-bold"
                    : "text-inUseGray"
                } h-[40px] flex items-center`}
              >
                <Link
                  href={`/dashboard/${data?.classId.replace(
                    " ",
                    ""
                  )}/streaming`}
                  className="w-[100%] h-[100%]"
                >
                  <div className="flex gap-2 items-center">
                    <span
                      className="2xl:w-[35px] 2xl:h-[28px] xl:w-[35px] xl:h-[25px] flex items-center text-[#ccc] justify-center text-[16px] rounded-full"
                      style={{
                        backgroundColor: i % 2 == 0 ? "#D0EAAF" : "#FFC1CB",
                        color: i % 2 == 0 ? "#9DD356" : "#FF69B4",
                      }}
                    >
                      {data?.className[0]}
                    </span>
                    <span
                      id=""
                      className={`${
                        lastTwoSegment[0] == data?.className.replace(" ", '"')
                          ? "font-bold"
                          : ""
                      } w-[100%] h-[100%] line-clamp-1`}
                    >
                      {" "}
                      {data?.className}
                    </span>
                  </div>
                </Link>
              </ListboxItem>
            ) : (
              ""
            )
          )}
        </Listbox>
      )}
    </>
  );
};

export default DropDownClassesComponent;
