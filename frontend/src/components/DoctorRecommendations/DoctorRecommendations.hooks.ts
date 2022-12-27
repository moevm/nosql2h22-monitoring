import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import { sendDoctorRecommendation } from "../../redux/reducers/userReducer/userReducer";
import { IRecommendation } from "../../types";
import { showError } from "../../utils/showError";

const useRecommendationsHooks = (
  refreshPatient: () => void,
  patientId: string
) => {
  const [edit, setEdit] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [recommendationText, setRecommendationText] = useState<string>("");
  const dispatch = useAppDispatch();
  const editMode = (id: string, recommendations: IRecommendation[]) => {
    const index = recommendations.findIndex(
      (recommendation: IRecommendation) => recommendation.id === id
    );
    const recomandation: IRecommendation | undefined = recommendations[index];
    if (recomandation !== undefined) {
      if (edit) {
        const newRecomandations: IRecommendation[] = [...recommendations];

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

  const createRecommendation = () => {
    dispatch(
      sendDoctorRecommendation({
        patientId,
        text: recommendationText,
      })
    )
      .unwrap()
      .then(() => alert("Рекомендация отправлена"))
      .catch(showError);

    refreshPatient();
    setRecommendationText("");
  };
  const inputText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value.trim());
  };
  const inputRecommendationText = (event: ChangeEvent<HTMLInputElement>) => {
    setRecommendationText(event.target.value.trim());
  };
  return {
    edit,
    text,
    recommendationText,
    editMode,
    inputText,
    inputRecommendationText,
    createRecommendation,
  };
};

export default useRecommendationsHooks;
