export interface IRecommendation {
  id: string;
  date: Date;
  text: string;
}

export interface IQuestion {
  questionId: string;
  answersType: "numeric" | "logical" | "text" | "rating";
  text: string;
}
