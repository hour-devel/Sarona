import InputComponent from '@/app/(auth)/_component/InputComponent'
import Image from 'next/image';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import SelectClassToAsignComponent from './SelectClassToAsignComponent';
import { editSubjectAction } from '@/action/materialAction';
import IconAddInstructor from "../../../../../../../public/icon class materail svg/Add Lesson Title.svg";

const FormEditSubjectComponent = ({title, onClose, subjectId}) => {
    //console.log('subject id:',subjectId);
    const { register, handleSubmit } = useForm();
    
    const [classId, setClassId] = useState([]);
    const onSubmit = async (data) => {
        const subjectData = {
            subjectName: data.name,
            classId: [...classId],
        };

        const editSubject = await editSubjectAction(subjectId, subjectData);
        if (editSubject?.statusCode === 200) {
            toast.success("Subject updated successfully");
            onClose();
        } else {
            toast.error("Something went wrong");
        }
    }
    const handleClassID = (assignClassId) => {
        setClassId(assignClassId);
    };
    return (
        <div>
            <Modal isOpen={true} isDismissable={false}>
                <ModalContent>
                    <>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <Toaster />
                            </div>
                            <ModalHeader className="flex justify-center text-primary text-[24px]">
                                {/* {title} */}
                               Edit Subject
                            </ModalHeader>
                            <ModalBody>
                                <InputComponent
                                    name="name"
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
                                    
                                    valid={register}
                                />
                                <SelectClassToAsignComponent
                                    handleClassID={handleClassID}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" className='text-black border-2 border-gray-200'
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button color="primary" type="submit">
                                    Edit
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default FormEditSubjectComponent
