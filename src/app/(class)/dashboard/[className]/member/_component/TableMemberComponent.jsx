// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
//   DropdownTrigger,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Avatar,
// } from "@nextui-org/react";
// import { Switch } from "@nextui-org/react";
// import Image from "next/image";
// import removeIcon from "../../../../../../../public/icon streaming/Remove.svg";
// import RemoveMemberPopup from "./RemoveMemberPopup";
// import { getAllClassAction } from "@/action/classAction";
// import { changeRoleAction, removeMemberAction } from "@/action/memberAction";
// import toast from "react-hot-toast";
// import { useSession } from "next-auth/react";

// const TableMemberComponent = ({
//   currentPage,
//   itemsPerPage,
//   classID,
//   allMember,
//   roleFilter,
//   searchTerm,
// }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [memberId, setMemberId] = useState(null);
//   const [isSelectedRole, setIsSelectedRole] = useState(false);

//   useEffect(() => {
//     //console.log("isSelectedRole", isSelectedRole);
//   }, [isSelectedRole]);

//   async function handleChangeRole(memberId) {
//     setIsSelectedRole(!isSelectedRole);
//     const changeRole = await changeRoleAction(
//       classID,
//       memberId,
//       isSelectedRole
//     );
//     console.log("Change role : ",changeRole);
//     if (changeRole?.errorStatusCode === 403) {
//       toast.error("User is not allowed to update role");
//     } else if (changeRole?.statusCode === 200) {
//       toast.success("Role has been updated");
//     } else {
//       toast.error("Something went wrong");
//     }
//   }

//   const filterMembers = (member) => {
//     const fullName = `${member?.firstName}${member?.lastName}`
//       .replace(/\s+/g, "")
//       .toLowerCase();
//     const searchLower = searchTerm?.replace(/\s+/g, "").toLowerCase();
//     const matchesSearch =
//       fullName?.includes(searchLower) ||
//       member?.email?.toLowerCase()?.includes(searchLower) ||
//       (member.isTeacher ? "teacher" : "student").includes(searchLower);

//     const matchesRole =
//       roleFilter === "All" ||
//       (roleFilter === "Teacher" && member.isTeacher) ||
//       (roleFilter === "Student" && !member.isTeacher);

//     return matchesRole && matchesSearch;
//   };

//   function handleDeletePopup(isOpen, memberId) {
//     setIsPopupOpen(isOpen);
//     setMemberId(memberId);
//   }

//   async function handleRemoveMember() {
//     const removeMember = await removeMemberAction(memberId, classID);
//     //console.log("remove member  :", removeMember);
//     if (removeMember?.statusCode === 200) {
//       toast.success("Member removed successfully");
//     } else {
//       toast.error("Failed to remove member");
//     }
//     setIsPopupOpen(false);
//   }

