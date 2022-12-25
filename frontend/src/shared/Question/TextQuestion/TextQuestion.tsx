import React, { FC, useContext } from 'react';
import { QuizContext } from "../../../components/PatientQuiz/QuizContext";
import { useInput } from "../../../hooks/useInput";
import { TextField } from "@mui/material";
import { IQuestionProps } from "../Question.types";

const TextQuestion: FC<IQuestionProps> = ({questionId}) => {
  const updateQuizContext = useContext(QuizContext);

  const [value, setValue] = useInput('',undefined,
    value => updateQuizContext(prev => ({...prev, [questionId]: value})));

  return (
    <TextField value={value} onChange={setValue} label="Ответ" fullWidth/>
  );
};

export default TextQuestion;
