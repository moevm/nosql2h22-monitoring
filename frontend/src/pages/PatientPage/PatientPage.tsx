import React, { useState } from "react";
import { Button, Link, Stack, Typography } from "@mui/material";

import PatientRecommendations from "../../components/PatientRecommendations/PatientRecommendations";
import PatientQuiz from "../../components/PatientQuiz/PatientQuiz";
import FileLoader from "../../shared/FileLoader/FileLoader";
import { useFetchWithFormData } from "../../hooks/useFetchWithFormData";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  getUnsignedMedia,
  sendSignDocument,
} from "../../redux/reducers/userReducer/userReducer";
import { showError } from "../../utils/showError";
import DownloadMedia from "../../shared/DownloadMedia/DownloadMedia";

import {
  useChooseDoctor,
  useGetRecommendations,
  useStartQuiz,
} from "./PatientPage.hooks";

const PatientPage = () => {
  const { setRowFiles, prepareData, rowFiles } = useFetchWithFormData();
  const dispatch = useAppDispatch();
  const { id: patientId, doctors } = useAppSelector(
    (state) => state.user.userInfo
  )!;
  const { questions, startQuiz } = useStartQuiz(patientId);
  const { recommendations } = useGetRecommendations(patientId);
  const { chooseDoctor } = useChooseDoctor(patientId);
  const [unsignedMedia, setUnsignedMedia] = useState<string[] | null>(null);

  const sendSignMedia = () => {
    prepareData(
      (data) => {
        dispatch(sendSignDocument(data))
          .unwrap()
          .then(() => alert("Данные отправлены"))
          .catch(showError);
      },
      { patientId }
    );
  };

  const fetchUnsignedMedia = () => {
    dispatch(getUnsignedMedia({ params: { patientId } }))
      .unwrap()
      .then((data) => {
        if (!data) {
          alert("Нет неподписанных документов");
        }
        setUnsignedMedia(data);
      })
      .catch(showError);
  };

  if (doctors && doctors.length > 1) {
    return (
      <Stack gap={2}>
        <Typography fontSize={20}>Выберите доктора</Typography>
        {doctors.map((doctor) => (
          <Typography onClick={() => chooseDoctor(doctor._id)} key={doctor._id}>
            {doctor.name}
          </Typography>
        ))}
      </Stack>
    );
  }

  return (
    <Stack direction="row" justifyContent={"space-between"} padding="0 100px">
      <PatientQuiz questions={questions} />
      <Stack spacing={1}>
        <PatientRecommendations recommendations={recommendations?.values} />
        <Button variant="contained" onClick={startQuiz} disabled={!!questions}>
          Пройти опрос
        </Button>
        <Stack gap={1}>
          <Typography fontSize={20}>Загрузка подписанных документов</Typography>
          <FileLoader
            rowFiles={rowFiles}
            maxFiles={1}
            accept="image/*"
            setRowFiles={setRowFiles}
            text="Загрузить"
          />
          <Button variant="contained" onClick={sendSignMedia}>
            Отправить
          </Button>
        </Stack>
        <DownloadMedia
          fetchMedia={fetchUnsignedMedia}
          media={unsignedMedia}
          title={"Неподписанные документы"}
        />
      </Stack>
    </Stack>
  );
};

export default PatientPage;
