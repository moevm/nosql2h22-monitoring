import { IQuestion, IRecommendation } from "../../types";

export interface SetQuestionRequest {
  patientId: string;
  quiz: {
    text: string;
    answersType: "numeric" | "logical" | "text" | "rating";
  };
}

export type SetQuestionResponse = IQuestion;

export interface SetRecommendationRequest {
  patientId: string;
  text: string;
}
export type SetRecommendationResponse = IRecommendation;
