import { createContext, Dispatch, SetStateAction } from 'react';

export type IQuizContext = {[key in string]: string | number | boolean };

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const QuizContext = createContext<Dispatch<SetStateAction<IQuizContext>>>(() => {});