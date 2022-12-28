import React, { FC, useContext } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { IQuestionProps } from '../Question.types';
import { QuizContext } from '../../../components/PatientQuiz/QuizContext';
import { useInput } from '../../../hooks/useInput';

const ratingArray = Array(10).fill(0).map((_, index) => index + 1);

const RatingQuestion: FC<IQuestionProps> = ({questionId}) => {
  const updateQuizContext = useContext(QuizContext);
  const [value, setValue] = useInput('', undefined,
    value => updateQuizContext(prev => ({...prev, [questionId]: +value})));

  return (
    <FormControl >
      <RadioGroup value={value} onChange={setValue} row>
        {ratingArray.map(rating =>
          <FormControlLabel key={rating} value={rating} control={<Radio/>} label={rating}/>)}
      </RadioGroup>
    </FormControl>
  );
};

export default RatingQuestion;
