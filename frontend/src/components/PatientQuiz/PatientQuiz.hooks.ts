import { useState } from 'react';

import { useFetchWithFormData } from '../../hooks/useFetchWithFormData';
import { QuizResultItem } from '../../types';
import { useAppDispatch } from '../../hooks/useRedux';
import { sendPatientAnswers } from '../../redux/reducers/userReducer/userReducer';
import { showError } from '../../utils/showError';

import { IQuizContext } from './QuizContext';

export const useQuiz = (questionsLength: number) => {
  const [answers, setAnswers] = useState<IQuizContext>({});
  const {setRowFiles, prepareData, rowFiles} = useFetchWithFormData();
  const dispatch = useAppDispatch();

  const handleAnswers = () => {

    const answerArray: QuizResultItem[] = [];

    for (const id in answers) {
      answerArray.push({
        questionId: id,
        answer: answers[id]
      });
    }

    if (answerArray.length !== questionsLength) {
      alert('Ответьте на все вопросы');
      return;
    }

    prepareData(data => {
      dispatch(sendPatientAnswers(data))
        .unwrap()
        .then(() => alert('Данные опроса отправлены'))
        .catch(showError);
    }, {quizResult: answerArray});
  };

  return {setAnswers, setRowFiles, sendAnswers: handleAnswers, rowFiles};
};