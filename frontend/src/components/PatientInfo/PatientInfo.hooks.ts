import { useEffect, useState } from "react";

import { useFetchWithFormData } from "../../hooks/useFetchWithFormData";
import {
  getPatientById,
  sendUnsignedMedia,
} from "../../redux/reducers/userReducer/userReducer";
import { showError } from "../../utils/showError";
import { useAppDispatch } from "../../hooks/useRedux";
import { Patient } from "../../types";

export const getPatient = (patientId: string) => {
  const dispatch = useAppDispatch();
  const [patient, setPatient] = useState<Patient | null>(null);
  const { setRowFiles, prepareData, rowFiles } = useFetchWithFormData();
  const refreshPatient = () => {
    dispatch(getPatientById({ params: { id: patientId } }))
      .unwrap()
      .then(setPatient)
      .catch(showError);
  };
  useEffect(() => {
    dispatch(getPatientById({ params: { id: patientId } }))
      .unwrap()
      .then(setPatient)
      .catch(showError);
  }, []);

  const handleAnswers = () => {
    prepareData(
      (data) => {
        dispatch(sendUnsignedMedia(data))
          .unwrap()
          .then(() => alert("Данные опроса отправлены"))
          .catch(showError);
      },
      { patient: `${patientId}` }
    );
  };
  return {
    patient,
    refreshPatient,
    rowFiles,
    setRowFiles,
    sendAnswers: handleAnswers,
  };
};
