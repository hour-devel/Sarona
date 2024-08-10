import { Input, Radio, RadioGroup } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FiXCircle } from "react-icons/fi";
import { SiTicktick } from "react-icons/si";
import CustomRadio from "./customeStyle/CustomRadio";

const RadioQuestionComponent = ({
  handleDynamicAnswer,
  formAns,
  form,
  answerValue,
}) => {
  console.log("form :", form);
  console.log("formAns :", formAns);
  const [selected, setSelected] = React.useState([]);
  const [correctAns, setCorrectAns] = useState(false);
  const [validateSelect, setValidateSelect] = useState([]);
  useEffect(() => {
    setValidateSelect(...validateSelect, form?.options);
  }, []);

  const isInvalid = !validateSelect.includes(selected);

  const [radioVaue, setRadioValue] = useState({
    answers: [""],
    score: 0,
    no: "",
  });

  useEffect(() => {
    setRadioValue({
      ...radioVaue,
      answers: [selected],
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
      handleDynamicAnswer(radioVaue);
    } else {
      //console.log("Fields not input:", missingFields.join(", "));
    }
    setMissingFields(missingFields);
  }, [radioVaue]);

  const [stuAns, setStuAns] = useState();
  const [score, setScore] = useState();
  const [radioAns, setRadioAns] = useState({
    answers: [""],
    score: "",
    no: "",
  });

  useEffect(() => {
    formAns?.map((Ans) => {
      if (form.no == Ans.no) {
        if (form?.defaultAnswer.toString() === Ans?.answers.toString()) {
          console.log("Answer1 :", Ans?.answers.toString());
          console.log("Answer2 :", form?.defaultAnswer.toString());
          setScore(form?.scores);
          setCorrectAns(true);
        } else {
          setCorrectAns(false);
          setScore(0);
        }
        setStuAns(Ans.answers.toString());
      }
    });
  }, []);

  useEffect(() => {
    setRadioAns({
      answers: [stuAns],
      score: score,
      no: form.no,
    });
  }, [stuAns]);

  useEffect(() => {
    handleDynamicAnswer(radioAns);
  }, [radioAns]);

  function compareAnswers(formAnswers, formQuestions) {
    const results = [];

    formAnswers.forEach((answer) => {
      const questionNo = parseInt(answer.no);
      const question = formQuestions.find((q) => q.no === questionNo);
      if (question) {
        const isCorrect = question.defaultAnswer.some((defAnswer) =>
          answer.answers.includes(defAnswer)
        );
        results.push({
          question: question.question,
          answerGiven: answer.answers[0],
          correctAnswer: question.defaultAnswer,
          isCorrect: isCorrect,
        });
      } else {
        results.push({
          question: `No matching question for answer no ${answer.no}`,
          answerGiven: answer.answers[0],
          correctAnswer: [],
          isCorrect: false,
        });
      }
    });
    return results;
  }

  return (
    <div className="w-[100%] h-auto mt-[25px] rounded-[10px] shadow-small border-1 p-[20px]">
      <div className="w-[100%] h-auto float-left flex justify-between text-black p-3">
        <div className="flex gap-x-4">
          {formAns?.length > 0 ? (
            <>
              {correctAns ? (
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
                  correctAns ? "text-green-600" : "text-red-600"
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
              type="text"
              isReadOnly
              defaultValue={score}
              variant="underlined"
              className="max-w-[50px] w-[50px] font-bold h-[30px] text-[30px]"
              classNames={{
                input: "text-[18px] text-center",
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
        {/* <span className="mr-[20px] flex items-center">__/{form?.scores}</span> */}
      </div>

      <div className="w-[100%] h-auto flex py-5 text-[16px] leading-10">
        {formAns?.length > 0 ? (
          <RadioGroup
            key={stuAns}
            isInvalid={correctAns}
            isReadOnly={true}
            defaultValue={stuAns}
            className="ml-[15px]"
          >
            {form?.options.map((option) => (
              <CustomRadio
                key={option}
                value={option}
                isSelected={stuAns === option}
                correctAns={correctAns}
                stuAns={stuAns}
                isCorrect={correctAns}
              >
                {option}
              </CustomRadio>
            ))}
          </RadioGroup>
        ) : (
          <RadioGroup
            isInvalid={false}
            onValueChange={setSelected}
            className="ml-[15px]"
          >
            {form?.options.map((option) => (
              <Radio value={option} size="md" className="mb-[2px]">
                {option}
              </Radio>
            ))}
          </RadioGroup>
        )}
      </div>
    </div>
  );
};

export default RadioQuestionComponent;
