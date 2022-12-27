import { useEffect, useState } from "react";

import { getPatientById } from "../../redux/reducers/userReducer/userReducer";
import { showError } from "../../utils/showError";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { IQuestion, IRecommendation, Patient } from "../../types";

export const getPatient = (patientId: string) => {
  const dispatch = useAppDispatch();
  const [patient, setPatient] = useState<Patient | null>(null);
  useEffect(() => {
    dispatch(getPatientById({ params: { patientId } }))
      .unwrap()
      .then(setPatient)
      .catch(showError);
  }, []);
  return { patient };
};
