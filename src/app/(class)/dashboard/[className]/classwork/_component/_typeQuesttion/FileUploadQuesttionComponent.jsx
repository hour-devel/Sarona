import Image from "next/image";
import React from "react";
import pds from "../../../../../../../../public/pds.svg";


const FileUploadQuesttionComponent = () => {
  return (
    <div className="w-[100%] h-[170px] mt-[25px] rounded-[10px] shadow-small border-1 bg-white p-[20px]">
      <div className="w-[100%] h-[15%] float-left flex justify-between text-black text-[16px]">
        <p>Homework</p>
        <span className="mr-[20px]">__/2</span>
      </div>
      <div className="w-[100%] h-[80%] float-left mt-[10px] py-5  relative top-0">
        <div className="w-[201px] h-[62px] border-1 bg-white flex items-center rounded-[10px] text-[16px] cursor-pointer">
          <Image
            src={pds}
            alt=""
            className="ml-3 w-[20px] h-[20px] absolute top-[40px]"
          ></Image>
          <p className="absolute ml-[40px] text-black">Please choose file</p>
        </div>
        <div className="w-[100%] h-[100%]">
          <input
            type="file"
            placeholder="Please choose your file"
            className="w-[201px] h-[100%] absolute top-[30px] opacity-0"
          />
        </div>
      </div>
    </div>
  );
};

export default FileUploadQuesttionComponent;
