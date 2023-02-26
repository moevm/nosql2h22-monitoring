import { apiFunctionMutation, apiFunctionQuery } from "../index";
import { HTTP } from "../../types/http";

import {
  PatientInfo,
  PatientQuizAnswersRequest,
  PatientQuizAnswersResponse,
  PatientRecommendationResponse,
  QuizResponse,
  SetDoctorRequest,
  SetDoctorResponse,
  SignDocumentRequest,
  SignDocumentResponse,
  UnsignedMediaResponse,
} from "./patientApi.typings";

export const patientApi = {
  getPatient: apiFunctionQuery<PatientInfo>(HTTP.getPatientById),
  getQuiz: apiFunctionQuery<QuizResponse>(HTTP.getPatientQuiz),
  getUnsignedMedia: apiFunctionQuery<UnsignedMediaResponse>(HTTP.getUnsignedMedia),
  sendSignDocument: apiFunctionMutation<
    SignDocumentRequest,
    SignDocumentResponse
  >("post", HTTP.sendSignDocument),
  sendQuizAnswers: apiFunctionMutation<
    PatientQuizAnswersRequest,
    PatientQuizAnswersResponse
  >("post", HTTP.sendPatientAnswer),
  getRecommendations: apiFunctionQuery<PatientRecommendationResponse>(
    HTTP.getPatientRecommendations
  ),
  setDoctor: apiFunctionMutation<SetDoctorRequest, SetDoctorResponse>(
    "patch",
    HTTP.setDoctor
  ),
};
