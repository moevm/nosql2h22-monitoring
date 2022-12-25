import React from "react";
import { useParams } from "react-router-dom";
import PatientPage from "../pages/PatientPage/PatientPage";
interface IUserComponentProps {}

const UserComponent: React.FC<IUserComponentProps> = ({}) => {
  const { login } = useParams();

  if (login === 'patient') {
    return <PatientPage/>
  }

  return <>Hello, {login}</>;
};

export { UserComponent };
