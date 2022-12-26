import { useState } from "react";

export const useFetchWithFormData = () => {
  const [rowFiles, setRowFiles] = useState<File[] | null>(null);

  const prepareAndFetchData = <V extends {}>(sendFunc: (data: FormData) => void, extraData?: V) => {
    if (!rowFiles) {
      alert('Загрузите файлы');
      return;
    }

    const formData = new FormData();
    rowFiles.forEach(rowFile => {
      formData.append('file', rowFile);
    });

    for (let key in extraData) {
      if (extraData.hasOwnProperty(key)) {
        formData.append(key, JSON.stringify(extraData[key]));
      }
    }
    sendFunc(formData);
    setRowFiles(null);
  }

  return{setRowFiles, prepareAndFetchData, rowFiles};
}