import React from "react";

const RegisterSuccessPopupComponent = () => {
  return (
    <div className="left-[5px]  w-[578px] rounded-2xl text-center h-auto bg-white py-5 shadow-sd">
      <div className=" px-6 pb-5 text-2xl font-bold">
        <div className="py-1 flex justify-center  mt-[-90px]">
          <Image src={success} alt="not found" />
        </div>
      </div>
      <div className="px-7 pb-4 text-[#51CC64] mt-10 text-[32px] font-bold">
        REGISTRATION SUCCESS
      </div>
      <div className="px-7 pb-4 text-inUseGray">
        Your account has been successfully created.
      </div>
      <div className="w-full px-16 mt-6 mb-2">
        <button className="w-full py-2 border rounded-xl text-white bg-primary">
          Start now
        </button>
      </div>
    </div>
  );
};

export default RegisterSuccessPopupComponent;
