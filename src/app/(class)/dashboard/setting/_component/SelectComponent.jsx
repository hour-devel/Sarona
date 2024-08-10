import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectComponent({
  handleDynamicAnswer,
  options,
  form,
  formAns,
  correctAns,
}) {
  const [touched, setTouched] = React.useState(false);
  const [value, setValue] = React.useState([]);

  let isValid = false;
  if (value.length === 0) {
    isValid = true;
  }

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };

  const [dropDownValue, setDropDownValue] = useState({
    answers: "",
    score: 0,
  });

  useEffect(() => {
    setDropDownValue({
      ...dropDownValue,
      answers: [value],
      no: form?.no,
    });
  }, [value]);

  // State to track missing fields
  const [missingFields, setMissingFields] = useState([]);

  // Check which fields are not input
  const getMissingFields = () => {
    const missingFields = [];
    if (value.length == 0) {
      missingFields.push("answer");
    }
    return missingFields;
  };

  // passing dynamic value into parent component
  useEffect(() => {
    const missingFields = getMissingFields();
    if (value.length != 0) {
      handleDynamicAnswer(dropDownValue);
    } else {
      //console.log("Fields not input:", missingFields.join(", "));
    }
    setMissingFields(missingFields);
  }, [dropDownValue]);

  // student ans
  const [stuAns, setStuAns] = useState([]);

  useEffect(() => {
    formAns?.map((Ans) => {
      console.log("stuAns :", Ans.answers[0]);
      if (form.no == Ans.no) {
        console.log("stuAns :", Ans.answers[0]);
        setStuAns(Ans.answers[0]);
      }
    });
  }, []);
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      {formAns?.length > 0 ? (
        <Select
          key={stuAns}
          defaultSelectedKeys={[stuAns]}
          isDisabled={true}
          classNames={{
            trigger: correctAns
              ? "bg-green-300 text-white"
              : "bg-red-300 text-white",
            inputWrapper: correctAns
              ? "bg-green-300 text-white"
              : "bg-red-300 text-white",
            selectedItem: correctAns
              ? "bg-green-300 text-white"
              : "bg-red-300 text-white",
            placeholder: "text-white", // Ensure placeholder text is white as well
            item: "text-red-500",
          }}
          F
          scrollShadowProps={{
            isEnabled: false,
          }}
        >
          {options?.map((answer) => (
            <SelectItem className="" key={answer} value={answer}>
              {answer}
            </SelectItem>
          ))}
        </Select>
      ) : (
        <Select
          placeholder="Select an answer"
          className="bg-gray-50"
          // errorMessage={!isValid || !touched ? "" : "This field is required"}
          // isInvalid={!isValid || !touched ? false : true}
          scrollShadowProps={{
            isEnabled: false,
          }}
          onClose={() => setTouched(true)}
          onChange={handleSelectionChange}
        >
          {options?.map((answer) => (
            <SelectItem key={answer}>{answer}</SelectItem>
          ))}
        </Select>
      )}
    </div>
  );
}
