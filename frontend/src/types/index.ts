export interface IRecommendation {
  id: string;
  date: Date;
  text: string;
}

export interface IQuestion {
  questionId: string;
  answersType: "numeric" | "logical" | "text" | "rating";
  text: string;
}

export enum Errors {
  UNEXPECTED_ERROR = "Непредвиденная ошибка. Попробуйте позже",
}

export type QueryParams = { [key in string]: string };

type patientId = string;
type doctorId = string;

export interface Doctor {
  id: string;
  name: string;
  patients: patientId[];
}

export interface QuizResultItem {
  questionId: string;
  answer: number | string | boolean;
}

export interface QuizResult {
  id: string;
  date: Date;
  result: QuizResultItem[];
}

export interface Patient {
  id: string;
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
