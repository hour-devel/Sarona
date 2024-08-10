import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { number } from "zod";

const WhQuestionComponent = ({
  handleDynamicAnswer,
  form,
  formAns,
  valid,
  scoreAns,
  Ans,
}) => {
  const [missingFields, setMissingFields] = useState([]);
  const [biggerScore, setBiggerScore] = useState(false);
  const [correctValue, setCorrectValue] = useState("");
  const [score, setScore] = useState("");
  const [whAns, setWhAns] = useState();

  // const [whQuestionValue, setWhQuestionValue] = useState({
  //   score: 0.0,
  //   no: form?.no,
  //   answers: [],
  // });
  const [whQuestionValue, setWhQuestionValue] = useState([]);

  // const handleInputOption = (key, value) => {
  //   setWhAns((prev) => ({
  //     ...prev,
  //     value,
  //   }));
  // };

  const handleInputOption = (name, value, index) => {
    // const valueIndex = value ? value : stuAns;
    setWhAns({ no: form?.no, answers: [value], score: 0 });
  };

  function handleWhScore(name, value) {
    if (Number(value) > Number(form?.scores)) {
      setBiggerScore(true);
    } else {
      setScore(Number(value));
      setBiggerScore(false);
    }
  }
  function handleCorrectAnswer(name, value) {
    setCorrectValue(value);
  }

  // Check which fields are not input
  const getMissingFields = () => {
    const missingFields = [];
    if (!score) {
      missingFields.push("scores");
    }
    return missingFields;
  };

  // student ans
  const [stuAns, setStuAns] = useState([]);
  useEffect(() => {
    formAns?.map((Ans) => {
      if (form.no == Ans.no) {
        setStuAns([Ans.answers]);
      }
    });
  }, []);

  console.log("setStuAns :", stuAns);

  useEffect(() => {
    setWhQuestionValue({
      no: form?.no,
      score: score,
      answers: [correctValue],
    });
  }, [correctValue, score]);

  // passing dynamic value into parent component
  useEffect(() => {
    const missingFields = getMissingFields();
    if (missingFields.length === 0) {
      // Correctly checks if there are no missing fields
      // handleDynamicAnswer(whQuestionValue);
    } else {
      //console.log("Fields not input:", missingFields.join(", "));
    }
    setMissingFields(missingFields);
  }, [whQuestionValue]);

  console.log("whQuestionValue2 :", whQuestionValue);

  // passing answer while exam
  useEffect(() => {
    handleDynamicAnswer(whAns);
  }, [whAns]);

  return (
    <div className="w-[100%] h-auto mt-[25px] rounded-[10px] shadow-small border-1 p-[20px]">
      <div className="w-[100%] h-auto float-left flex justify-between text-black text-[16px] p-3">
        <p>{form?.question}</p>
        {formAns?.length > 0 ? (
          <div>
            <span className="mr-[20px] flex items-center">
              <Input
                onBlur={(e) => handleWhScore("score", e.target.value)}
                type="text"
                // isReadOnly
                defaultValue={scoreAns?.map((ans) => {
                  if (ans) {
                    return ans;
                  }
                })}
                variant="underlined"
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
            {missingFields.includes("scores") && !biggerScore && (
              <p className="text-red-500 mt-5 w-full text-xs">Required</p>
            )}
            {biggerScore && (
              <p className="text-red-500 mt-5 w-full text-xs">
                Can't be bigger
              </p>
            )}
          </div>
        ) : (
          <span className="mr-[20px] flex items-center">__/{form?.scores}</span>
        )}
      </div>
      <div className="w-[100%] h-auto flex py-5 relative">
        {/* <Input
          onBlur={(e) => handleCorrectAnswer("answer", e.target.value)}
          type="text"
          // isReadOnly
          placeholder={stuAns}
          className="max-w-[100%] rounded-none h-auto mt-[10px] float-left"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "font-bold",
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
        /> */}
        {formAns?.length > 0 ? (
          <Input
            onBlur={(e) => handleCorrectAnswer("answer", e.target.value)}
            type="text"
            placeholder={stuAns}
            className="max-w-[100%] rounded-none h-auto mt-[10px] float-left"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "font-bold",
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
        ) : (
          <Input
            onBlur={(e) => handleInputOption("answer", e.target.value)}
            type="text"
            placeholder="Input your answer"
            className="max-w-[100%] rounded-none h-auto mt-[10px] float-left"
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
        )}
      </div>
    </div>
  );
};

export default WhQuestionComponent;
