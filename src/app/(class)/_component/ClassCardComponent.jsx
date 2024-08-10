import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import EditClassComponent from "./EditClassComponent";
import DisableClassComponent from "./DisableClassComponent";
import DeletePopUpForm from "./DeletePopUpForm";
import ConfirmPopUpForm from "./ConfirmPopUpForm";
import { getAllMembersInClassAction } from "@/action/classAction";

const ClassCardComponent = ({ data, ind }) => {
  const [classId, setClassId] = useState();
  const IDs = data?.classId;
  const [member, setMember] = useState([]);

  useEffect(() => {
    async function getMembers() {
      const res = await getAllMembersInClassAction(IDs);
      setMember(res);
    }
    getMembers();
  }, []);

  const [openEditClass, setOpenEditClass] = useState(false);
  function showModalEditClass(e) {
    setClassId(e.currentTarget.getAttribute("data-id"));
    setOpenEditClass(true);
  }

  function showModalDisableClass(e) {
    setClassId(e.currentTarget.getAttribute("data-id"));
    setOpenDisableClass(true);
  }
  const [openDisableClass, setOpenDisableClass] = useState(false);

  const [openDeleteClass, setOpenDeleteClass] = useState(false);
  const [openConfirmClass, setOpenConfirmClass] = useState(false);
  function handleDeletePopup(isOpen) {
    setOpenDeleteClass(isOpen);
  }

  function handleConfirmPopup(isOpen) {
    setOpenDeleteClass(false);
    setOpenConfirmClass(isOpen);
  }

  return (
    <Card
      className="py-2 h-[260px] w-[235px]  float-left my-[15px]"
      id="classCard"
    >
      <CardHeader className="pb-2 pt-2 px-4 flex-col items-start">
        <div className="w-[100%] ">
          <div className="w-[45px] h-[45px] rounded-full bg-primary float-left overflow-hidden">
            <div className=" w-[100%] h-[100%] flex justify-center items-center overflow-hidden">
              <Avatar
                src={data?.createdBy?.profileUrl}
                className="h-[100%] w-[100%] top-0 left-0 object-cover"
              ></Avatar>
            </div>
          </div>
          <div className="w-[70%] h-[50px] ml-[5%] float-left relative">
            {/* Class creator */}
            <h3 className="font-medium 2xl:text-[16px] xl:text-[12px] text-primary mt-[5px] line-clamp-1 capitalize">
              {data?.createdBy?.firstName} {data?.createdBy?.lastName}
            </h3>
            {/* description */}
            <p className="text-[12px] text-[#757575] capitalize line-clamp-1">
              {data?.description}
            </p>
            {openEditClass && (
              <EditClassComponent
                classId={classId}
                classData={data}
                openEditClass={() => setOpenEditClass(false)}
              />
            )}
            {openDisableClass && (
              <DisableClassComponent
                classId={classId}
                openDisableClass={() => setOpenDisableClass(false)}
              />
            )}
            {openDeleteClass && (
              <DeletePopUpForm
                handleDeletePopup={handleDeletePopup}
                handleConfirmPopup={handleConfirmPopup}
              />
            )}
            {openConfirmClass && (
              <ConfirmPopUpForm handleConfirmPopup={handleConfirmPopup} />
            )}
            {/* Popup edit disable class */}
            {data.isTeacher == true ? (
              //Role Teacher
              <Dropdown className="min-w-[150px]">
                <DropdownTrigger>
                  <Button className="absolute min-w-0 h-[20px] w-[20px] flex justify-center items-center top-[0] right-[-10px] text-[#757575] p-0 m-0 hover:bg-inUseGray hover:text-white bg-white z-50">
                    <i className="fa-solid fa-ellipsis"></i>
                  </Button>
                </DropdownTrigger>
                {/*  Edit*/}
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="edit"
                    className="relative hover:bg-transparent data-[hover=true]:bg-blue-200"
                    data-id={data?.classId}
                    onClick={(e) => showModalEditClass(e)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7687 5.78424L13.2373 6.2935L13.7687 5.78424L13.7458 5.76044C13.5199 5.52467 13.3133 5.30902 13.1245 5.14791C12.9204 4.97379 12.6747 4.80712 12.3568 4.7367C12.1075 4.68148 11.8491 4.68148 11.5998 4.7367C11.2819 4.80712 11.0362 4.97379 10.8321 5.14791C10.6433 5.30902 10.4366 5.52468 10.2107 5.76045L10.1879 5.78424L4.62409 11.59C4.61207 11.6025 4.59994 11.6151 4.58774 11.6278C4.43816 11.7833 4.27735 11.9504 4.1641 12.1579C4.05085 12.3654 3.99725 12.5911 3.9474 12.801C3.94333 12.8181 3.93929 12.8351 3.93524 12.852L3.45707 14.8478C3.45455 14.8583 3.45198 14.869 3.44937 14.8799C3.41301 15.0311 3.36845 15.2165 3.35437 15.3766C3.33847 15.5575 3.34038 15.9141 3.63244 16.2004C3.9245 16.4866 4.28109 16.4814 4.46162 16.4619C4.62143 16.4446 4.80584 16.3963 4.9563 16.3569C4.96711 16.3541 4.97775 16.3513 4.9882 16.3486L6.82837 15.8686C6.84593 15.864 6.86362 15.8594 6.88141 15.8548C7.09943 15.7984 7.33387 15.7377 7.5465 15.6129C7.75913 15.4881 7.92633 15.3129 8.08181 15.15C8.0945 15.1367 8.10712 15.1235 8.11968 15.1104L13.7687 9.21576L13.7903 9.19322C13.999 8.97544 14.1913 8.7748 14.3352 8.59216C14.4915 8.39361 14.6392 8.15806 14.7019 7.8588C14.7515 7.62217 14.7515 7.37783 14.7019 7.1412C14.6392 6.84194 14.4915 6.60639 14.3352 6.40784C14.1913 6.22519 13.999 6.02456 13.7903 5.80678L13.7687 5.78424Z"
                        stroke="#CCCCCC"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M9.98242 6.25016L12.3783 4.5835L14.7741 7.0835L13.1769 9.5835L9.98242 6.25016Z"
                        fill="#CCCCCC"
                      />
                    </svg>

                    <p
                      data-id={data?.classId}
                      className="absolute left-[30%] top-[50%] translate-y-[-48%]"
                    >
                      Edit
                    </p>
                  </DropdownItem>

                  {/* Disable */}
                  <DropdownItem
                    key="disable"
                    className="relative border-t-2 rounded-none data-[hover=true]:bg-blue-200"
                    data-id={data?.classId}
                    onClick={(e) => showModalDisableClass(e)}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-[4px]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.33333 17.3334C12.9358 17.3334 16.6667 13.6026 16.6667 9.00008C16.6667 4.39758 12.9358 0.666748 8.33333 0.666748C3.73083 0.666748 0 4.39758 0 9.00008C0 13.6026 3.73083 17.3334 8.33333 17.3334ZM4.245 14.2667L13.6 4.91175C14.5971 6.19439 15.0915 7.79699 14.9904 9.41846C14.8892 11.0399 14.1995 12.5687 13.0507 13.7174C11.9019 14.8662 10.3732 15.556 8.75171 15.6571C7.13024 15.7583 5.52764 15.2639 4.245 14.2667ZM3.06667 13.0884C2.06956 11.8058 1.57513 10.2032 1.67628 8.5817C1.77743 6.96023 2.46719 5.4315 3.61597 4.28272C4.76475 3.13393 6.29348 2.44418 7.91495 2.34303C9.53642 2.24188 11.139 2.73631 12.4217 3.73341L3.06667 13.0884Z"
                        fill="#ff9d9d"
                      />
                    </svg>

                    <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
                      Disable
                    </p>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              ""
            )}
          </div>
        </div>
      </CardHeader>
      {/* class name */}
      <Link
        href={`/dashboard/${data?.classId.replace(" ", "")}/streaming`}
        className="h-[300px]"
      >
        <CardBody
          className={`overflow-visible py-2 relative w-[212px] h-[100%] m-auto rounded-xl mt-[7px] `}
          style={{
            backgroundColor:
              ind % 3 === 0 ? "#387ADF" : ind % 3 === 1 ? "#FBA834" : "#50CC64",
          }}
        >
          <div className="absolute right-0 h-[110.53px] w-[118.9px] mt-[10px] flex justify-center items-center ">
            <svg
              width="119"
              height="111"
              viewBox="0 0 119 111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          <div
            className={`rounded-xl absolute left-[10px] top-[25%] h-[55px] w-[51.78px]  flex justify-center items-center`}
            style={{
              backgroundColor:
                ind % 3 === 0
                  ? "#8BB4E4"
                  : ind % 3 === 1
                  ? "#FFD089"
                  : "#A4E3A7",
            }}
          >
            {/* Image */}
            {data?.profileUrl ? (
              <Image className="h-[55px] w-[51.78px]" src={data?.profileUrl} />
            ) : (
              <svg
                width="29"
                height="36"
                viewBox="0 0 29 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
            )}
          </div>
          {/* class name */}
          <p className="absolute left-[10px] top-[72%] text-white w-[100%] h-[20px] text-[16px] z-20 uppercase">
            {data?.className}
          </p>
        </CardBody>
      </Link>
      <CardFooter className="px-[15px]">
        <footer className="flex justify-center items-center text-[#757575] ">
          <i
            className="fa-solid fa-users float-left mr-[10px] mt-[20px] text-[12px] "
            id="iconMember"
          ></i>
          <p className="float-left 2xl:text-[12px] pt-[20px]">
            <span className="text-[#f28a2a]">{member?.payload?.length}</span>{" "}
            Member
          </p>
        </footer>
      </CardFooter>
    </Card>
  );
};

export default ClassCardComponent;
