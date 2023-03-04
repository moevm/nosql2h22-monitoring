import { IQuestion, IRecommendation } from "../../types";

type path = string;
export interface SetQuestionRequest {
  patientId: string;
  quiz: {
    text: string;
    answersType: "numeric" | "logical" | "text" | "rating";
  }[];
}

export type GetDoctorSingDocumentResponse = string[];

export type GetDoctorQuizResultDocumentResponse = string[];

export type SetDoctorUnsignedDocumentsRequest = FormData;

export type SetDoctorUnsignedDocumentsResponse = path[];

export type SetQuestionResponse = IQuestion;

export interface SetRecommendationRequest {
  patientId: string;
  text: string;
}
export type SetRecommendationResponse = IRecommendation;
