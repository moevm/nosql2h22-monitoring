import React, { FC, useState } from "react";
import { Typography, Button } from "@mui/material";

import DoctorQuiz from "../DoctorQuiz/DoctorQuiz";
import DoctorRecommendations from "../DoctorRecommendations/DoctorRecommendations";
import DoctorQuizResults from "../DoctorQuizResults/DoctorQuizResults";

import { getPatient } from "./PatientInfo.hooks";
import "./PatientInfo.css";
interface IPatientInfoProps {
  patientId: string;
}

const PatientInfo: FC<IPatientInfoProps> = ({ patientId }) => {
  const { patient, refreshPatient } = getPatient(patientId);
  const [recommendations, setRecommendations] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<boolean>(false);
  const [info, setInfo] = useState<boolean>(true);
  const [quizResults, setQuizResult] = useState<boolean>(false);
  if (patient) {
    return (
      <>
        <div className="patient-info">
          <div className="patient-info__element ">
            <Button
              sx={{ justifyContent: "left" }}
              fullWidth
              onClick={() => setInfo(!info)}
              variant={info ? "outlined" : "contained"}
            >
              <Typography variant="h3" fontSize={20}>
                <h3>Info</h3>
              </Typography>
            </Button>
            {info ? (
              <div className="patient-info__description">
                <Typography variant="h3" fontSize={20}>
                  <h3>
                    <span>ID:</span> {patient.id}
                  </h3>
                </Typography>
                <Typography variant="h3" fontSize={20}>
                  <h3>
                    <span>Name:</span> {patient.name}
                  </h3>
                </Typography>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="patient-info__element">
            <Button
              sx={{ justifyContent: "left" }}
              fullWidth
              onClick={() => setQuiz(!quiz)}
              variant={quiz ? "outlined" : "contained"}
            >
              <Typography variant="h3" fontSize={20}>
                <h3>Quiz</h3>
              </Typography>
            </Button>
            {quiz ? (
              <DoctorQuiz
                questions={patient.quiz}
                refreshPatient={refreshPatient}
                patientId={patientId}
              />
            ) : (
              ""
            )}
          </div>
          <div className="patient-info__element">
            <Button
              fullWidth
              sx={{ justifyContent: "left" }}
              onClick={() => setRecommendations(!recommendations)}
              variant={recommendations ? "outlined" : "contained"}
            >
              <Typography variant="h3" fontSize={20}>
                <h3>Recommendations</h3>
              </Typography>
            </Button>
            {recommendations ? (
              <DoctorRecommendations
                recommendations={patient.recommendations}
                refreshPatient={refreshPatient}
                patientId={patientId}
              />
            ) : (
              ""
            )}
          </div>
          <div className="patient-info__element">
            <Button
              fullWidth
              sx={{ justifyContent: "left" }}
              onClick={() => setQuizResult(!quizResults)}
              variant={quizResults ? "outlined" : "contained"}
            >
              <Typography variant="h3" fontSize={20}>
                <h3>Quiz Result</h3>
              </Typography>
            </Button>
            {quizResults ? (
              <DoctorQuizResults
                quizResults={patient.quiz_results}
                questions={patient.quiz}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  } else {
    return <>Error</>;
  }
};

export default PatientInfo;
