import { apiFunctionMutation, apiFunctionQuery } from "../index";
import {
  PatientQuizAnswersRequest,
  PatientQuizAnswersResponse,
  QuizResponse,
  SignDocumentRequest,
  SignDocumentResponse
} from "./patientApi.typings";
import { HTTP } from "../../types/http";


export const patientApi = {
  getQuiz: apiFunctionQuery<QuizResponse>(HTTP.getPatientQuiz),
  sendSignDocument: apiFunctionMutation<SignDocumentRequest, SignDocumentResponse>('post', HTTP.sendSignDocument),
  sendQuizAnswers: apiFunctionMutation<PatientQuizAnswersRequest, PatientQuizAnswersResponse>('post', HTTP.sendPatientAnswer)
}