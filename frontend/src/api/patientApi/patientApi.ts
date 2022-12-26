import { apiFunctionMutation, apiFunctionQuery } from '../index';
import { HTTP } from '../../types/http';

import {
  PatientQuizAnswersRequest,
  PatientQuizAnswersResponse,
  QuizResponse,
  SignDocumentRequest,
  SignDocumentResponse
} from './patientApi.typings';


export const patientApi = {
  getQuiz: apiFunctionQuery<QuizResponse>(HTTP.getPatientQuiz),
  sendSignDocument: apiFunctionMutation<SignDocumentRequest, SignDocumentResponse>('post', HTTP.sendSignDocument),
  sendQuizAnswers:
    apiFunctionMutation<PatientQuizAnswersRequest, PatientQuizAnswersResponse>('post', HTTP.sendPatientAnswer)
};