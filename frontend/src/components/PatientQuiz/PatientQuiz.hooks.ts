import { IQuizContext } from "./QuizContext";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { HTTP } from "../../types/http";

export const useQuiz = (questionsLength: number) => {
  const [answers, setAnswers] = useState<IQuizContext>({});
  const [rowFiles, setRowFiles] = useState<File[] | null>(null);
  const [{error}, sendAnswers] = useFetch<string>(HTTP.sendPatientAnswer, undefined, false);
console.log(error)
  const handleAnswers = () => {
    if (!rowFiles) {
      alert('Загрузите файлы');
      return;
    }

    const answerArray = [];

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

    const formData = new FormData();
    rowFiles.forEach(rowFile => {
      formData.append('file', rowFile);
    });

    formData.append('result', JSON.stringify(answerArray));
    sendAnswers({body: formData, method: 'post'});
  }

  return {setAnswers, setRowFiles, sendAnswers: handleAnswers};
}