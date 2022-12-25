import { createContext, Dispatch, SetStateAction } from "react";

export interface IQuizContext {
  answers: {[key in string]: string | number | boolean}
}

export const QuizContext = createContext<Dispatch<SetStateAction<IQuizContext>>>(() => {});