import React, { FC } from "react";

import DoctorQuiz from "../DoctorQuiz/DoctorQuiz";
import DoctorRecommendations from "../DoctorRecommendations/DoctorRecommendations.";

import { getPatient } from "./PatientInfo.hooks";

interface IPatientInfoProps {
  patientId: string;
}

const PatientInfo: FC<IPatientInfoProps> = ({ patientId }) => {
  const { patient } = getPatient(patientId);
  if (patient) {
    return (
      <>
        <div className="patient-info">
          <div className="patient-info__element">
            <span>ID:</span> {patient.id}
          </div>
          <div className="patient-info__element">
            <span>Name:</span> {patient.name}
          </div>
          <div className="patient-info__element">
            <DoctorQuiz questions={patient.quiz} />
          </div>
          <div className="patient-info__element">
            <DoctorRecommendations recommendations={patient.recommendations} />
          </div>
        </div>
      </>
    );
  } else {
    return <>Error</>;
  }
};

export default PatientInfo;
