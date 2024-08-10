import { disabledClassAction, getClassByIDAction } from "@/action/classAction";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RestoreClassComponent = ({ openRestoreClass, cardInfoId }) => {
  const disable = async () => {
    const dis = await disabledClassAction(cardInfoId, true);
    if (dis.statusCode == 200) {
      toast.success("Successfully toasted!");
    }
    openRestoreClass();
  };
  const [classData, setClassData] = useState([]);
  useEffect(() => {
    async function getClass() {
      const data = await getClassByIDAction(cardInfoId);
      setClassData(data?.payload);
    }
    getClass();
  }, []);
  return (
    <Modal isOpen={true} placement="top-center">
      <ModalContent className="w-[497px] h-[275px]">
        {(onClose) => (
          <>
            <ModalBody className="flex justify-center items-center">
              <div>
                <Toaster />
              </div>
              <div className="w-[100%] h-[100%] rounded-2xl bg-white mb-[100px] py-5">
                <div className="pb-5 text-[24px] font-semibold rounded-2xl">
                  <div className="text-primary">
                    Restore {classData?.className} Class{" "}
                  </div>
                </div>
                <div className="pb-4 text-[14px] font-medium text-inUseGray">
                  <p>
                    You and your students will be able to interact with this
                    class again.
                  </p>
                </div>
                <div className="pb-4 text-[14px] font-medium  text-inUseGray">
                  <p>The class will be shown in your dashboard. </p>
                </div>
                <div className="flex ml-[45%] px-7 mt-7">
                  <Button
                    className="px-5 py-2 border bg-white rounded-xl text-inUseGray mr-4"
                    onClick={openRestoreClass}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="px-5 py-2 border rounded-xl text-white bg-primary"
                    onClick={disable}
                  >
                    Restore
                  </Button>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RestoreClassComponent;
