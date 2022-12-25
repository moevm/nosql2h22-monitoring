import React, { CSSProperties, FC } from 'react';
import { Box } from "@mui/material";

import styles from './FilePreview.module.scss';

interface IFilePreviewProps {
  type: 'image' | 'video';
  file: string;
}


const FilePreview: FC<IFilePreviewProps> = ({type, file}) => {
  return (
    <Box position='relative' width={190} height={190}>
      <p className={styles.fileInfo}>{type=== 'video'? 'видео': 'изображение'}</p>
      {type === 'video'
      ? <video className={styles.file} src={file}/>
      : <img className={styles.file} src={file} loading="lazy"/>}
    </Box>
  );
};

export default FilePreview;
