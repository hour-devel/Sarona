"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import image from "../../../../../../../public/boy.svg";
import time from "../../../../../../../public/time.svg";
import Image from "next/image";
import RestoreClassComponent from "@/app/(class)/_component/RestoreClassComponent";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { getAllMembersInClassAction } from "@/action/classAction";
const CardRestorComponent = ({ classSettingData, disableClass }) => {
  const [openRestoreClass, setOpenRestoreClass] = useState(false);
  const [memberCount, setMemberCount] = useState();
  const [profileUrl, setProfileUrl] = useState();

  useEffect(() => {
    async function getMemberCount() {
      const res = await getAllMembersInClassAction(disableClass.classId);
      setMemberCount(res);
    }
    getMemberCount();
  }, []);
  return (
    <>
      <Card
        className="py-2 h-[260px] w-[235px]  float-left my-[15px]"
        id="classCard"
      >
        <CardHeader className="pb-2 pt-2 px-4 flex-col items-start">
          <div className="w-[100%] flex justify-between">
            <div className="w-[52px] h-[52px] rounded-full float-left overflow-hidden">
              <img
                src={disableClass?.createdBy?.profileUrl}
                alt="profile"
                className="object-cover w-[100%] h-[100%]"
                onChange={(e) => setProfileUrl(e.target.value)}
              ></img>
            </div>

            <div className="w-[70%] h-[50px] ml-[5%] float-left">
              <h3 className="font-medium 2xl:text-[16px] xl:text-[12px] text-primary mt-[5px]">
                {disableClass?.createdBy.firstName +
                  " " +
                  disableClass?.createdBy.lastName}
              </h3>
              <p className="text-[12px] text-[#757575] line-clamp-1">
                {disableClass?.description}
              </p>
            </div>
            <Button className=" min-w-0 h-[20px] top-[0] right-0 text-[#757575] p-0 hover:bg-transparent bg-white">
              <Image
                src={time}
                className="object-cover w-[20px] h-[20px]"
                onClick={() => setOpenRestoreClass(true)}
              ></Image>

              {openRestoreClass && (
                <RestoreClassComponent
                  cardInfoId={disableClass.classId}
                  openRestoreClass={() => setOpenRestoreClass(false)}
                />
              )}
            </Button>
          </div>
        </CardHeader>

        <CardBody className="overflow-y-visible bg-primary w-[202px] h-[93%] m-auto  rounded-lg">
          <div className="absolute right-0 h-[110.53px] w-[118.9px] mt-[10px] flex justify-center items-center">
            <svg
              width="119"
              height="111"
              viewBox="0 0 119 111"
              fill="none"
              xmlns=""
            >
              <g clipPath="url(#clip0_3861_7052)">
                <path
                  d="M29.7247 53.4561V82.9009H61.3978L54.7924 76.7601H36.3302V59.5968L29.7247 53.4561Z"
                  fill="#99C1FF"
                  fill-opacity="0.1"
                />
                <path
                  d="M115.166 99.1423L105.687 90.2075V98.2519H13.211V85.5099H19.8164V80.5973H13.211V60.1794H19.8164V55.2668H13.211V35.6165H19.8164V30.7039H13.211V13.5405L65.8563 62.2058V53.5474L12.2532 3.961C11.7912 3.52799 11.201 3.23268 10.5578 3.11272C9.91463 2.99276 9.24758 3.05359 8.64171 3.28745C8.03585 3.52131 7.51862 3.9176 7.15598 4.42581C6.79334 4.93401 6.60171 5.53111 6.60552 6.14096V101.322C6.60552 102.137 6.95349 102.918 7.57287 103.493C8.19225 104.069 9.03231 104.393 9.90825 104.393H112.821C113.477 104.396 114.119 104.218 114.666 103.881C115.213 103.544 115.639 103.063 115.89 102.5C116.142 101.936 116.207 101.316 116.078 100.718C115.949 100.12 115.632 99.5718 115.166 99.1423Z"
                  fill="#99C1FF"
                  fill-opacity="0.1"
                />
                <path
                  d="M79.266 92.1097H92.4768C94.2287 92.1097 95.9088 91.4627 97.1476 90.3111C98.3864 89.1595 99.0823 87.5976 99.0823 85.969V26.7109L91.486 13.7233C90.8985 12.7771 90.0501 11.9937 89.0283 11.454C88.0065 10.9143 86.8483 10.6377 85.6732 10.6529C84.4715 10.6618 83.2952 10.9753 82.2709 11.5596C81.2466 12.1439 80.4132 12.9769 79.8605 13.9689L72.6605 26.7724V85.969C72.6605 87.5976 73.3565 89.1595 74.5952 90.3111C75.834 91.4627 77.5141 92.1097 79.266 92.1097ZM79.266 28.2461L85.6732 16.6709L92.4768 28.2768V73.6875H79.266V28.2461ZM79.266 78.6922H92.4768V86.1839H79.266V78.6922Z"
                  fill="#99C1FF"
                  fill-opacity="0.1"
                />
              </g>
              <defs>
                <clipPath id="clip0_3861_7052">
                  <rect width="118.898" height="110.533" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className=" rounded-xl absolute left-[10px] top-[30%] h-[55px] w-[51.78px] bg-white flex justify-center items-center">
            <svg
              width="29"
              height="36"
              viewBox="0 0 29 36"
              fill="none"
              xmlns=""
            >
              <g clipPath="url(#clip0_3861_7047)">
                <path
                  d="M7.29712 17.8706V27.1942H14.9822L13.3795 25.2498H8.89986V19.8151L7.29712 17.8706Z"
                  fill="#387ADF"
                />
                <path
                  d="M28.0287 32.3384L25.7288 29.5092V32.0564H3.29049V28.0217H4.89323V26.4661H3.29049V20.0009H4.89323V18.4453H3.29049V12.2231H4.89323V10.6675H3.29049V5.2328L16.0643 20.6425V17.9009L3.0581 2.19946C2.94601 2.06235 2.8028 1.96884 2.64674 1.93086C2.49068 1.89287 2.32882 1.91214 2.18182 1.98619C2.03481 2.06024 1.90931 2.18572 1.82132 2.34665C1.73333 2.50757 1.68683 2.69663 1.68776 2.88974V33.0286C1.68776 33.2865 1.77219 33.5338 1.92247 33.7161C2.07276 33.8984 2.27659 34.0009 2.48913 34.0009H27.4598C27.6189 34.002 27.7748 33.9456 27.9074 33.8388C28.0401 33.7321 28.1435 33.5798 28.2045 33.4015C28.2656 33.2231 28.2814 33.0267 28.2501 32.8374C28.2188 32.6481 28.1417 32.4743 28.0287 32.3384Z"
                  fill="#387ADF"
                />
                <path
                  d="M19.3178 30.1118H22.5233C22.9484 30.1118 23.356 29.907 23.6566 29.5423C23.9572 29.1777 24.126 28.6831 24.126 28.1674V9.40351L22.2829 5.29101C22.1403 4.99139 21.9345 4.74334 21.6866 4.57244C21.4386 4.40154 21.1576 4.31398 20.8725 4.31879C20.5809 4.3216 20.2955 4.42086 20.0469 4.60588C19.7984 4.7909 19.5962 5.05468 19.4621 5.36879L17.7151 9.42296V28.1674C17.7151 28.6831 17.8839 29.1777 18.1845 29.5423C18.4851 29.907 18.8928 30.1118 19.3178 30.1118ZM19.3178 9.88963L20.8725 6.22435L22.5233 9.89935V24.2785H19.3178V9.88963ZM19.3178 25.8632H22.5233V28.2355H19.3178V25.8632Z"
                  fill="#387ADF"
                />
              </g>
              <defs>
                <clipPath id="clip0_3861_7047">
                  <rect
                    width="28.8493"
                    height="35"
                    fill="white"
                    transform="translate(0.0847168 0.945312)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p className="absolute left-[10px] top-[75%] text-white w-[100%] h-[20px] text-[13px] text-medium z-20">
            {disableClass.className}
          </p>
        </CardBody>
        <CardFooter className="px-[15px]">
          <footer className="flex justify-center items-center text-[#757575] ">
            <i
              className="fa-solid fa-users float-left mr-[10px] mt-[20px] text-[12px] "
              id="iconMember"
            ></i>
            <p className="float-left 2xl:text-[12px] pt-[20px]">
              <span className="text-[#f28a2a]">
                {memberCount?.payload?.length}
              </span>{" "}
              Member
            </p>
          </footer>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardRestorComponent;
