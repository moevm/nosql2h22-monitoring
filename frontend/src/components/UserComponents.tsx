import React from "react";
import { useParams } from "react-router-dom";

import DoctorPage from "../pages/DoctorPage/DoctorPage";
import PatientPage from "../pages/PatientPage/PatientPage";

const UserComponent = () => {
  const { login } = useParams();

  if (login === "patient") {
    return <PatientPage />;
  } else if (login === "doctor") {
    return <DoctorPage />;
  }

  return <>Hello, {login}</>;
};

export { UserComponent };
