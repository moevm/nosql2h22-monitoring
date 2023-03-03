import React, { useState } from "react";

const useDoctorPage = () => {
  const [patientId, setPatientId] = useState<string | null>(null);

  return { patientId, setPatientId };
};

export default useDoctorPage;
