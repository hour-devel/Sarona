import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import IconSetting from "../../../../../../public/icon setting svg/Settings.svg";
import LogOutComponent from "../../../../../components/LogOutComponent";
import Image from "next/image";

const NavbarSettingComponent = () => {
  const [openLogout, setOpenLogout] = useState(false);

  return (
    <div className="w-[100%] mt-[20px] h-[6%] flex justify-between">
      <div>
        <h1 className="flex items-center">
          <Image
            src={IconSetting}
            alt="not found"
            className="w-[20px] h-[20px]"
          />
          <p className="ml-3">Setting &gt; User</p>
        </h1>
      </div>
      <div>
        <Button
          className="bg-primary text-white outline-none "
          onClick={() => setOpenLogout(true)}
        >
          <i className="fa-solid fa-right-from-bracket"></i>Log Out
        </Button>
        {openLogout && (
          <LogOutComponent onCloseLogout={() => setOpenLogout(false)} />
        )}
      </div>
    </div>
  );
};

export default NavbarSettingComponent;
