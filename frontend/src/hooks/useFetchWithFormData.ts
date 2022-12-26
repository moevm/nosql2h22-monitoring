import { useState } from 'react';

export const useFetchWithFormData = () => {
  const [rowFiles, setRowFiles] = useState<File[] | null>(null);

  const prepareAndFetchData = <V extends object>(sendFunc: (data: FormData) => void, extraData?: V) => {
    if (!rowFiles) {
      alert('Загрузите файлы');
      return;
    }

    const formData = new FormData();
    rowFiles.forEach(rowFile => {
      formData.append('file', rowFile);
    });

    for (const key in extraData) {
      // eslint-disable-next-line no-prototype-builtins
      if (extraData.hasOwnProperty(key)) {
        formData.append(key, JSON.stringify(extraData[key]));
      }
    }
    sendFunc(formData);
    setRowFiles(null);
  };

  return {setRowFiles, prepareAndFetchData, rowFiles};
};