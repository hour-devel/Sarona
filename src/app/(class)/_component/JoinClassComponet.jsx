import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  Input,
  ModalFooter,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { joinClassByCodeAction } from "@/action/classAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { classSchema, joinClassSchema } from "@/lib/schema/classSchema";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const JoinClassComponet = ({ model }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(joinClassSchema),
  });
  const [loading, setLoading] = useState(false);
  const joinClassHandler = async (code) => {
    setLoading(true);
    //console.log("joinClassCode", code);
    const joinClassCode = await joinClassByCodeAction(code);
    //console.log("joinClassCode", joinClassCode);
    if (joinClassCode?.statusCode == 201) {
      toast.success("Class has join successfully");
      setLoading(true);
      model();
    } else {
      toast.error("Invalid class code");
    }
  };

  return (
    <div>
      <Modal
        isOpen={true}
        onClose={model}
        isDismissable={false}
        placement="top-center"
      >
        <ModalContent>
          {(open) => (
            <>
              <form onSubmit={handleSubmit(joinClassHandler)}>
                <ModalHeader className="flex flex-col gap-1">
                  <div>
                    <div>
                      <Toaster position="top-center" reverseOrder={false} />
                    </div>
                  </div>
                  <h2 className="text-[24px] text-primary">Join Classes</h2>
                  <p className="text-[16px] font-light mt-[10px]">
                    Plase Enter your class code to access the class
                  </p>
                </ModalHeader>
                <ModalBody>
                  <Input
                    {...register("classCode")}
                    name="classCode"
                    type="text"
                    label={
                      <div className="text-[#757575] opacity-60 font-[24px] ">
                        <i className="fa-solid fa-barcode"></i> &nbsp; Class
                        Code
                      </div>
                    }
                    classNames={{
                      label: "text-black/50 dark:text-white/90",
                      input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                      ],
                      innerWrapper: "bg-transparent",
                      inputWrapper: [
                        "hover:shadow-sd",
                        "bg-default-200/50",
                        "dark:bg-white",
                        "border-2",
                        "hover:border-0",
                        "hover:bg-black",
                        "dark:hover:bg-white",
                      ],
                    }}
                  />
                  {errors && (
                    <span className=" text-red-500">
                      {errors.classCode?.message}
                    </span>
                  )}
                  <p className="text-[14px] font-light">
                    <i className="fa-regular fa-circle-question"></i> You can
                    ask your teacher to get class code.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="flat"
                    onPress={model}
                    className="bg-white border-2 border-[#333] text-[#333]"
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit" isLoading={loading}>
                    Join
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default JoinClassComponet;
