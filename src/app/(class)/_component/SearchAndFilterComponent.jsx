"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import assignmentIcon from "../../../../public/icon/assignFilter.svg";
import examinationIcon from "../../../../public/icon/examFilter.svg";
import allIcon from "../../../../public/icon/allFilter.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";

const SearchAndFilterComponent = ({ onFilterChange, onSearchChange }) => {
  const currentPath = usePathname();
  const segments = currentPath.split("/");
  const pathName = "/" + segments.pop("/");

  const { register, watch } = useForm();
  const searchTerm = watch("searchTerm");
  // Invoke onSearchChange whenever searchTerm changes
  useEffect(() => {
    onSearchChange(searchTerm);
  }, [searchTerm, onSearchChange]);

  return (
    <div className="2xl:h-[40px] xl:h-[35px] w-[100%] rounded-lg overflow-hidden shadow-sd">
      {/* search */}
      <div className="w-[60%] h-[100%] float-left overflow-hidden text-inUseGray ">
        <Input
          type="text"
          {...register("searchTerm")}
          placeholder="Search ..."
          startContent={
            <i className="fa-solid  fa-magnifying-glass mr-[10px] text-[#999999] pl-[20px] "></i>
          }
          variant="light"
          className="w-[100%] h-[100%] border-none rounded-none hover:bg-white outline-none flex items-center justify-center text-inUseGray pb-[10px]"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "w-[245px]",
              "bg-transparent",
              "text-black",
              "placeholder:text-black",
              "placeholder:text-[#757575]/50",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "w-[245px]",
              "text-black",
              "bg-white",
              "hover:bg-white",
              "rounded-none",
              "border-0",
              "xl:h-[35px]",
            ],
          }}
        />
      </div>
      {/* filter */}
      <div className="w-[40%] h-[100%] float-left border-l-2 text-inUseGray relative">
        <Dropdown className="min-w-[170px] absolute right-[-80px]">
          <DropdownTrigger>
            <Button
              variant="light"
              className="w-[100%] h-[100%] rounded-none text-[#757575]/50"
            >
              Filter
              <i className="fa-solid fa-sliders ml-[10px] text-[#999999]"></i>
            </Button>
          </DropdownTrigger>
          {pathName == "/material" ? (
            <DropdownMenu
              aria-label="Static Actions"
              className="data-[hover=true]:bg-blue-200"
            >
              <DropdownItem key="new" className="data-[hover=true]:bg-blue-200">
                Java programming
              </DropdownItem>
              <DropdownItem key="new" className="data-[hover=true]:bg-blue-200">
                HTML language
              </DropdownItem>
              <DropdownItem key="new" className="data-[hover=true]:bg-blue-200">
                Spring Boot
              </DropdownItem>
            </DropdownMenu>
          ) : pathName == "/classwork" ? (
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="All"
                onClick={() => onFilterChange("All")}
                className="relative data-[hover=true]:bg-blue-200"
              >
                <Image src={allIcon} alt="" />{" "}
                <p className="absolute left-[40px] top-[50%] translate-y-[-50%]">
                  All Task
                </p>
              </DropdownItem>
              <DropdownItem
                key="Assigment"
                onClick={() => onFilterChange("Assignment")}
                className="relative data-[hover=true]:bg-blue-200"
              >
                <Image src={assignmentIcon} alt="" />{" "}
                <p className="absolute left-[40px] top-[50%] translate-y-[-50%]">
                  Assigment
                </p>
              </DropdownItem>
              <DropdownItem
                key="Examination"
                onClick={() => onFilterChange("Examination")}
                className="relative data-[hover=true]:bg-blue-200"
              >
                <Image src={examinationIcon} alt="" />{" "}
                <p className="absolute left-[40px] top-[50%] translate-y-[-50%]">
                  Examination
                </p>
              </DropdownItem>
            </DropdownMenu>
          ) : pathName == "/member" ? (
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                onClick={() => onFilterChange("All")}
                key="new"
                className="data-[hover=true]:bg-blue-200"
              >
                ALL
              </DropdownItem>
              <DropdownItem
                onClick={() => onFilterChange("Teacher")}
                key="new"
                className="data-[hover=true]:bg-blue-200"
              >
                Teacher
              </DropdownItem>
              <DropdownItem
                onClick={() => onFilterChange("Student")}
                key="new"
                className="data-[hover=true]:bg-blue-200"
              >
                Student
              </DropdownItem>
            </DropdownMenu>
          ) : (
            ""
          )}
        </Dropdown>
      </div>
    </div>
  );
};

export default SearchAndFilterComponent;
