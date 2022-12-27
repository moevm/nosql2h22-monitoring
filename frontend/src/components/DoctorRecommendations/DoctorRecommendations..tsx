import React, { useState, FC, ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";

import { IQuestion, IRecommendation } from "../../types";
import { formatDate } from "../../utils/formatDate";
import useRecommendationsHooks from "./DoctorRecommendations.hooks";

interface IDoctorRecommendationsProps {
  recommendations: IRecommendation[];
}

const DoctorRecommendations: FC<IDoctorRecommendationsProps> = ({
  recommendations,
}) => {
  const { edit, text, editMode, inputText } = useRecommendationsHooks();

  return (
    <div className="patient-info__recommendations">
      {recommendations.map((recommendation: IRecommendation) => {
        return (
          <div
            key={`recommendation_${recommendation.id}`}
            className="patient-info__recommendation"
          >
            <div className="patient-info__recommendations__date">
              {formatDate(recommendation.date)}
            </div>
            <div className="patient-info__recommendation__text">
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
            </div>
            <Button
              onClick={() => editMode(recommendation.id, recommendations)}
              variant={edit === recommendation.id ? "contained" : "outlined"}
            >
              {edit === recommendation.id ? "Save" : "Edit"}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default DoctorRecommendations;
