import { apiFunctionMutation, apiFunctionQuery } from "../index";
import { HTTP } from "../../types/http";

import {
  SetQuestionRequest,
  SetQuestionResponse,
  SetRecommendationRequest,
  SetRecommendationResponse,
} from "./doctorApi.typings";

export const doctorApi = {
  sendDoctorQuestion: apiFunctionMutation<
    SetQuestionRequest,
    SetQuestionResponse
  >("post", HTTP.setQuiz),
  sendDoctorRecommendation: apiFunctionMutation<
    SetRecommendationRequest,
    SetRecommendationResponse
  >("post", HTTP.setRecommendation),
};
