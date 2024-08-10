import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import styles from "../style.module.css";
import { CloudCog } from "lucide-react";
import { frameData } from "framer-motion";
import { formatDate } from "@fullcalendar/core";
import { signOut } from "next-auth/react";
import { Await } from "react-router-dom";
import { createEventAction } from "@/action/eventAction";
import toast from "react-hot-toast";

const CreateEventFormComponent = ({
  header,
  openCreateEventForm,
  classId,
  eventId,
}) => {
  const [Draft, setSelected] = React.useState("draft");
  const [color, setColor] = React.useState("");
  const [eventTitle, setTitle] = useState("");
  const [eventDescription, setDescription] = useState("");
  const [startedAt, setStartDate] = useState(null);
  const [endedAt, setEndDate] = useState(null);
  const radioOptions = [
    {
      id: 1,
      value: "blue",
      color: "#ADD8E6",
      style: { "--radio-color": "#ADD8E6" },
    },
    {
      id: 2,
      value: "gold",
      color: "#FFD700",
      style: { "--radio-color": "#FFD700" },
    },
    {
      id: 3,
      value: "pink",
      color: "#FFC0CB",
      style: { "--radio-color": "#FFC0CB" },
    },
    {
      id: 4,
      value: "grey",
      color: "#D3D3D3",
      style: { "--radio-color": "#D3D3D3" },
    },
  ];

  function handleClose() {
    openCreateEventForm();
  }

  async function handleSubmit() {
    const isDraft = Draft === "draft" ? true : false;

    let startDate = new Date(startedAt);
    let endDate = new Date(endedAt);

    if (isDraft == true) {
      startDate.setFullYear(startDate.getFullYear() + 200);
      endDate.setFullYear(endDate.getFullYear() + 200);
    }
    const formData = {
      eventTitle,
      eventDescription,
      isDraft,
      color,
      startedAt: new Date(startDate).toISOString(),
      endedAt: new Date(endDate).toISOString(),
      classId,
    };

    const eventData = await createEventAction(formData);
    if (eventData?.statusCode == 201) {
      toast.success(eventData?.message);
    } else {
      toast.error("Something when wrong");
    }
    openCreateEventForm();

  }

  return (
    <>
      <Modal
        isDismissable={false}
        isOpen={true}
        onClose={openCreateEventForm}
        placement="top-center"
        backdrop="opaque"
      >
        <ModalContent className="min-w-[535px]">
          <ModalHeader className="flex flex-col">{header} Event</ModalHeader>
          <ModalBody className="relative">
            <Input
              name="title"
              value={eventTitle}
              type="text"
              variant="underlined"
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              name="description"
              value={eventDescription}
              labelPlacement="outside"
              placeholder="Description..."
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-12 h-[140px] "
              style={{
                height: "100%",
              }}
              classNames={{
                input: [
                  "text-[#757575]",
                  "h-[140px]",
                  "placeholder:text-[#c4c4c4]",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "position:relative",
                  "hover:shadow-sd",
                  "bg-default-200/50",
                  "dark:bg-white",
                  "border-2",
                  "transition-[.5s]",
                  // "hover:border-0",
                  "dark:hover:bg-white",
                  "min-h-[140px]",
                  "h-[100%]",
                ],
              }}
            />
            <div
              className="flex flex-wrap gap-4 mt-[10px]"
              style={{
                transition: "box-shadow 0.3s ease, background-color 0.3s ease",
              }}
            >
              <Tabs
                color="default"
                aria-label="Tabs colors"
                radius="full"
                selectedKey={Draft}
                onSelectionChange={setSelected}
              >
                <Tab key="event" title="Event" />
                <Tab key="draft" title="Draft" />
              </Tabs>
            </div>
            <div className="w-[100%] h-[30px] float-left mt-[10px]">
              <div className="w-[12%] h-[100%] float-left flex justify-start items-center">
                Color
              </div>
              {/* Radio button for choose the color */}
              <div className="w-[83%] h-[100%] float-left flex items-center ml-[3%]">
                <RadioGroup
                  orientation="horizontal"
                  value={color}
                  onChange={setColor}
                  className="flex gap-2"
                >
                  {radioOptions.map((option) => (
                    <label key={option.id} className="relative">
                      <input
                        type="radio"
                        className={styles.radioButton}
                        style={option.style}
                        value={option.value}
                        checked={color === option.value}
                        onChange={() => setColor(option.value)}
                      />
                    </label>
                  ))}
                </RadioGroup>
              </div>
            </div>
            {Draft === "draft" ? (
              ""
            ) : (
              <div
                className="w-[100%] h-[70px] float-left mt-[10px] relative text-inUseGray"
                style={{
                  transition:
                    "box-shadow 0.3s ease, background-color 0.3s ease",
                }}
              >
                <DatePicker
                  label="Start date"
                  variant="bordered"
                  className="max-w-[48%] w-[48%] absolute left-0 text-red-500"
                  labelPlacement="outside"
                  selected={startedAt}
                  onChange={(date) => setStartDate(date)}
                  classNames={{
                    label: "text-red-500",
                  }}
                />
                <DatePicker
                  label="End date"
                  variant="bordered"
                  className="max-w-[48%] w-[48%] absolute right-0"
                  labelPlacement="outside"
                  selected={endedAt}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              onClick={handleClose}
              className="bg-white border-2 hover:bg-[#eee]"
            >
              Close
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateEventFormComponent;
