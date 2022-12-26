import React, { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import { IQuestion } from '../../types';
import Question from '../../shared/Question/Question';
import FileLoader from '../../shared/FileLoader/FileLoader';

import { QuizContext } from './QuizContext';
import { useQuiz } from './PatientQuiz.hooks';

interface IPatientQuizProps {
  questions: IQuestion[];
}

const PatientQuiz: FC<IPatientQuizProps> = ({questions}) => {
  const {setAnswers, setRowFiles, sendAnswers, rowFiles} = useQuiz(questions.length);

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
        <FileLoader
          rowFiles={rowFiles}
          maxFiles={5}
          setRowFiles={setRowFiles}
          accept="image/*,video/*"
          text="Загрузить файлы"
        />
        <Button variant="contained" onClick={sendAnswers}>Отправить результаты</Button>
      </Stack>
    </QuizContext.Provider>
  );
};

export default PatientQuiz;
