export interface IRecommendation {
  _id: string;
  date: Date;
  text: string;
}

export interface IQuestion {
  _id: string;
  answerType: "numeric" | "logical" | "text" | "rating";
  text: string;
}

export enum Errors {
  UNEXPECTED_ERROR = "Непредвиденная ошибка. Попробуйте позже",
  SERVER_ERROR = 'Ошибка сервера. Пожалуйста, попробуйте позже'
}

export type QueryParams = { [key in string]: string };

type patientId = string;
type doctorId = string;

export interface Doctor {
  _id: string;
  name: string;
  patients: patientId[];
}

export interface QuizResultItem {
  questionId: string;
  answer: number | string | boolean;
}

export interface QuizResult {
  _id: string;
  date: Date;
  Result: QuizResultItem[];
}

export interface Patient {
  _id: string;
  name: string;
  doctor: doctorId | null;
  quiz: IQuestion[];
  quiz_results: QuizResult[];
  recommendations: IRecommendation[];
}

export interface User {
  role: "doctor" | "patient";
  name: string;
  id: string;
  doctors?: Doctor[];
  patients?: Patient[];
}
