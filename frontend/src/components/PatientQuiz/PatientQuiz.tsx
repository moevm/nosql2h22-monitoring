import React, { FC, useState } from 'react';
import { Stack, Typography } from "@mui/material";
import { IQuestion } from "../../types";
import { IQuizContext, QuizContext } from "./QuizContext";
import Question from "../../shared/Question/Question";

interface IPatientQuizProps {
  questions: IQuestion[];
}

const PatientQuiz: FC<IPatientQuizProps> = ({questions}) => {
  const [answers, setAnswers] = useState<IQuizContext>({answers: {}});

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
      </Stack>
    </QuizContext.Provider>
  );
};

export default PatientQuiz;
