import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import PatientRecommendations from '../../components/PatientRecommendations/PatientRecommendations';
import PatientQuiz from '../../components/PatientQuiz/PatientQuiz';
import { IQuestion } from '../../types';
import FileLoader from '../../shared/FileLoader/FileLoader';
import { useFetchWithFormData } from '../../hooks/useFetchWithFormData';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getPatientQuizById, sendSignDocument } from '../../redux/reducers/userReducer/userReducer';
import { showError } from '../../utils/showError';

const PatientPage = () => {
  const [questions, setQuestion] = useState<IQuestion[] | null>(null);
  const [startQuiz, setStartQuiz] = useState(false);
  const {setRowFiles, prepareAndFetchData, rowFiles} = useFetchWithFormData();
  const dispatch = useAppDispatch();
  const patientId = useAppSelector(state => state.user.userInfo!.id);

  const sendSignMedia = () => {
    prepareAndFetchData(data => {
      dispatch(sendSignDocument(data))
        .unwrap()
        .then(() => alert('Данные отправлены'))
        .catch(showError);
    }, {patientId});
  };

  useEffect(() => {
    dispatch(getPatientQuizById({params: {patientId}}))
      .unwrap()
      .then(setQuestion)
      .catch(showError);
  }, []);

  return (
    <Stack direction="row" justifyContent={'space-between'} padding="0 100px">
      {startQuiz && questions ?
        <PatientQuiz questions={questions}/> :
        <Typography>Нажмите на кнопку, чтобы начать опрос</Typography>}
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
          <Button variant="contained" onClick={sendSignMedia}>Отправить</Button>
        </Stack>
        <Stack>
          неподписанные(ссылки)
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PatientPage;
