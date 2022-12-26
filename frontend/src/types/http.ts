export const BASE_URL = 'http://localhost:5000';

export enum HTTP {
 getPatientRecommendations='/Patient/Recommendation',
 getPatientQuiz='/Patient/quiz',
 sendPatientAnswer='/Patient/answer',
 sendSignDocument='/Patient/signedMedia/',
 signIn='/GetUser',
 setDoctor='/Patient/setDoctor'
}