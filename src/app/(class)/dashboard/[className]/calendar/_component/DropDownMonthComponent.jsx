import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function DropDownMonthComponent({ onMonthSelected }) {
  const months = [
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
  return (
    <Dropdown className="absolute left-[-50px]">
      <DropdownTrigger>
        <Button variant="bordered" color="primary" className="bg-primary text-white min-w-[91px] h-[36px]">
          Month{" "}
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.42259 0.244078C1.09715 -0.0813592 0.569515 -0.0813592 0.244078 0.244078C-0.0813592 0.569515 -0.0813592 1.09715 0.244078 1.42259L5.24408 6.42259C5.56951 6.74803 6.09715 6.74803 6.42259 6.42259L11.4226 1.42259C11.748 1.09715 11.748 0.569515 11.4226 0.244078C11.0972 -0.0813592 10.5695 -0.0813592 10.2441 0.244078L5.83333 4.65482L1.42259 0.244078Z"
              fill="white"
            />
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Months">
        {months.map((month, index) => (
          <DropdownItem key={index} onClick={() => onMonthSelected(index)} className="data-[hover=true]:bg-blue-200">
            {month}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

