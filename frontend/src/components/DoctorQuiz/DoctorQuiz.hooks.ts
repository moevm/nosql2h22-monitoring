import { ChangeEvent, useState } from "react";
import { IQuestion } from "../../types";

const useDoctorQuizHooks = () => {
  const answersTypes: {
    value: "numeric" | "logical" | "text" | "rating";
    label: "numeric" | "logical" | "text" | "rating";
  }[] = [
    {
      value: "numeric",
      label: "numeric",
    },
    {
      value: "logical",
      label: "logical",
    },
    {
      value: "text",
      label: "text",
    },
    {
      value: "rating",
      label: "rating",
    },
  ];
  const [edit, setEdit] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [answersType, setAnswersType] = useState<
    "numeric" | "logical" | "text" | "rating"
  >("text");
  const editMode = (questionId: string, questions: IQuestion[]) => {
    const index = questions.findIndex(
      (question: IQuestion) => question.questionId === questionId
    );
    const question: IQuestion | undefined = questions[index];
    if (question !== undefined) {
      if (edit) {
        // eslint-disable-next-line camelcase
        const new_questions: IQuestion[] = [...questions];
        // eslint-disable-next-line camelcase
        const new_question: IQuestion = {
          questionId: question.questionId,
          text,
          answersType,
        };
        // eslint-disable-next-line camelcase
        new_questions[index] = new_question;
        //TODO: POST /Patient/quiz
        console.log(new_questions);
        setEdit(null);
      } else {
        setText(question.text);
        setAnswersType(question.answersType);
        setEdit(question.questionId);
      }
    }
  };
  const inputText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value.trim());
  };

  const inputAnswersType = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value.trim());
  };
  return {
    edit,
    text,
    answersType,
    answersTypes,
    editMode,
    inputText,
    inputAnswersType,
  };
};

export default useDoctorQuizHooks;
