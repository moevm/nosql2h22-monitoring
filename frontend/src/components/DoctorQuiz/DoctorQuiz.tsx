import React, { ChangeEvent, FC, useState } from "react";
import { Button, TextField, MenuItem } from "@mui/material";

import { IQuestion } from "../../types";

interface IDoctorQuizProps {
  questions: IQuestion[];
}

const DoctorQuiz: FC<IDoctorQuizProps> = ({ questions }) => {
  const answersTypes: {
    value: "numeric" | "logical" | "text" | "rating";
    label: "numeric" | "logical" | "text" | "rating";
  }[] = [
    {
      value: "numeric",
      label: "numeric",
    },
    {
      value: "logical",
      label: "logical",
    },
    {
      value: "text",
      label: "text",
    },
    {
      value: "rating",
      label: "rating",
    },
  ];
  const [edit, setEdit] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [answersType, setAnswersType] = useState<
    "numeric" | "logical" | "text" | "rating"
  >("text");
  const editMode = (questionId: string) => {
    const index = questions.findIndex(
      (question: IQuestion) => question.questionId === questionId
    );
    const question: IQuestion | undefined = questions[index];
    if (question !== undefined) {
      if (edit) {
        // eslint-disable-next-line camelcase
        const new_questions: IQuestion[] = [...questions];
        // eslint-disable-next-line camelcase
        const new_question: IQuestion = {
          questionId: question.questionId,
          text,
          answersType,
        };
        // eslint-disable-next-line camelcase
        new_questions[index] = new_question;
        //TODO: POST /Patient/quiz
        console.log(new_questions);
        setEdit(null);
      } else {
        setText(question.text);
        setAnswersType(question.answersType);
        setEdit(question.questionId);
      }
    }
  };
  const inputText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value.trim());
  };

  const inputAnswersType = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value.trim());
  };
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
                onClick={() => editMode(question.questionId)}
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