//   return (
//     <div>
//       {isPopupOpen && (
//         <RemoveMemberPopup
//           isOpen={isPopupOpen}
//           handleDelete={handleRemoveMember}
//           handleClose={() => setIsPopupOpen(false)}
//         />
//       )}
//       {allMember && (
//         <Table
//           hideScrollBar
//           removeWrapper
//           className="w-[100%] h-[100%] float-left"
//         >
//           <TableHeader className="  ">
//             <TableColumn className="text-left py-3 pl-6 w-[8%] 2xl:text-[16px] xl:text-[15px] text-[#2B2828] font-semibold">
//               No
//             </TableColumn>
//             <TableColumn className="text-left w-[22%] 2xl:text-[16px] xl:text-[15px] text-[#2B2828] font-semibold">
//               Name
//             </TableColumn>
//             <TableColumn className="text-left w-[25%] 2xl:text-[16px] xl:text-[15px] text-[#2B2828] font-semibold">
//               Email
//             </TableColumn>
//             <TableColumn className="text-left w-[15%] 2xl:text-[16px] xl:text-[15px] text-[#2B2828] font-semibold">
//               Role
//             </TableColumn>
//             <TableColumn className="text-left w-[5%] 2xl:text-[16px] xl:text-[15px] text-[#2B2828] font-semibold pr-6">
//               Action
//             </TableColumn>
//           </TableHeader>
//           <TableBody>
//             {allMember.filter(filterMembers).map((member, i) => (
//               <TableRow
//                 key={i}
//                 className="hover:bg-[#f4f4f6] transition-[0.5s] "
//               >
//                 <TableCell className="pl-6 text-left w-[8%] py-[20px] text-inUseGray font-normal text-[16px]">
//                   {(currentPage - 1) * itemsPerPage + i + 1}
//                 </TableCell>
//                 <TableCell className="text-left w-[100%] py-[20px] text-inUseGray font-normal text-[16px] flex items-center relative">
//                   <Avatar
//                     src={member?.profileUrl}
//                     alt="Profile Image"
//                     className="absolute "
//                   />
//                   <p className="absolute left-[5%] uppercase 2xl:text-[16px] xl:text-[15px]">
//                     {`${member.firstName} ${member.lastName}`}
//                   </p>
//                 </TableCell>
//                 <TableCell className="text-left w-[25%] py-[20px] text-inUseGray font-normal2xl:text-[16px] xl:text-[15px]">
//                   {member.email}
//                 </TableCell>
//                 <TableCell className="text-left w-[15%] py-[20px] text-inUseGray font-normal 2xl:text-[16px] xl:text-[15px] uppercase">
//                   {member.isTeacher ? "Teacher" : "Student"}
//                 </TableCell>
//                 <TableCell className="py-[20px] w-[5%] text-inUseGray font-medium 2xl:text-[16px] xl:text-[15px] text-left">
//                   <Dropdown className="min-w-[210px]">
//                     <DropdownTrigger className="bg-white">
//                       <Button className="min-w-3 h-[10px] text-[#757575] px-[0px] py-[12px] bg-transparent hover:text-black">
//                         <i className="fa-solid fa-ellipsis-vertical"></i>
//                       </Button>
//                     </DropdownTrigger>
//                     <DropdownMenu aria-label="Static Actions">
//                       <DropdownItem
//                         key="new"
//                         className="relative hover:bg-transparent data-[hover=true]:bg-blue-200"
//                       >
//                         <Switch
//                           isSelected={isSelectedRole}
//                           onValueChange={() => handleChangeRole(member?.userId)}
//                           defaultSelected
//                           size="sm"
//                         >
//                           <p className="absolute left-[20%] top-[50%] translate-y-[-48%]">
//                             Switch to {member.isTeacher ? "Student" : "Teacher"}
//                           </p>
//                         </Switch>
//                       </DropdownItem>
//                       <DropdownItem
//                         key="copy"
//                         className="relative data-[hover=true]:bg-blue-200"
//                         onClick={() => handleDeletePopup(true, member?.userId)}
//                       >
//                         <Image
//                           src={removeIcon}
//                           className="ml-1"
//                           width={25}
//                           height={25}
//                           alt=""
//                         />{" "}
//                         <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
//                           Remove
//                         </p>
//                       </DropdownItem>
//                     </DropdownMenu>
//                   </Dropdown>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default TableMemberComponent;

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import Image from "next/image";
import removeIcon from "../../../../../../../public/icon streaming/Remove.svg";
import RemoveMemberPopup from "./RemoveMemberPopup";
import { getAllClassAction } from "@/action/classAction";
import { changeRoleAction, removeMemberAction } from "@/action/memberAction";
import toast from "react-hot-toast";

