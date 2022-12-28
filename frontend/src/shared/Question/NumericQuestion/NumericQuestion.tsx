import React, { FC, useContext } from 'react';
import { TextField } from '@mui/material';

import { IQuestionProps } from '../Question.types';
import { useInput } from '../../../hooks/useInput';
import { QuizContext } from '../../../components/PatientQuiz/QuizContext';

const NumericQuestion: FC<IQuestionProps> = ({questionId}) => {
  const updateQuizContext = useContext(QuizContext);

  const [value, setValue] = useInput('', /^\d*$/,
    value => updateQuizContext(prev => ({...prev, [questionId]: value})));

  return (
    <TextField value={value} onChange={setValue} label="Ответ(только цифры)" fullWidth/>
  );
};

export default NumericQuestion;
