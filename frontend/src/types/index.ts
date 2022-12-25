export interface Recommendation {
  id: string;
  date: Date;
  text: string;
}

export interface Question {
  questionId: string;
  answersType: "numeric" | "logical" | "text" | "rating";
  text: string;
}
