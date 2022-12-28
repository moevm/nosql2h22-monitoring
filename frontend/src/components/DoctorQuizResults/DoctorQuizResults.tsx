import React, { useState, FC } from "react";
import { Typography } from "@mui/material";

import { formatDate } from "../../utils/formatDate";
import { IQuestion, QuizResult, QuizResultItem } from "../../types";
import "./DoctorQuizResults.css";
interface IDoctorQuizResultsProps {
  quizResults: QuizResult[];
  questions: IQuestion[];
}

const DoctorQuizResults: FC<IDoctorQuizResultsProps> = ({
  quizResults,
  questions,
}) => {
  const getQuestionText = (questionId: string): string => {
    if (questions !== undefined) {
      const question = questions.find(
        (question: IQuestion) => question.questionId === questionId
      );
      if (question !== undefined) return question.text;
      else return "Not Found question";
    }
    return "";
  };
  const getAnswer = (
    questionId: string,
    result: number | string | boolean
  ): string => {
    if (questions !== undefined) {
      const question = questions.find(
        (question: IQuestion) => question.questionId === questionId
      );
      if (question !== undefined) {
        switch (question.answersType) {
          case "logical":
            if (result) return "Yes";
            else return "No";
          default:
            return String(result);
        }
      }
    }
    return "";
  };
  return (
    <div className="patient-info__quiz-results">
      {quizResults.map((quizResult: QuizResult) => {
        return (
          <div className="patient-info__quiz-result">
            <Typography
              sx={{ padding: "0 20px", backgroundColor: "#ebebeb;" }}
              fontSize={20}
            >
              Date: {formatDate(quizResult.date)}
            </Typography>
            {quizResult.result.map((item: QuizResultItem) => {
              return (
                <div className="patient-info__quiz-result__answer">
                  <Typography fontSize={18} sx={{ marginTop: "20px" }}>
                    Question: {getQuestionText(item.questionId)}
                  </Typography>
                  <Typography fontSize={18}>
                    Answer: {getAnswer(item.questionId, item.answer)}
                  </Typography>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DoctorQuizResults;
