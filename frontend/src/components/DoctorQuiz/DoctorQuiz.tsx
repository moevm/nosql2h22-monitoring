import React, { ChangeEvent, FC, useState } from "react";
import { Button, TextField, MenuItem } from "@mui/material";

import { IQuestion } from "../../types";
import useDoctorQuizHooks from "./DoctorQuiz.hooks";

interface IDoctorQuizProps {
  questions: IQuestion[];
}

const DoctorQuiz: FC<IDoctorQuizProps> = ({ questions }) => {
  const {
    edit,
    text,
    answersType,
    answersTypes,
    editMode,
    inputText,
    inputAnswersType,
  } = useDoctorQuizHooks();
  return (
    <>
      <div className="patient-info__quizzes">
        {questions.map((question: IQuestion) => {
          return (
            <div
              key={`question_${question.questionId}`}
              className="patient-info__quiz"
            >
              <div className="patient-info__quiz__element">
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
              </div>
              <div className="patient-info__quiz__element">
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
              </div>
              <Button
                onClick={() => editMode(question.questionId, questions)}
                variant={
                  edit === question.questionId ? "contained" : "outlined"
                }
              >
                {edit === question.questionId ? "Save" : "Edit"}
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DoctorQuiz;
