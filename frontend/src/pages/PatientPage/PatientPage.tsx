import React, { useState } from 'react';
import PatientRecommendations from "../../components/PatientRecommendations/PatientRecommendations";

import { Button, Stack, Typography } from "@mui/material";
import PatientQuiz from "../../components/PatientQuiz/PatientQuiz";
import { useFetch } from "../../hooks/useFetch";
import { HTTP } from "../../types/http";
import { IQuestion } from "../../types";
import FileLoader from "../../shared/FileLoader/FileLoader";
import { useFetchWithFormData } from "../../hooks/useFetchWithFormData";

const quesqion: IQuestion[] = [{
  answersType: 'numeric',
  questionId: '1',
  text: 'Сколько тебе лет'
},
  {
    answersType: 'logical',
    questionId: '2',
    text: 'Ты старый?'
  },
  {
    answersType: 'text',
    questionId: '3',
    text: 'Как дела?'
  },
  {
    answersType: 'rating',
    questionId: '4',
    text: 'Оцените состояние от 1 до 10'
  }]


const PatientPage = () => {
  const [{error, data: questions}] = useFetch<IQuestion[] | null>(HTTP.getPatientQuiz, '?id=10');
  const [startQuiz, setStartQuiz] = useState(false);
  const {setRowFiles, fetchData, rowFiles} = useFetchWithFormData(HTTP.sendSignedMedia);

  if (!error) {
    return <Typography>Ошибка получения данных с бекенда</Typography>;
  }

  return (
    <Stack direction="row" justifyContent={"space-between"} padding="0 100px">
      {startQuiz && questions
        ? <PatientQuiz questions={questions}/>
        : <PatientQuiz questions={quesqion}/>/*<Typography>Нажмите на кнопку, чтобы начать опрос</Typography>*/}
      <Stack spacing={1}>
        <PatientRecommendations recommendations={null}/>
        <Button
          variant="contained"
          onClick={() => setStartQuiz(true)}
          disabled={!questions}
        >
          {questions ? 'Пройти опрос' : 'Опросов нет'}
        </Button>
        <Stack gap={1}>
          <Typography fontSize={20}>Загрузка подписанных документов</Typography>
          <FileLoader rowFiles={rowFiles} maxFiles={1} accept="image/*" setRowFiles={setRowFiles} text="Загрузить"/>
          <Button variant="contained" onClick={() => fetchData()}>Отправить</Button>
        </Stack>
        <Stack>
          неподписанные(ссылки)
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PatientPage;
