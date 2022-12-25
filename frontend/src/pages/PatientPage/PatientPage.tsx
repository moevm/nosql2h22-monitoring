import React from 'react';
import PatientRecommendations from "../../components/PatientRecommendations/PatientRecommendations";

import { Stack } from "@mui/material";
import PatientQuiz from "../../components/PatientQuiz/PatientQuiz";

const PatientPage = () => {
  return (
    <Stack direction="row" justifyContent={"space-between"} padding="0 100px">
      <PatientQuiz/>
      <PatientRecommendations recommendations={null}/>
    </Stack>
  );
};

export default PatientPage;
