export const BASE_URL = "http://localhost:5000";

export enum HTTP {
  getPatientRecommendations = "/Patient/Recommendation",
  getPatient = "/Patient",
  getPatientById = "/Patient",
  getPatientQuiz = "/Patient/quiz",
  getUnsignedMedia = "/Patient/unsignedMedia",
  sendPatientAnswer = "/Patient/answer",
  sendSignDocument = "/Patient/signedMedia/",

  sendUnsignDocuments = "/Patient/unsignedMedia/",

  getSignDocument = "/Patient/signedMedia",

  getQuizResultDocument = "/Patient/answers/media",
  signIn = "/GetUser",
  setDoctor = "/Patient/setDoctor",
  setRecommendation = "/Patient/recommendation",
  setQuiz = "Patient/quiz",
}
