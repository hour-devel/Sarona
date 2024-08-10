"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import FormCreateMaterialComponent from "./FormCreateMaterialComponent";
import FormCreateSubjectComoponent from "./FormCreateSubjectComoponent";

const ButtonCreateSubjectComponent = ({ params }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <Button className="bg-primary text-white" onClick={() => setOpen(true)}>
        + Create Subject
      </Button>
      {isOpen && <FormCreateSubjectComoponent onClose={()=> setOpen(false)}/>}
    </div>
  );
};

export default ButtonCreateSubjectComponent;
