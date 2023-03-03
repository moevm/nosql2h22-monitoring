import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PatientInfo from "../../components/PatientInfo/PatientInfo";
import { useAppSelector } from "../../hooks/useRedux";

const DoctorPage = () => {
  const [patientId, setPatientId] = useState<null | string>(null);
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  useEffect(() => {
    if (!userInfo) navigate("/");
    else {
      console.log(userInfo);
    }
  }, []);
  useEffect(() => {
    console.log(patientId);
  }, [patientId]);
  const clickHandler = (id: string) => {
    setPatientId(id);
    console.log(patientId);
  };
  if (userInfo) {
    return (
      <>
        {userInfo?.patients?.map((patient) => {
          console.log(patient);
          return (
            <>
              <Button
                variant={patient._id === patientId ? "contained" : "text"}
                key={patient._id}
                onClick={() => clickHandler(patient._id)}
              >
                {patient.name}
              </Button>
            </>
          );
        })}
        {patientId ? <PatientInfo patientId={patientId} /> : <></>}
      </>
    );
  } else {
    return <>Loading</>;
  }
};
export default DoctorPage;
