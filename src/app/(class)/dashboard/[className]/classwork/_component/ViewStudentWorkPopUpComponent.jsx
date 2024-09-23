import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Select,
  SelectItem,
  Pagination,
} from "@nextui-org/react";
import TableStudentWorkComponent from "./TableStudentWorkComponent";
import Image from "next/image";
import x from "../../../../../../../public/icon/x.svg";
import PaginationComponent from "@/components/PaginationComponent";
import ViewFeedBackTaskComponent from "./ViewFeedBackTaskComponent";
const ViewStudentWorkPopUpComponent = ({
  classworkId,
  subjectId,
  examTitle,
  classId,
  userExam,
  openStudentWorkPopup,
}) => {
  console.log("userExam :", userExam);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(userExam.length / itemsPerPage);

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

  const [openViewFeedback, setOpenViewFeedBack] = useState();

  const currentData = userExam.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <Modal
      backdrop="transparent"
      isOpen={true}
      className="absolute left-[-24px] top-[-65px] max-w-[100%] h-[100vh] shadow-sd"
      id="popUpAnnounce"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="w-[100%] p-0 m-0">
              <div className="w-[100%] h-[10%] float-left border-b-2">
                <div className="h-[100%] w-[160px] float-left flex justify-center items-center mt-0 ml-[100px] font-bold text-[20px] relative overflow-hidden">
                  <p className="absolute bottom-[15px] text-primary">
                    Student Work
                  </p>
                  <div className="w-[100%] h-[10px] bg-primary absolute left-0 bottom-[-5px] rounded-xl"></div>
                </div>
                <div className="w-[300px] h-[100%] float-right">
                  <div className="w-[100%] h-[100%] float-left flex items-center justify-end px-[10px]">
                    <Image src={x} onClick={openStudentWorkPopup} />
                  </div>
                </div>
              </div>
              {/* header table */}
              <div className="w-[100%] h-[12%] float-left px-[100px]">
                <div className="w-[300px] h-[100%] flex items-center float-left">
                  <i class="fa-solid fa-users mb-[25px]"></i>
                  <div className="w-[100%]">
                    <p className="ml-[30px] text-black font-bold">
                      All Students
                    </p>
                    <p className="ml-[30px] text-[12px] mt-[10px]">
                      {examTitle}
                    </p>
                  </div>
                </div>
              </div>
              {openViewFeedback && (
                <ViewFeedBackTaskComponent
                  model={() => setOpenViewFeedBack(false)}
                />
              )}
              {/* table student work */}
              <TableStudentWorkComponent
                classworkId={classworkId}
                userExam={currentData}
                subjectId={subjectId}
                classId={classId}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </ModalBody>
            <ModalFooter className="relative h-[60px]">
              <div className="absolute left-[50%] translate-x-[-50%] bottom-[20px]">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPreviousPage={handlePreviousPage}
                  onNextPage={handleNextPage}
                  onPageInput={handlePageInput}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewStudentWorkPopUpComponent;
