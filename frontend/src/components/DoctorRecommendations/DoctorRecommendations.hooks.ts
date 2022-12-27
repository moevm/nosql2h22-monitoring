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
        const new_recomandations: IRecommendation[] = [...recommendations];
        // eslint-disable-next-line camelcase
        const new_recomandation: IRecommendation = {
          id: recomandation.id,
          text,
          date: recomandation.date,
        };
        // eslint-disable-next-line camelcase
        new_recomandations[index] = new_recomandation;
        //TODO: POST /Patient/Recommendation
        console.log(new_recomandations);
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
