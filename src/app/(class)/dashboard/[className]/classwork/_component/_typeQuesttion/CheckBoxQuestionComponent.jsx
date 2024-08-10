import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { CustomCheckbox } from "./customeStyle/CustomCheckbox";
import { SiTicktick } from "react-icons/si";
import { FiXCircle } from "react-icons/fi";

const CheckBoxQuestionComponent = ({ handleDynamicAnswer, formAns, form }) => {
  const [selected, setSelected] = React.useState("");
  const [validateSelect, setValidateSelect] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  useEffect(() => {
    setValidateSelect(...validateSelect, form?.options);
  }, []);

  const isInvalid = !validateSelect.includes(...selected);

  const [checkBoxValue, setCheckBoxValue] = useState({
    answers: "",
    score: 0,
  });

  useEffect(() => {
    setCheckBoxValue({
      ...checkBoxValue,
      answers: [...selected],
      no: form?.no,
    });
  }, [selected]);

  // State to track missing fields
  const [missingFields, setMissingFields] = useState([]);

  // Check which fields are not input
  const getMissingFields = () => {
    const missingFields = [];
    if (isInvalid) {
      missingFields.push("answer");
    }
    return missingFields;
  };

  // passing dynamic value into parent component
  useEffect(() => {
    const missingFields = getMissingFields();
    if (!missingFields.length > 0) {
      handleDynamicAnswer(checkBoxValue);
    } else {
      //console.log("Fields not input:", missingFields.join(", "));
    }
    setMissingFields(missingFields);
  }, [checkBoxValue]);

  const [stuAns, setStuAns] = useState([]);
  const [score, setScore] = useState();
  const [checkboxAns, setCheckBoxAns] = useState({
    answers: [""],
    score: 0,
    no: "",
  });

  useEffect(() => {
    formAns?.map((Ans) => {
      if (form.no == Ans.no) {
        if (form?.defaultAnswer.toString() === Ans?.answers.toString()) {
          setScore(form?.scores);
          setCorrectAnswer(true);
        } else {
          setScore(0);
          setCorrectAnswer(false);
        }
        setStuAns([...Ans.answers]);
      }
    });
  }, []);

  useEffect(() => {
    setCheckBoxAns({
      answers: stuAns,
      score: score,
      no: form.no,
    });
  }, [stuAns]);

  useEffect(() => {
    //console.log('checkbox ans',checkboxAns);
    handleDynamicAnswer(checkboxAns);
  }, [checkboxAns]);

  return (
    <div className="w-[100%] h-auto mt-[25px] rounded-[10px] shadow-small border-1 bg-white p-[20px]">
      <div className="w-[100%] h-auto float-left flex justify-between text-black p-3">
        {/* question */}
        <div className="flex gap-x-4">
          {formAns?.length > 0 ? (
            <>
              {correctAnswer ? (
                <div className="mt-1 ">
                  <SiTicktick className="text-green-600" />
                </div>
              ) : (
                <div className="mt-1 ">
                  <FiXCircle className="text-red-600" />
                </div>
              )}
              <p
                className={`text-[16px] ${
                  correctAnswer ? "text-green-600" : "text-red-600"
                }`}
              >
                {form?.question}
              </p>
            </>
          ) : (
            <p className="text-[16px]">{form?.question}</p>
          )}
        </div>
        {formAns?.length > 0 ? (
          <span className="mr-[20px] flex items-center">
            <Input
              key={score}
              isReadOnly
              type="text"
              variant="underlined"
              defaultValue={score}
              className="max-w-[50px] w-[50px] font-bold h-[30px] text-[30px]"
              classNames={{
                input: "text-[16px] text-center",
                innerWrapper: "bg-transparent font-bold text-[30px]",
                inputWrapper: [
                  "text-[30px]",
                  "font-bold",
                  "bg-white",
                  "dark:bg-white",
                  "hover:bg-white",
                  "dark:hover:bg-white",
                ],
              }}
            />
            /{form?.scores}
          </span>
        ) : (
          <span className="mr-[20px] flex items-center">__/{form?.scores}</span>
        )}
      </div>
      <div className="w-[100%] h-auto flex gap-0 leading-10 text-[16px]">
        {formAns?.length > 0 ? (
          <CheckboxGroup
            key={stuAns}
            isRequired
            isInvalid={false}
            isReadOnly={true}
            className="gap-0"
            defaultValue={stuAns}
          >
            {form?.options.map((option) => (
              <CustomCheckbox
                key={option}
                value={option}
                isSelected={stuAns.includes(option)}
                isCorrect={correctAnswer}
              >
                {option}
              </CustomCheckbox>
            ))}
          </CheckboxGroup>
        ) : (
          <CheckboxGroup
            isRequired
            isInvalid={false}
            onValueChange={setSelected}
            className="gap-0"
          >
            {form?.options.map((option) => (
              <>
                <Checkbox
                  key={option}
                  value={option}
                  radius="none"
                  className="ml-[7px]"
                >
                  {option}
                </Checkbox>
              </>
            ))}
          </CheckboxGroup>
        )}
      </div>
    </div>
  );
};

export default CheckBoxQuestionComponent;
