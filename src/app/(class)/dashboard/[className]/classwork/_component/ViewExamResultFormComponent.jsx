import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Radio,
  RadioGroup,
  ScrollShadow,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import x from "../../../../../../../public/icon/x.svg";
import pds from "../../../../../../../public/pds.svg";

import Image from "next/image";
import SelectComponent from "../../../setting/_component/SelectComponent";

const ViewExamResultFormComponent = ({ model }) => {
  return (
    <Modal
      backdrop="transparent"
      isOpen={true}
      onClose={model}
      className="absolute left-[-24px] top-[-65px] max-w-[100%] h-[100vh] shadow-sd"
      id="popUpAnnounce"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="w-[100%] p-0 m-0 relative">
              <Image
              alt=""
                src={x}
                onClick={model}
                className="absolute right-[10px] top-[10px]"
              />
              <div className="w-[80%] h-[95%] absolute left-[50%] translate-x-[-50%] bottom-0">
                <ScrollShadow
                  hideScrollBar
                  className="w-[100%] h-[100%] overflow-y-scroll float-left px-[100px] pb-[20px]"
                >
                  {/* header form */}
                  <div className="w-[100%] h-[120px] rounded-[10px] bg-white shadow-sd">
                    <div className="w-[100%] h-[16%] bg-primary rounded-xl relative float-left">
                      <div className="absolute left-0 bottom-0 bg-white h-[50%] w-[100%]"></div>
                    </div>
                    <div className="w-[100%] h-[84%] float-left px-[20px]">
                      <h5 className="font-bold text-black">Test Quiz # 01</h5>
                      <p className="text-[10px] mt-[8px]">
                        choose the correct option
                      </p>
                      <p className="text-[12px] mt-[8px] text-black">
                        Your email address (radalin@gmail.com)will be recorded
                        when you submit this form. <br /> Not you?{" "}
                        <Link href="" className="text-primary">
                          {" "}
                          Switch accounts{" "}
                        </Link> 
                      </p>
                    </div>
                  </div>
                  {/* radio choosing */}
                  <div className="w-[100%] h-auto mt-[25px] rounded-[10px] bg-white shadow-small border-1 p-[20px]">
                    <div className="w-[100%] h-auto float-left flex justify-between text-black p-3">
                      <p>How are you feeling today ?</p>
                      <span className="mr-[20px]">__/2</span>
                    </div>
                    <div className="w-[100%] h-auto flex py-5 text-[16px] leading-10">
                      <RadioGroup>
                        <Radio value="buenos-aires">Buenos Aires</Radio>
                        <Radio value="sydney">Sydney</Radio>
                        <Radio value="san-francisco">San Francisco</Radio>
                        <Radio value="london">London</Radio>
                        <Radio value="tokyo">Tokyo</Radio>
                      </RadioGroup>
                    </div>
                  </div>
                  {/* multiple choice */}
                  <div className="w-[100%] h-auto mt-[25px] rounded-[10px] bg-white shadow-small border-1 p-[20px]">
                    <div className="w-[100%] h-auto float-left flex justify-between text-black p-3">
                      <p>How are you feeling today ?</p>
                      <span className="mr-[20px]">__/2</span>
                    </div>
                    <div className="w-[100%] h-auto py-5 block leading-10 text-[16px]">
                      <Checkbox className="mb-[3px]" value="buenos-aires">
                        Buenos Aires
                      </Checkbox>{" "}
                      <br />
                      <Checkbox className="mb-[3px]" value="sydney">
                        Sydney
                      </Checkbox>{" "}
                      <br />
                      <Checkbox className="mb-[3px]" value="san-francisco">
                        San Francisco
                      </Checkbox>{" "}
                      <br />
                      <Checkbox className="mb-[3px]" value="london">
                        London
                      </Checkbox>{" "}
                      <br />
                      <Checkbox className="mb-[3px]" value="tokyo">
                        Tokyo
                      </Checkbox>{" "}
                      <br />
                    </div>
                  </div>
                  {/* WH question */}
                  <div className="w-[100%] h-[120px] mt-[25px] rounded-[10px] bg-white shadow-small border-1 p-[20px]">
                    <div className="w-[100%] h-[15%] float-left flex justify-between text-black">
                      <p>How is NEXT JS ?</p>
                      <span className="mr-[20px]">__/2</span>
                    </div>
                    <div className="w-[100%] h-[80%] float-left mt-[10px] block">
                      <Input
                        readOnly
                        type="email"
                        placeholder="Enter your email"
                        defaultValue="React Frameowork "
                        className="max-w-[100%] rounded-none h-[50px] mt-[10px]"
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
                            "h-[50px]",
                            "bg-[#eee]",
                            "rounded-none",
                            "hover:border-0",
                          ],
                        }}
                      />
                    </div>
                  </div>
                  {/* file upload */}
                  <div className="w-[100%] h-[170px] mt-[25px] rounded-[10px] bg-white shadow-small border-1 p-[20px]">
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
                        <p className="absolute ml-[40px] text-black">
                          Please choose file
                        </p>
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
                  {/* Feed back */}
                  <div className="w-[100%] h-[120px] mt-[25px] rounded-[10px] bg-white shadow-small border-1 p-[20px]">
                    <div className="w-[100%] h-[15%] float-left flex justify-between text-black">
                      <p className="text-primary">Feed back</p>
                      <span className="mr-[20px]">__/2</span>
                    </div>
                    <div className="w-[100%] h-[80%] float-left mt-[10px] block">
                      <Input
                        type="text"
                        startContent={<i className="fa-regular fa-message"></i>}
                        placeholder="add feedback for answer"
                        className="max-w-[30%] rounded-none h-[50px] mt-[10px]"
                        classNames={{
                          label: "text-black/50 dark:text-white/90",
                          input: [
                            "bg-transparent",
                            "text-black",
                            "placeholder:text-inUseGray",
                          ],
                          innerWrapper: "bg-transparent",
                          inputWrapper: [
                            "hover:shadow-sd",
                            "h-[50px]",
                            "border-2",
                            "bg-[#fff]",
                            "rounded-lg",
                            "hover:border-0",
                          ],
                        }}
                      />
                    </div>
                  </div>
                  {/* action */}
                  <div className="w-[100%] h-auto py-[20px] mt-[20px] text-end">
                    <Button
                      variant="light"
                      size="lg"
                      className="mr-[20px] w-[120px] text-inUseGray border-2 hover:bg-inUseGray"
                      onClick={model}
                    >
                      Draft
                    </Button>
                    <Button
                      color="primary"
                      size="lg"
                      variant="light"
                      className="w-[120px] text-white bg-primary hover:bg-blue-600"
                    >
                      Send
                    </Button>
                  </div>
                </ScrollShadow>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewExamResultFormComponent;
