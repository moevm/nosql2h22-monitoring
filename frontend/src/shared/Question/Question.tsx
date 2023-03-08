import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { IQuestion } from '../../types';

import QuestionField from './QuestionField/QuestionField';

interface IQuestionProps {
  type: IQuestion['answerType'];
  text: string;
  questionId: string;
}

const Question: FC<IQuestionProps> = ({type, text, questionId}) => {
  console.log(type, text, questionId);
  return (
    <Box marginBottom={4}>
      <Typography marginBottom={2}>{text}</Typography>
      <QuestionField type={type} questionId={questionId}/>
    </Box>
  );
};

export default Question;
