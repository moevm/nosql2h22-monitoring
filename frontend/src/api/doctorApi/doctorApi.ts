import { HTTP } from "../../types/http";
import { apiFunctionMutation, apiFunctionQuery } from "../index";

import {
  GetDoctorQuizResultDocumentResponse,
  GetDoctorSingDocumentResponse,
  SetDoctorUnsignedDocumentsRequest,
  SetDoctorUnsignedDocumentsResponse,
  SetQuestionRequest,
  SetQuestionResponse,
  SetRecommendationRequest,
  SetRecommendationResponse,
} from "./doctorApi.typings";

export const doctorApi = {
  getQuizResultDocument: apiFunctionQuery<GetDoctorQuizResultDocumentResponse>(
    HTTP.getQuizResultDocument
  ),
  getSignDocument: apiFunctionQuery<GetDoctorSingDocumentResponse>(
    HTTP.getSignDocument
  ),
  sendDoctorUnsignedDocuments: apiFunctionMutation<
    SetDoctorUnsignedDocumentsRequest,
    SetDoctorUnsignedDocumentsResponse
  >("post", HTTP.sendUnsignDocuments),
  sendDoctorQuestion: apiFunctionMutation<
    SetQuestionRequest,
    SetQuestionResponse
  >("post", HTTP.setQuiz),
  sendDoctorRecommendation: apiFunctionMutation<
    SetRecommendationRequest,
    SetRecommendationResponse
  >("post", HTTP.setRecommendation),
};
