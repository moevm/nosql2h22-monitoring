import React, { FC, useState } from 'react';
import { Button, Stack, Typography } from "@mui/material";
import { IQuestion } from "../../types";
import { IQuizContext, QuizContext } from "./QuizContext";
import Question from "../../shared/Question/Question";
import FileLoader from "../../shared/FileLoader/FileLoader";
import { useFetch } from "../../hooks/useFetch";
import { HTTP } from "../../types/http";

interface IPatientQuizProps {
  questions: IQuestion[];
}

const PatientQuiz: FC<IPatientQuizProps> = ({questions}) => {
  const [answers, setAnswers] = useState<IQuizContext>({answers: {}});
  const [rowFiles, setRowFiles] = useState<File[] | null>(null);
  const [, sendAnswers] = useFetch<string>(HTTP.sendPatientAnswer);

  const handleAnswers = () => {
    if (!rowFiles) {
      alert('Загрузите файлы');
      return;
    }

    const formData = new FormData();
    rowFiles.forEach(rowFile => {
      formData.append('file', rowFile);
    });
    console.log(answers, formData, rowFiles);
  }

  return (
    <QuizContext.Provider value={setAnswers}>
      <Stack>
        <Typography marginBottom={2} fontSize={20}>Пройдите опрос</Typography>
        {questions.map(question =>
          <Question
            key={question.questionId}
            type={question.answersType}
            text={question.text}
            questionId={question.questionId}
          />)}
        <FileLoader maxFiles={5} setRowFiles={setRowFiles}/>
        <Button variant="contained" onClick={handleAnswers}>Отправить результаты</Button>
      </Stack>
    </QuizContext.Provider>
  );
};

export default PatientQuiz;
