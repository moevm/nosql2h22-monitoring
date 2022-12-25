import { IQuizContext } from "./QuizContext";
import { useState } from "react";
import { HTTP } from "../../types/http";
import { useFetchWithFormData } from "../../hooks/useFetchWithFormData";

export const useQuiz = (questionsLength: number) => {
  const [answers, setAnswers] = useState<IQuizContext>({});
  const {setRowFiles, fetchData, rowFiles} = useFetchWithFormData<string>(HTTP.sendPatientAnswer);

  const handleAnswers = () => {

    const answerArray: {
      questionId: string,
      answer: string | number | boolean
    }[] = [];

    for (let id in answers) {
      answerArray.push({
        questionId: id,
        answer: answers[id]
      })
    }

    if (answerArray.length !== questionsLength) {
      alert('Ответьте на все вопросы');
      return;
    }

    fetchData({result: answerArray});
  }

  return {setAnswers, setRowFiles, sendAnswers: handleAnswers, rowFiles};
}