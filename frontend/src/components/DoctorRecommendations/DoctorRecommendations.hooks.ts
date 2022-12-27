import { ChangeEvent, useState } from "react";
import { IRecommendation } from "../../types";

const useRecommendationsHooks = () => {
  const [edit, setEdit] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const editMode = (id: string, recommendations: IRecommendation[]) => {
    const index = recommendations.findIndex(
      (recommendation: IRecommendation) => recommendation.id === id
    );
    const recomandation: IRecommendation | undefined = recommendations[index];
    if (recomandation !== undefined) {
      if (edit) {
        // eslint-disable-next-line camelcase
        const newRecomandations: IRecommendation[] = [...recommendations];
        // eslint-disable-next-line camelcase
        const newRecomandation: IRecommendation = {
          id: recomandation.id,
          text,
          date: recomandation.date,
        };
        // eslint-disable-next-line camelcase
        newRecomandations[index] = newRecomandation;
        //TODO: POST /Patient/Recommendation
        console.log(newRecomandations);
        setEdit(null);
      } else {
        setText(recomandation.text);
        setEdit(recomandation.id);
      }
    }
  };

  const inputText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value.trim());
  };
  return { edit, text, editMode, inputText };
};

export default useRecommendationsHooks;
