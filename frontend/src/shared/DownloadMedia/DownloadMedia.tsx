import React, { FC } from "react";
import { Button, Link, Stack, Typography } from "@mui/material";
import { Download } from "@mui/icons-material";

import { BASE_URL } from "../../types/http";

interface IDownloadMediaProps {
  media: string[] | null;
  fetchMedia: () => void;
  title: string;
}

const DownloadMedia: FC<IDownloadMediaProps> = ({
  media,
  fetchMedia,
  title,
}) => {
  console.log(media);
  return (
    <Stack>
      <Typography fontSize={20}>{title}</Typography>
      {!media && (
        <Button variant="contained" onClick={fetchMedia}>
          Получить
        </Button>
      )}
      {media?.map((media, idx) => (
        <Link
          fontSize={20}
          sx={{ display: "flex", alignItems: "center" }}
          href={`${BASE_URL}/${media}`}
          key={idx}
          target="_blank"
          download
        >
          <Download /> Скачать
        </Link>
      ))}
    </Stack>
  );
};

export default DownloadMedia;