const TableMemberComponent = ({
  currentPage,
  itemsPerPage,
  classID,
  allMember,
  roleFilter,
  searchTerm,
  classinfo
}) => {
 
  console.log("Abc: ", classinfo)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [isSelectedRole, setIsSelectedRole] = useState(false);

  useEffect(() => {
    console.log("isSelectedRole", isSelectedRole);
  }, [isSelectedRole]);

  async function handleChangeRole(memberId) {
    setIsSelectedRole(!isSelectedRole);
    const changeRole = await changeRoleAction(
      classID,
      memberId,
      isSelectedRole
    );
    console.log("Change role : ", changeRole);
    if (changeRole?.errorStatusCode === 403) {
      toast.error("User is not allowed to update role");
    } else if (changeRole?.statusCode === 200) {
      toast.success("Role has been updated");
    } else {
      toast.error("Something went wrong");
    }
  }

  const filterMembers = (member) => {
    const fullName = `${member?.firstName}${member?.lastName}`
      .replace(/\s+/g, "")
      .toLowerCase();
    const searchLower = searchTerm?.replace(/\s+/g, "").toLowerCase();
    const matchesSearch =
      fullName?.includes(searchLower) ||
      member?.email?.toLowerCase()?.includes(searchLower) ||
      (member.isTeacher ? "teacher" : "student").includes(searchLower);

    const matchesRole =
      roleFilter === "All" ||
      (roleFilter === "Teacher" && member.isTeacher) ||
      (roleFilter === "Student" && !member.isTeacher);

    return matchesRole && matchesSearch;
  };

  function handleDeletePopup(isOpen, memberId) {
    setIsPopupOpen(isOpen);
    setMemberId(memberId);
  }

  async function handleRemoveMember() {
    const removeMember = await removeMemberAction(memberId, classID);
    console.log("remove member  :", removeMember);
    if (removeMember?.statusCode === 200) {
      toast.success("Member removed successfully");
    } else {
      toast.error("Failed to remove member");
    }
    setIsPopupOpen(false);
  }

  return (
    <div>
      {isPopupOpen && (
        <RemoveMemberPopup
          isOpen={isPopupOpen}
          handleDelete={handleRemoveMember}
          handleClose={() => setIsPopupOpen(false)}
        />
      )}
      {allMember && (
        <Table
          hideScrollBar
          removeWrapper
          className="w-[100%] h-[100%] float-left"
        >
          <TableHeader className="  ">
            <TableColumn className="text-left py-3 pl-6 w-[8%] 2xl:text-[16px] xl:text-[15px] text-[#2B2828] font-semibold">
              No
            </TableColumn>
            <TableColumn className="text-left w-[22%] 2xl:text-[16px] xl:text-[15px] text-[#2B2828] font-semibold">
              Name
            </TableColumn>
            <TableColumn className="text-left w-[25%] 2xl:text-[16px] xl:text-[15px] text-[#2B2828] font-semibold">
              Email
            </TableColumn>
            <TableColumn className="text-left w-[15%] 2xl:text-[16px] xl:text-[15px] text-[#2B2828] font-semibold">
              Role
            </TableColumn>
            <TableColumn className="text-left w-[5%] 2xl:text-[16px] xl:text-[15px] text-[#2B2828] font-semibold pr-6">
              Action
            </TableColumn>
          </TableHeader>
          <TableBody>
            {allMember.filter(filterMembers).map((member, i) => (
              <TableRow
                key={i}
                className="hover:bg-[#f4f4f6] transition-[0.5s] "
              >
                <TableCell className="pl-6 text-left w-[8%] py-[20px] text-inUseGray font-normal text-[16px]">
                  {(currentPage - 1) * itemsPerPage + i + 1}
                </TableCell>
                <TableCell className="text-left w-[100%] py-[20px] text-inUseGray font-normal text-[16px] flex items-center relative">
                  <Avatar
                    src={
                      member.profileUrl ??
                      "http://34.143.147.188:8083/api/v1/fileUpload?fileName=5afc1017-1513-4ff8-aad3-be5d13edad11.png"
                    }
                    alt="Profile Image"
                    className="absolute "
                  />
                  <p className="absolute left-[5%] uppercase 2xl:text-[16px] xl:text-[15px]">
                    {`${member.firstName} ${member.lastName}`}
                  </p>
                </TableCell>
                <TableCell className="text-left w-[25%] py-[20px] text-inUseGray font-normal2xl:text-[16px] xl:text-[15px]">
                  {member.email}
                </TableCell>
                <TableCell className="text-left w-[15%] py-[20px] text-inUseGray font-normal 2xl:text-[16px] xl:text-[15px] uppercase">
                  {member.isTeacher ? "Teacher" : "Student"}
                </TableCell>
                <TableCell className="py-[20px] w-[5%] text-inUseGray font-medium 2xl:text-[16px] xl:text-[15px] text-left">
                  { member.email !== classinfo?.payload.createdBy.email ?(
                     <Dropdown className="min-w-[210px]">
                      <DropdownTrigger className="bg-white">
                        <Button className="min-w-3 h-[10px] text-[#757575] px-[0px] py-[12px] bg-transparent hover:text-black">
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                          key="new"
                          className="relative hover:bg-transparent data-[hover=true]:bg-blue-200"
                        >
                          <Switch
                            isSelected={isSelectedRole}
                            onValueChange={() => handleChangeRole(member?.userId)}
                            defaultSelected
                            size="sm"
                          >
                            <p className="absolute left-[20%] top-[50%] translate-y-[-48%]">
                              Switch to {member.isTeacher ? "Student" : "Teacher"}
                            </p>
                          </Switch>
                        </DropdownItem>
  
                        <DropdownItem
                          key="copy"
                          className="relative data-[hover=true]:bg-blue-200"
                          onClick={() => handleDeletePopup(true, member?.userId)}
                        >
                          <Image
                            src={removeIcon}
                            className="ml-1"
                            width={25}
                            height={25}
                            alt=""
                          />{" "}
                          <p className="absolute left-[30%] top-[50%] translate-y-[-48%]">
                            Remove
                          </p>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown> 
                  ) : (<p className="text-left w-[15%] py-[20px] text-inUseGray font-normal 2xl:text-[16px] xl:text-[15px]">Owner</p>) }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TableMemberComponent;
