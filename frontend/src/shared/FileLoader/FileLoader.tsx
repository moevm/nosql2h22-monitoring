import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { Button, ImageList, ImageListItem } from "@mui/material";
import FilePreview from "../FilePreview/FilePreview";

interface IFileLoaderProps {
  maxFiles: number;
  setRowFiles: Dispatch<SetStateAction<File[] | null>>;
}

const FileLoader: FC<IFileLoaderProps> = ({maxFiles, setRowFiles}) => {
  const [files, setFiles] = useState<(string)[]>([]);

  const openFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const rowFiles = event.target.files;
    if (!rowFiles?.length) {
      return;
    }

    const fileArray = Array.from(rowFiles);
    if (fileArray.length + files.length > maxFiles) {
      alert(`Невозможно загрузить файлы. Максимально количество файлов: ${maxFiles}`);
      return;
    }

    setRowFiles(prev => [...(prev ?? []), ...fileArray]);

    fileArray.forEach(file => {
      const reader = new FileReader();

      reader.addEventListener('load', e => {
        setFiles(prev => [...prev, e.target!.result as string]);
      })

      reader.readAsDataURL(file);
    })
  }

  return (
    <>
      <Button variant="contained" component="label">
        Загрузить файлы
        <input type="file" onChange={openFiles} accept='image/*,video/*' hidden multiple/>
      </Button>
      <ImageList sx={{width: 600}} cols={3} rowHeight={190}>
        {files.map((file, index) =>
          <ImageListItem key={index}>
            <FilePreview type={file.startsWith('data:video') ? 'video' : 'image'} file={file}/>
          </ImageListItem>)}
      </ImageList>
    </>
  );
};

export default FileLoader;
