import React, { FC, useContext, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { IQuestionProps } from '../Question.types';
import { QuizContext } from '../../../components/PatientQuiz/QuizContext';

const LogicalQuestion: FC<IQuestionProps> = ({questionId}) => {
  const [alignment, setAlignment] = useState('');
  const updateQuizContext = useContext(QuizContext);

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
    updateQuizContext(prev => ({...prev, [questionId]: newAlignment === 'yes'}));
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      onChange={handleChange}
      exclusive
    >
      <ToggleButton value="Yes">Да</ToggleButton>
      <ToggleButton value="No">Нет</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LogicalQuestion;
