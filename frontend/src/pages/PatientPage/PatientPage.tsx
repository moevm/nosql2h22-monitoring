import React from 'react';
import PatientRecommendations from "../../components/PatientRecommendations/PatientRecommendations";

import { Box, Button, Stack, Typography } from "@mui/material";
import PatientQuiz from "../../components/PatientQuiz/PatientQuiz";
import { useFetch } from "../../hooks/useFetch";
import { HTTP } from "../../types/http";
import { Question } from "../../types";

const PatientPage = () => {
  const [{error, data: questions}] = useFetch<Question[] | null>(HTTP.getPatientQuiz, '?id=10');

  if (error) {
    return <Typography>Ошибка получения данных с бекенда</Typography>;
  }

  return (
    <Stack direction="row" justifyContent={"space-between"} padding="0 100px">
      <PatientQuiz/>
      <Box>
        <PatientRecommendations recommendations={null}/>
        <Button variant="contained" disabled={!questions}>{questions? 'Пройти опрос': 'Опросов нет'}</Button>
      </Box>
    </Stack>
  );
};

export default PatientPage;
