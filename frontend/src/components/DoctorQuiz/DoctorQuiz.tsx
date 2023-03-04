import React, { ChangeEvent, FC, useState } from "react";
import { Button, TextField, MenuItem, Typography } from "@mui/material";

import { IQuestion } from "../../types";

import useDoctorQuizHooks from "./DoctorQuiz.hooks";

import "./DoctorQuiz.css";
interface IDoctorQuizProps {
  questions: IQuestion[];
  refreshPatient: () => void;
  patientId: string;
}

const DoctorQuiz: FC<IDoctorQuizProps> = ({
  questions,
  refreshPatient,
  patientId,
}) => {
  const {
    edit,
    text,
    answersType,
    answersTypes,
    newQuestionText,
    newQuestionAnswersType,
    editMode,
    inputText,
    inputAnswersType,
    inputQuestionText,
    inputQuestionAnswersType,
    createQuestion,
  } = useDoctorQuizHooks(refreshPatient, patientId);
  return (
    <>
      <div className="patient-info__quizzes">
        {questions.map((question: IQuestion) => {
          return (
            <div
              key={`question_${question.questionId}`}
              className="patient-info__quiz"
            >
              <Typography fontSize={20} className="patient-info__quiz__element">
                {edit === question.questionId ? (
                  <TextField
                    label="text"
                    variant="standard"
                    value={text}
                    onChange={inputText}
                  />
                ) : (
                  question.text
                )}
              </Typography>
              <Typography
                color={"blue"}
                fontSize={20}
                className="patient-info__quiz__element"
              >
                {edit === question.questionId ? (
                  <TextField
                    label="type"
                    variant="standard"
                    select
                    value={answersType}
                    onChange={inputAnswersType}
                  >
                    {answersTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  question.answersType
                )}
              </Typography>
            </div>
          );
        })}
        <div className="patient-info__quiz__element">
          <TextField
            sx={{ width: "80%" }}
            label="text"
            variant="standard"
            value={newQuestionText}
            onChange={inputQuestionText}
          />
          <TextField
            sx={{ width: "20%" }}
            label="type"
            variant="standard"
            select
            value={newQuestionAnswersType}
            onChange={inputQuestionAnswersType}
          >
            {answersTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button size="large" variant="contained" onClick={createQuestion}>
            CREATE
          </Button>
        </div>
      </div>
    </>
  );
};

export default DoctorQuiz;
