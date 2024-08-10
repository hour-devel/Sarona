import React, { useState } from "react";
import TableStudentWorkComponent from "@/app/(class)/dashboard/[className]/classwork/_component/TableStudentWorkComponent";
import Image from "next/image";
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import IconClose from "../../public/icon class materail svg/close icon.svg";
import TableStudentMarkComponent from "./TableStudentMarkComponent";
import PaginationComponent from "./PaginationComponent";
import ButtonSelectFilterSubjectComponent from "./ButtonSelectFilterSubjectComponent";

export default function StudentMarkComponent({ mark,onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const studentData = [
    {
      id: "1",
      name: "vichhai",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "80",
      socres2: "70",
      socres3: "-",
      socres4: "90",
      socres5: "100",
    },
    {
      id: "2",
      name: "Bunleng",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "80",
      socres2: "-",
      socres3: "-",
      socres4: "90",
      socres5: "100",
    },
    {
      id: "3",
      name: "Ly Houy",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "100",
      socres2: "70",
      socres3: "-",
      socres4: "90",
      socres5: "100",
    },
    {
      id: "4",
      name: "Ly Hour",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "90",
      socres2: "70",
      socres3: "-",
      socres4: "90",
      socres5: "10",
    },
    {
      id: "5",
      name: "Dary Ta",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "10",
      socres2: "70",
      socres3: "25",
      socres4: "90",
      socres5: "100",
    },

    {
      id: "6",
      name: "Sok meng",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "80",
      socres2: "70",
      socres3: "68",
      socres4: "90",
      socres5: "100",
    },
    {
      id: "7",
      name: "Kinin",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "80",
      socres2: "70",
      socres3: "-",
      socres4: "90",
      socres5: "100",
    },
    {
      id: "8",
      name: "Kosal",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "-",
      socres2: "70",
      socres3: "-",
      socres4: "90",
      socres5: "100",
    },
    {
      id: "9",
      name: "Soy Tola",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "80",
      socres2: "70",
      socres3: "50",
      socres4: "90",
      socres5: "100",
    },
    {
      id: "10",
      name: "Bro Seth",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "80",
      socres2: "70",
      socres3: "80",
      socres4: "90",
      socres5: "100",
    },
    {
      id: "11",
      name: "Sopheak",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "80",
      socres2: "70",
      socres3: "70",
      socres4: "90",
      socres5: "100",
    },
    {
      id: "12",
      name: "Sovathana",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "80",
      socres2: "70",
      socres3: "90",
      socres4: "90",
      socres5: "100",
    },
    {
      id: "13",
      name: "Sis vathana",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      socres1: "80",
      socres2: "70",
      socres3: "-",
      socres4: "90",
      socres5: "100",
    },
  ];

  const totalPages = Math.ceil(mark?.payload?.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handlePageInput = (page) => {
    setCurrentPage(page);
  };

  const currentData = mark?.payload?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Modal
        isDismissable={false}
        backdrop="transparent"
        isOpen={true}
        onClose={onClose}
        className="absolute left-[-24px] top-[-65px] max-w-[100%] h-[100vh] shadow-sd"
        id="popUpAnnounce"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="w-[100%] h-auto p-0 m-0">
                <div className="w-[100%] h-[10%] float-left border-b-2">
                  <div className="w-[160px] h-[100%] float-left flex justify-center items-center mt-0 ml-[100px] font-bold text-[20px] relative overflow-hidden">
                    <p className="absolute bottom-[15px] text-primary">
                      Student Mark
                    </p>
                    <div className="w-[100%] h-[10px] bg-primary absolute left-0 bottom-[-5px] rounded-xl"></div>
                  </div>
                  <div className="w-[15.6%] h-[100%] float-right bg-black relative top-0">
                    <div className="w-[100%] bg-white h-[100%] float-left flex items-center justify-end px-[30px]">
                      <div className="relative w-[120px] ml-[20px] mr-[40%]">
                        <ButtonSelectFilterSubjectComponent mark={mark}/>
                      </div>
                      <button
                        color="primary"
                        className="p-[5px] rounded-full hover:bg-gray-200 absolute top-[17px]"
                        onClick={onClose}
                      >
                        <Image
                          src={IconClose}
                          alt="icon close not found"
                          className="w-[30px] h-[30px]"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {/* table student work */}
                <div className="mt-[10px]">
                  <TableStudentMarkComponent
                    markData={currentData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPreviousPage={handlePreviousPage}
                  onNextPage={handleNextPage}
                  onPageInput={handlePageInput}
                  setCurrentPage={setCurrentPage}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
