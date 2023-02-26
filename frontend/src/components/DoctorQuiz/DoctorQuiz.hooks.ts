import { ChangeEvent, useState } from "react";

import { useFetchWithFormData } from "../../hooks/useFetchWithFormData";
import { useAppDispatch } from "../../hooks/useRedux";
import { IQuestion } from "../../types";
import {
  sendDoctorQuestion,
  sendPatientAnswers,
} from "../../redux/reducers/userReducer/userReducer";
import { showError } from "../../utils/showError";

const toAnswersType = (
  str: string
): "numeric" | "logical" | "text" | "rating" => {
  switch (str) {
  case "numeric":
    return "numeric";

  case "logical":
    return "logical";
  case "text":
    return "text";
  default:
    return "rating";
  }
};
const useDoctorQuizHooks = (refreshPatient: () => void, patientId: string) => {
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
  const [newQuestionText, setQuestionText] = useState<string>("");
  const [newQuestionAnswersType, setQuestionAnswersType] = useState<
    "numeric" | "logical" | "text" | "rating"
  >("text");
  const dispatch = useAppDispatch();
  const editMode = (questionId: string, questions: IQuestion[]) => {
    const index = questions.findIndex(
      (question: IQuestion) => question.questionId === questionId
    );
    const question: IQuestion | undefined = questions[index];
    if (question !== undefined) {
      if (edit) {
        const newQuestions: IQuestion[] = [...questions];

        const newQuestion: IQuestion = {
          questionId: question.questionId,
          text,
          answersType,
        };
        // eslint-disable-next-line camelcase
        newQuestions[index] = newQuestion;
        //TODO: POST /Patient/quiz
        console.log(newQuestions);
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
    setAnswersType(toAnswersType(event.target.value));
  };
  const inputQuestionText = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionText(event.target.value);
  };

  const inputQuestionAnswersType = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionAnswersType(toAnswersType(event.target.value.trim()));
  };

  const createQuestion = () => {
    const body = {
      patientId,
      quiz: {
        text: newQuestionText,
        answersType: newQuestionAnswersType,
      },
    };
    dispatch(
      sendDoctorQuestion({
        patientId,
        quiz: {
          text: newQuestionText,
          answersType: newQuestionAnswersType,
        },
      })
    )
      .unwrap()
      .then(() => alert("Вопрос создан"))
      .catch(showError);

    refreshPatient();
    setQuestionAnswersType("text");
    setQuestionText("");
  };
  return {
    edit,
    text,
    answersType,
    answersTypes,
    newQuestionText,
    newQuestionAnswersType,
    editMode,
    inputText,
    inputAnswersType,
    inputQuestionText,
    inputQuestionAnswersType,
    createQuestion,
  };
};

export default useDoctorQuizHooks;
