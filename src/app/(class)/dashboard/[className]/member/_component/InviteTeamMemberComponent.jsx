"use client";
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Suspense, useState } from "react";
import InviteMemberByEmail from "./InviteMemberByEmail";
import InviteMemberByCode from "./InviteMemberByCode";

const InviteTeamMemberComponent = ({ classId }) => {
  const [isOpenClassCode, setIsOpenClassCode] = useState(false);
  const [isOpenAddMember, setIsOpenAddMember] = useState(false);

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

  return (
    <div>
      {/* Class Code */}
      {isOpenClassCode && (
        <Suspense fallback="Loding Code">
          <InviteMemberByCode classId={classId} />
        </Suspense>
      )}
      {/* Add Member by emails */}
      {isOpenAddMember && (
        <Suspense fallback="Loding Code">
          <InviteMemberByEmail classId={classId}/>
        </Suspense>
      )}
      <div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              key="new"
              variant="flat"
              onClick={handleCloseClassCode}
              className="border-0 h-[40px] bg-primary w-[100%] rounded-lg flex justify-center px-[10px] ml-[3px] text-[#fff] hover:bg-[#D4D4D8] hover:text-[#000] relative"
            >
              <p
                id="sideBarList"
                className="w-[100%] flex justify-center items-center"
              >
                <i className="fa-solid fa-plus p-0 m-0"></i> &nbsp;
                <span>Invite Member</span>
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
    </div>
  );
};

export default InviteTeamMemberComponent;
