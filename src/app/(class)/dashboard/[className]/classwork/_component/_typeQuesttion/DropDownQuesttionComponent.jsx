import React, { useEffect, useState } from "react";
import SelectComponent from "@/app/(class)/dashboard/setting/_component/SelectComponent";
import { Input } from "@nextui-org/react";

const DropDownQuesttionComponent = ({ handleDynamicAnswer, formAns, form }) => {
  //console.log("Form From DropDwon ;",form);
  const [stuAns, setStuAns] = useState([]);
  const [score, setScore] = useState();
  const [correctAns, setCorrectAns] = useState(false);
  const [dropdownAns, setDropdownAns] = useState({
    answers: [""],
    score: "",
    no: "",
  });

  useEffect(() => {
    formAns?.map((Ans) => {
      if (form.no == Ans.no) {
        if (form?.defaultAnswer.toString() === Ans?.answers.toString()) {
          setScore(form?.scores);
          setCorrectAns(true);
        } else {
          setScore(0);
          setCorrectAns(false);
        }
        setStuAns([...Ans.answers]);
      }
    });
  }, []);

  useEffect(() => {
    setDropdownAns({
      answers: stuAns,
      score: score,
      no: form.no,
    });
    console.log('student answer : ',stuAns);
  }, [stuAns]);

  useEffect(() => {
    //console.log('drop down answer : ',dropdownAns);
    handleDynamicAnswer(dropdownAns);
  }, [dropdownAns]);

  return (
    <div className="w-[100%] h-[120px] mt-[25px] rounded-[10px] shadow-small border-1 bg-white p-[20px]">
      <div className="w-[100%] h-[15%] float-left flex justify-between text-black">
        <p>{form?.question}</p>
        {formAns?.length > 0 ? (
          <span className="mr-[30px] flex items-center">
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
        {/* <span className="mr-[20px] flex items-center">__/{form?.scores}</span> */}
      </div>
      <div className="w-[100%] h-[80%] float-left mt-[20px] block py-2">
        <SelectComponent
          correctAns={correctAns}
          handleDynamicAnswer={handleDynamicAnswer}
          options={form?.options}
          formAns={formAns}
          form={form}
        ></SelectComponent>
      </div>
    </div>
  );
};

export default DropDownQuesttionComponent;
