import { useEffect, useState } from 'react';

import {
  getPatientQuizById,
  getPatientRecommendations,
  setDoctor,
  updateDoctor
} from '../../redux/reducers/userReducer/userReducer';
import { showError } from '../../utils/showError';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { IQuestion, IRecommendation } from '../../types';

export const useStartQuiz = (patientId: string) => {
  const dispatch = useAppDispatch();
  const [questions, setQuestion] = useState<IQuestion[] | null>(null);

  const startQuiz = () => {
    dispatch(getPatientQuizById({params: {patientId}}))
      .unwrap()
      .then(setQuestion)
      .catch(showError);
  };

  return {questions, startQuiz};
};

export const useGetRecommendations = (patientId: string) => {
  const [recommendations, setRecommendations] = useState<IRecommendation[] | null>(null);
  const isHavingDoctor = useAppSelector(state => state.user.userInfo!.doctors)?.length === 1;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isHavingDoctor) {
      dispatch(getPatientRecommendations({params: {patientId}}))
        .unwrap()
        .then(setRecommendations)
        .catch(showError);
    }
  }, [isHavingDoctor]);

  return {recommendations};
};

export const useChooseDoctor = (patientId: string) => {
  const dispatch = useAppDispatch();

  const chooseDoctor = (doctorId: string) => {
    dispatch(setDoctor({doctorId, patientId}))
      .unwrap()
      .then(data => dispatch(updateDoctor(data.doctors)))
      .catch(showError);
  };

  return {chooseDoctor};
};