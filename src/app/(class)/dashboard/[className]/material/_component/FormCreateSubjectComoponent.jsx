import InputComponent from "@/app/(auth)/_component/InputComponent";
import Image from "next/image";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SelectClassToAsignComponent from "./SelectClassToAsignComponent";
import { useForm } from "react-hook-form";
import {
  createSubjectAction,
  getSubjectBySubjectIdAction,
} from "@/action/classAction";
import IconAddInstructor from "../../../../../../../public/icon class materail svg/Add Lesson Title.svg";

const FormCreateSubjectComponent = ({ title, onClose, subId }) => {
  const { register, handleSubmit } = useForm();
  const [classId, setClassId] = useState([]);
  const [subjectData, setSubjectData] = useState();

  const handleClassID = (assignClassId) => {
    setClassId(assignClassId);
  };

  //console.log("handleClassID From Subject", classId);

  const onSubmit = async (data) => {
    const subjectData = {
      subjectName: data.name,
      classId: [...classId],
    };
    const newSubject = await createSubjectAction(subjectData);
    //console.log("newSubject :", newSubject);
    if (newSubject?.statusCode === 201) {
      toast.success(newSubject?.message);
      onClose();
    } else {
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    const handleSubjectData = async () => {
      const subData = await getSubjectBySubjectIdAction(subId);
      setSubjectData(subData);
    };
    handleSubjectData();
  }, [subId]);
  console.log("subjectData :", subjectData);

  // const getSubject = async () => {
  //   // setIsLoading(true);
  //   const subData = await getSubjectBySubjectIdAction(subId);
  //   setSubjectData(subData);
  //   // setIsLoading(false);
  // };

  // useEffect(() => {
  //   getSubject();
  // }, []);

  return (
    <div>
      <Modal isOpen={true} isDismissable={false}>
        <ModalContent>
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Toaster />
              </div>
              <ModalHeader className="flex text-[24px] text-primary justify-center">
                {title || "Subject"}
              </ModalHeader>
              <ModalBody>
                <InputComponent
                  name="name"
                  valid={register}
                  label={
                    <div className="text-[#757575]  font-[24px] flex ml-[-10px]">
                      <Image
                        src={IconAddInstructor}
                        alt="not found"
                        className="w-[20px] h-[20px]"
                      />{" "}
                      &nbsp;
                      <p className=" text-[14px]">Subject name</p>
                    </div>
                  }
                />
                <SelectClassToAsignComponent handleClassID={handleClassID} />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  className="border-2 border-gray-200"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              
                <Button color="primary" type="submit">
                  Create
                </Button>
              </ModalFooter>
            </form>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FormCreateSubjectComponent;
