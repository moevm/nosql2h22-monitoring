import React, { FC } from 'react';
import { IQuestion } from "../../../types";
import NumericQuestion from "../NumericQuestion/NumericQuestion";
import LogicalQuestion from "../LogicalQuestion/LogicalQuestion";
import { TextField } from "@mui/material";
import TextQuestion from "../TextQuestion/TextQuestion";
import RatingQuestion from "../RatingQuestion/RatingQuestion";

interface IQuestionTypeProps {
  type: IQuestion['answersType'];
  questionId: string;
}

const QuestionField: FC<IQuestionTypeProps> = ({type, questionId}) => {
  switch(type) {
    case 'numeric':
      return <NumericQuestion questionId={questionId}/>
    case 'logical':
      return <LogicalQuestion questionId={questionId}/>
    case 'text':
      return <TextQuestion questionId={questionId}/>
    case 'rating':
      return <RatingQuestion questionId={questionId}/>
  }

};

export default QuestionField;
