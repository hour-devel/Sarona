import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';
import IconWarningDelete from "../../../../../../../public/icon class materail svg/Warning icon.svg";
import { deleteMaterialByIdAction } from '@/action/materialAction';
import toast from 'react-hot-toast';

const DeleteMaterialComponent = ({ onClose, materialId }) => {
    const [isShowComfirm,setShowComfirm] = useState()
    //console.log('material data gggggg:',materialId)
    async function handleDelete() {
        //console.log('material data gggggg:', materialId)
        try {
           const deleteMaterial =  await deleteMaterialByIdAction(materialId);
           console.log('delete material id : ',deleteMaterial);
           if(deleteMaterial?.statusCode===200){
            toast.success("Delete Succesfully")
           }
        onClose();
        } catch (error) {
            console.error('Failed to delete material:', error);
        }
    
    }

    return (  
        <Modal isOpen={true}>
            <ModalContent className="max-w-[25%] h-auto mt-3 flex flex-col justify-center items-center">
                <ModalHeader className="flex flex-col m-auto">
                    <Image src={IconWarningDelete} className="mt-[20px]" alt="icons delete" />
                </ModalHeader>
                <ModalBody className="mt-auto">
                    <p>Are you sure you want to delete this item?</p>
                </ModalBody>
                <ModalFooter className="mb-[20px]">
                    <Button variant="light" onClick={onClose} className="border-2 border-gray-200">
                        Cancel
                    </Button>
                    <Button 
                    onClick={handleDelete} 
                     className="bg-[red] border-2 border-[red] text-white">
                        Yes, I'm sure
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteMaterialComponent;
