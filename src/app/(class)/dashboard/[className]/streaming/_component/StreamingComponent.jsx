import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import draflist from "../../../../../../../public/icon streaming/File_doc_search.svg";
import PopUpAnnouncementComponent from "./PopUpAnnouncementComponent";
import ClassCodeComponent from "./ClassCodeComponent";
import AddMemberByEmailComponent from "./AddMemberByEmailComponent";
import AnnouncementListCompoent from "./AnnouncementListCompoent";
import DraftAnnouncementCompoent from "./DraftAnnouncementCompoent";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AssignIcon from "../../../../../../../public/icon/assignment.svg";
import examIcon from "../../../../../../../public/icon/exam.svg";

const StreamingComponent = ({
  classID,
  announceData,
  allClassData,
  classData,
  userData,
  pathName,
  currentPath,
  memberInClass,
  upComingClasswork,
  role,
}) => {
  const route = useRouter();
  const [isOpenDraft, setIsOpenDraft] = useState(false);
  const [isOpenClassCode, setIsOpenClassCode] = useState(false);
  const [isOpenAddMember, setIsOpenAddMember] = useState(false);
  const handleOpenDraft = () => setIsOpenDraft(!isOpenDraft);

  const handleOpenClassCode = () => {
    setIsOpenClassCode(!isOpenClassCode);
    setIsOpenAddMember(false);
  };

  const handleOpenAddMember = () => {
    setIsOpenClassCode(false);
    setIsOpenAddMember(!isOpenAddMember);
  };
  const handleCloseClassCode = () => {
    setIsOpenClassCode(false);
    setIsOpenAddMember(false);
  };

  const [open, setOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const threeDaysFromToday = new Date(today);
  threeDaysFromToday.setDate(today.getDate() + 3);

  var filterUpcomingExam = upComingClasswork?.filter((item) => {
    const itemDate = new Date(item.startDate);
    itemDate.setHours(0, 0, 0, 0);
    return (
      itemDate.getTime() >= today.getTime() &&
      itemDate.getTime() <= threeDaysFromToday.getTime()
    );
  });

  //console.log("Filter upcomming data: ", filterUpcomingExam);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  function handleAllMember() {
    route.push(currentPath.replace(pathName, "/member"));
  }
  function handleUpcoming() {
    route.push(currentPath.replace(pathName, "/classwork"));
  }

  return (
    <>
      <div className="w-[100%] h-[100vh] bg-white float-left overflow-visible">
        <div className=" h-[5%] w-9 my-2 flex cursor-pointer">
          <AvatarGroup
            isBordered
            max={4}
            total={
              memberInClass?.payload?.length > 4
                ? `${memberInClass?.payload?.length - 4}`
                : ""
            }
            onClick={() => handleAllMember()}
            size="sm"
          >
            {memberInClass?.payload?.slice(0, 4).map((user) => (
              <Avatar key={user.id} src={user?.profileUrl} />
            ))}
          </AvatarGroup>
        </div>

        {/* upcomming card */}
        <div className="w-[100%] h-[20%] float-left">
          <div className="w-[100%]  flex float-left">
            <div className="w-[80%] h-[25%] mt-3">
              <h3 className="font-semibold 2xl:text-[24px] xl:text-[20px] text-[#000]  w-[100%] float-left">
                Up Coming
              </h3>
            </div>

            {/* Dropdown Invite Member*/}

            {role && (
              <div className="w-[16%] h-[100%] ml-[10%] flex justify-end z-50">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      key="new"
                      variant="flat"
                      onClick={handleCloseClassCode}
                      className="border-0 2xl:h-[40px] xl:h-[38px] bg-primary w-[100%] rounded-lg flex justify-center px-[10px] ml-[3px] text-[#fff] hover:bg-[#D4D4D8] hover:text-[#000] relative"
                    >
                      <p
                        id="sideBarList"
                        className="w-[100%] 2xl:text-[16px] xl:text-[12px] font-medium flex justify-center items-center"
                      >
                        <i className="fa-solid fa-plus p-0 m-0"></i> &nbsp;
                        <span
                          key="new"
                          variant="flat"
                          onClick={handleCloseClassCode}
                        >
                          Invite Member
                        </span>
                      </p>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                      key="new"
                      variant="flat"
                      onClick={handleOpenClassCode}
                      className="relative data-[hover=true]:bg-blue-200"
                    >
                      Invite By Code
                    </DropdownItem>
                    <DropdownItem
                      key="new"
                      variant="flat"
                      onClick={handleOpenAddMember}
                      className="relative data-[hover=true]:bg-blue-200"
                    >
                      Invite By Email
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            )}
          </div>

          {/* Card Upcomming */}
          <div className="w-[100%] bg-white h-[100px] pt-5 flex items-center justify-start overflow-x-auto scrollbar-hide">
            <div className="flex py-[5px] px-[5px] overflow-visible">
              {filterUpcomingExam?.length > 0 ? (
                filterUpcomingExam?.map((item) => (
                  <Card
                    key={item.classworkId}
                    className="w-[250px] mr-7 border-none h-[70px] shadow-sd cursor-pointer"
                    style={{
                      backgroundColor: "#fff",
                      shadow: "none",
                    }}
                  >
                    <CardBody className="flex justify-center items-center overflow-y-hidden cursor-pointer" onClick={() => handleUpcoming()}>
                      <div className="flex w-[100%] cursor-pointer">
                        <div className="w-[25%] mr-2 rounded-xl" 
                        style={{
                          backgroundColor: item?.isExamination ? "#daf4f0" : "#c9edff",
                        }}>
                          <Image
                            className="object-cover w-[80%] h-[80%] rounded-xl mx-auto mt-[10%]"
                            shadow="md"
                            // src={AssignIcon}
                            src={item?.isExamination ? examIcon : AssignIcon}
                            alt="not found"
                          />
                        </div>
                        <div className="flex flex-col col-span-6 w-[75%]">
                          <div className="w-full">
                            <div className="font-medium line-clamp-1">
                              {item.classworkTitle}
                            </div>
                            <div className="flex text-[12px] mt-1">
                              <div className="line-clamp-1">{formatDate(item.startDate)}</div>
                              <div className="font-bold mx-1">|</div>
                              <div
                                className=""
                                style={{
                                  color: item?.isExamination
                                    ? "#08b69b"
                                    : "#00BFFF",
                                }}
                              >
                                {item.isExamination ? "Exam" : "Assignment"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))
              ) : (
                // <div className="ml-[500px] w-[100%]  mx-auto">
                //   <div className="text-center">
                <p className="2xl:text-lg 2xl:text-center xl:text-sm 2xl:ml-[500px] xl:ml-[300px] text-gray-500 ">
                  Up coming are empty!
                </p>
                //   </div>
                // </div>
              )}
            </div>
          </div>
        </div>

        {/* add announcement */}
        {role && (
          <div className="w-[100%] z-20 h-[10%] mt-2 float-left flex items-center relative ">
            <div className="w-[100%] 2xl:h-[72px] xl:h-[60px] flex justify-start items-center rounded-xl shadow-sd overflow-hidden ">
              <div className="w-[100%] h-[100%] hover:bg-transparent flex justify-start items-center">
                <Button
                  variant="flat"
                  onClick={() => setOpen(true)}
                  className="flex justify-start items-center w-[95%] h-[80%] bg-white"
                >
                  <div className="w-[45px] h-[80%] rounded-lg overflow-hidden">
                    <img
                      src={userData?.payload?.profileUrl}
                      className="h-[100%] w-[100%] object-cover rounded-xl"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="ml-[15px] 2xl:text-[15px] xl:text-[14px] text-inUseGray/40">
                    Announce something to your classes
                  </div>
                </Button>
                <button
                  variant="flat"
                  onClick={handleOpenDraft}
                  className="w-[5%] h-[80%] flex items-center justify-center pr-5"
                >
                  <Image src={draflist} alt="not found"></Image>
                </button>
              </div>
            </div>

            {/* Draft List */}

            {isOpenDraft && (
              <DraftAnnouncementCompoent
                announceData={announceData}
                allClassData={allClassData}
                classID={classID}
              />
            )}

            {/* Announcement Popup */}
            {open && (
              <PopUpAnnouncementComponent
                allClassData={allClassData}
                classID={classID}
                title="Create"
                model={() => setOpen(false)}
              />
            )}
          </div>
        )}

        {/* annnouncemnt */}
        <AnnouncementListCompoent
          allClassData={allClassData}
          announceData={announceData}
          classID={classID}
          classData={classData}
          userData={userData}
          memberInClass={memberInClass}
          role={role}
        />

        {/* Class Code */}
        {isOpenClassCode && <ClassCodeComponent classID={classID} />}

        {/* Add Member by emails */}
        {isOpenAddMember && <AddMemberByEmailComponent classID={classID} />}
      </div>
    </>
  );
};
export default StreamingComponent;
