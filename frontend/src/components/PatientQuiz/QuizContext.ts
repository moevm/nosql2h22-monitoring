import { createContext, Dispatch, SetStateAction } from "react";

export type IQuizContext = {[key in string]: string | number | boolean };



export const QuizContext = createContext<Dispatch<SetStateAction<IQuizContext>>>(() => {});