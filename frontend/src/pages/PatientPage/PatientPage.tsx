import React from 'react';
import { Button, Stack, Typography } from '@mui/material';

import PatientRecommendations from '../../components/PatientRecommendations/PatientRecommendations';
import PatientQuiz from '../../components/PatientQuiz/PatientQuiz';
import FileLoader from '../../shared/FileLoader/FileLoader';
import { useFetchWithFormData } from '../../hooks/useFetchWithFormData';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { sendSignDocument } from '../../redux/reducers/userReducer/userReducer';
import { showError } from '../../utils/showError';

import { useChooseDoctor, useGetRecommendations, useStartQuiz } from './PatientPage.hooks';

const PatientPage = () => {
  const {setRowFiles, prepareAndFetchData, rowFiles} = useFetchWithFormData();
  const dispatch = useAppDispatch();
  const {id: patientId, doctors} = useAppSelector(state => state.user.userInfo)!;
  const {questions, startQuiz} = useStartQuiz(patientId);
  const {recommendations} = useGetRecommendations(patientId);
  const {chooseDoctor} = useChooseDoctor(patientId);

  const sendSignMedia = () => {
    prepareAndFetchData(data => {
      dispatch(sendSignDocument(data))
        .unwrap()
        .then(() => alert('Данные отправлены'))
        .catch(showError);
    }, {patientId});
  };

  if (doctors && doctors.length > 1) {
    return (<Stack>
      {doctors.map(doctor =>
        <Typography onClick={() => chooseDoctor(doctor.id)} key={doctor.id}>{doctor.name}</Typography>)}
    </Stack>);
  }

  return (
    <Stack direction="row" justifyContent={'space-between'} padding="0 100px">
      {questions ?
        <PatientQuiz questions={questions}/> :
        <Typography>Нажмите на кнопку, чтобы начать опрос</Typography>}
      <Stack spacing={1}>
        <PatientRecommendations recommendations={recommendations}/>
        <Button
          variant="contained"
          onClick={startQuiz}
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
