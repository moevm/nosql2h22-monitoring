import { apiFunctionMutation, apiFunctionQuery } from "../index";
import { HTTP } from "../../types/http";

import {
  SetQuestionRequest,
  SetQuestionResponse,
  SetRecommendationRequest,
  SetRecommendationResponse,
  SetDoctorUnsignedDocumentsRequest,
  SetDoctorUnsignedDocumentsResponse,
} from "./doctorApi.typings";

export const doctorApi = {
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
