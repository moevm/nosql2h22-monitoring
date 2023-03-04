import React, { FC } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { IRecommendation } from "../../types";
import { sortByDate } from "../../utils/sortByDate";
import { formatDate } from "../../utils/formatDate";

interface IPatientRecommendationsProps {
  recommendations: IRecommendation[] | null | undefined;
}

const PatientRecommendations: FC<IPatientRecommendationsProps> = ({
  recommendations,
}) => {
  if (!recommendations) {
    return <Typography fontSize={20}>Нет рекомендций</Typography>;
  }

  return (
    <Box>
      <Typography fontSize={20} marginBottom={1}>
        Рекомендации
      </Typography>
      {sortByDate(recommendations).map((recommendation) => (
        <Accordion key={recommendation._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              Рекомендация от {formatDate(recommendation.date)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{recommendation.text}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default PatientRecommendations;
