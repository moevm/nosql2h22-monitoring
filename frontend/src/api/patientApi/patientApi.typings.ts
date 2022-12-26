import { IQuestion } from '../../types';

export type QuizResponse = IQuestion[] | null;

export type SignDocumentRequest = FormData;

type path = string;

export type SignDocumentResponse = path;

export type PatientQuizAnswersRequest = FormData;

type quizResultId = string;

export type PatientQuizAnswersResponse = quizResultId;

