import { Doctor, IQuestion, IRecommendation } from '../../types';

export type QuizResponse = IQuestion[] | null;

export type SignDocumentRequest = FormData;

type path = string;

export type SignDocumentResponse = path;

export type PatientQuizAnswersRequest = FormData;

type quizResultId = string;

export type PatientQuizAnswersResponse = quizResultId;

export type PatientRecommendationResponse = IRecommendation[] | null;

export interface SetDoctorRequest {
  patientId: string;
  doctorId: string;
}

export interface SetDoctorResponse {
  doctors: [Doctor]
}
