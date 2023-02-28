import React, { FC } from 'react';
import { Button, Link, Stack, Typography } from "@mui/material";
import { Download } from "@mui/icons-material";

interface IDownloadMediaProps {
  media: string[] | null;
  fetchMedia: () => void;
}


const DownloadMedia: FC<IDownloadMediaProps> = ({media, fetchMedia}) => {
  return (
    <Stack>
      <Typography fontSize={20}>Неподписанные документы</Typography>
      {!media && <Button variant="contained" onClick={fetchMedia}>Получить</Button>}
      {media?.map((media, idx) =>
        <Link
          fontSize={20}
          sx={{display: 'flex', alignItems: 'center'}}
          href={media}
          key={idx}
          target='_blank'
          download
        >
          <Download/> Скачать
        </Link>)}
    </Stack>
  );
};

export default DownloadMedia;
