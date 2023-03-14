import React, { useState, FC } from "react";
import { Typography } from "@mui/material";

import { useAppDispatch } from "../../hooks/useRedux";
import { getQuizResultDocument } from "../../redux/reducers/userReducer/userReducer";
import DownloadMedia from "../../shared/DownloadMedia/DownloadMedia";
import { formatDate } from "../../utils/formatDate";
import { IQuestion, QuizResult, QuizResultItem } from "../../types";
import "./DoctorQuizResults.css";
import { showError } from "../../utils/showError";
interface IDoctorQuizResultsProps {
  quizResults: QuizResult[];
  questions: IQuestion[];
}

const DoctorQuizResults: FC<IDoctorQuizResultsProps> = ({
  quizResults,
  questions,
}) => {
  const dispatch = useAppDispatch();
  const [unsignedMedia, setUnsignedMedia] = useState<string[] | null>(null);
  const fetchUnsignedMedia = (QuizResultId: string) => {
    dispatch(getQuizResultDocument({ params: { QuizResultId } }))
      .unwrap()
      .then((data) => {
        if (!data) {
          alert("Нет прикрепленных документов");
        }
        setUnsignedMedia(data);
      })
      .catch(showError);
  };
  const getQuestionText = (questionId: string): string => {
    if (questions !== undefined) {
      const question = questions.find(
        (question: IQuestion) => question._id === questionId
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
        (question: IQuestion) => question._id === questionId
      );
      if (question !== undefined) {
        switch (question.answerType) {
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

  console.log(quizResults);

  return (
    <div className="patient-info__quiz-results">
      {quizResults.map((quizResult: QuizResult) => {
        return (
          <div className="patient-info__quiz-result">
            <Typography
              sx={{ padding: "0 20px", backgroundColor: "#ebebeb;" }}
              fontSize={20}
            >
              Дата: {formatDate(quizResult.date)}
            </Typography>
            {quizResult.Result.map((item: QuizResultItem) => {
              return (
                <div className="patient-info__quiz-result__answer">
                  <Typography fontSize={18} sx={{ marginTop: "20px" }}>
                    Вопрос: {getQuestionText(item.questionId)}
                  </Typography>
                  <Typography fontSize={18}>
                    Ответ: {getAnswer(item.questionId, item.answer)}
                  </Typography>
                </div>
              );
            })}
            <DownloadMedia
              fetchMedia={() => fetchUnsignedMedia(quizResult._id)}
              media={unsignedMedia}
              title={"Документы"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DoctorQuizResults;
