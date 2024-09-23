import React, { useState } from "react";
import Image from "next/image";
import IconPrevious from "../../public/icon class materail svg/Previous.svg";
import IconNext from "../../public/icon class materail svg/Next.svg";
import { Button, Input } from "@nextui-org/react";

const PaginationComponent = ({
  currentPage,
  setCurrentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => {
  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if ((value === "" || /^\d+$/.test(value))  && value > 0 && value <= totalPages) {
      setCurrentPage(value);
    }
  };
  return (
    <div>
      <div className="w-[206px] h-[45px] rounded-[7.74px] flex items-center overflow-hidden border-2 border-gray-200 shadow-md shadow-blue-50">
        <button
          className="w-[41.2px] h-[100%] flex items-center justify-center hover:bg-gray-200"
          onClick={onPreviousPage}
          disabled={currentPage === 1}
        >
          <Image src={IconPrevious} className="" />
        </button>
        <div className="w-[41.2px] h-[100%]  flex items-center justify-center">
          <p className="text-[14px] text-[#000000a0]">Page</p>
        </div>
        <div className="w-[41.2px] h-[100%] flex items-center justify-center">
          <input
            type="text"
            value={currentPage}
            onChange={handleInputChange}
            className="w-[25px] h-[19.89px] rounded-[3.32px] text-center text-[14px] text-[#000000a0] border-1 border-[#387bdfe4]"
          />
        </div>
        <div className="w-[41.2px] h-[100%] text-[#000000a0] flex items-center justify-center text-[14px]">
          of &nbsp;{totalPages ?? 1}
        </div>
        <button
          className="w-[41.2px] h-[100%] flex items-center justify-center hover:bg-gray-200"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
        >
          <Image src={IconNext} className="" />
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
