import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { disabledClassAction, getClassByIDAction } from "@/action/classAction";
import toast from "react-hot-toast";

const DisableClassComponent = ({ openDisableClass, classId }) => {
  // disable class
  const handleDisableClass = async () => {
    const disableClass = await disabledClassAction(classId, false);
    if (disableClass?.statusCode === 200) {
      toast.success(disableClass?.message);
      openDisableClass(false);
    } else {
      toast.error("Something went wrong");
    }
  };
  const [classData, setClassData] = useState([]);
  useEffect(() => {
    async function getClass() {
      const data = await getClassByIDAction(classId);
      setClassData(data?.payload);
    }
    getClass();
  }, []);

  return (
    <Modal
      isOpen={true}
      onClose={() => openDisableClass(false)}
      placement="top-center"
    >
      <ModalContent className="max-w-[550px] h-[325px] shadow-sd bg-white">
        {(open) => (
          <>
            <ModalBody>
              <div className="w-[100%] px-[15px] rounded-2xl h-auto mb-[100px] py-5">
                <div className="pb-5 text-2xl font-bold rounded-2xl">
                  <div className="text-primary">
                    Disable {classData?.className} Class
                  </div>
                </div>

                <div className="pb-4 text-inUseGray">
                  <p>Are you sure you want to disable this class?</p>
                </div>
                <div className="pb-4 text-inUseGray">
                  <p>
                    Classes that are disabled cannot be modified by teachers or
                    unless they are restored.
                  </p>
                </div>
                <div className="pb-4 text-inUseGray">
                  <p>This class will move to your sitting classes.</p>
                </div>
                <div className="flex justify-end mt-7">
                  <Button
                    className="px-5 py-2 border rounded-xl text-inUseGray mr-4"
                    onClick={() => openDisableClass(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="px-5 py-2 border rounded-xl text-white bg-primary"
                    onClick={handleDisableClass}
                  >
                    Disable
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

export default DisableClassComponent;
