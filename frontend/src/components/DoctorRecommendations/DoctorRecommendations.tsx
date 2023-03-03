import React, { useState, FC, ChangeEvent } from "react";
import { Button, TextField, Typography } from "@mui/material";

import { IQuestion, IRecommendation } from "../../types";
import { formatDate } from "../../utils/formatDate";

import useRecommendationsHooks from "./DoctorRecommendations.hooks";

import "./DoctorRecommendations.css";
interface IDoctorRecommendationsProps {
  recommendations: IRecommendation[];
  refreshPatient: () => void;
  patientId: string;
}

const DoctorRecommendations: FC<IDoctorRecommendationsProps> = ({
  recommendations,
  refreshPatient,
  patientId,
}) => {
  const {
    edit,
    text,
    recommendationText,
    editMode,
    inputText,
    inputRecommendationText,
    createRecommendation,
  } = useRecommendationsHooks(refreshPatient, patientId);

  return (
    <div className="patient-info__recommendations">
      {recommendations.map((recommendation: IRecommendation) => {
        return (
          <div
            key={`recommendation_${recommendation.id}`}
            className="patient-info__recommendation"
          >
            <div className="patient-info__recommendation__element patient-info__recommendations__date">
              <Typography fontSize={20}>
                {formatDate(recommendation.date)}
              </Typography>
            </div>
            <div className="patient-info__recommendation__element patient-info__recommendation__text">
              <Typography fontSize={20}>
                {edit === recommendation.id ? (
                  <TextField
                    multiline
                    fullWidth
                    rows={5}
                    label="text"
                    variant="standard"
                    value={text}
                    onChange={inputText}
                  />
                ) : (
                  recommendation.text
                )}
              </Typography>
            </div>
          </div>
        );
      })}
      <div className="patient-info__recommendation">
        <TextField
          multiline
          fullWidth
          rows={5}
          label="text"
          variant="filled"
          value={recommendationText}
          onChange={inputRecommendationText}
        />
        <Button onClick={createRecommendation} variant="contained">
          CREATE
        </Button>
      </div>
    </div>
  );
};

export default DoctorRecommendations;
