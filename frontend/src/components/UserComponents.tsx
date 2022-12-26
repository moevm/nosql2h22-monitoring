import React from 'react';
import { useParams } from 'react-router-dom';

import PatientPage from '../pages/PatientPage/PatientPage';

const UserComponent = () => {
  const {login} = useParams();

  if (login === 'patient') {
    return <PatientPage/>;
  }

  return <>Hello, {login}</>;
};

export { UserComponent };
