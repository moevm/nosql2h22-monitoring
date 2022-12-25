import { HTTP } from "../types/http";
import { useState } from "react";
import { useFetch } from "./useFetch";

export const useFetchWithFormData = <T>(url: HTTP) => {
  const [rowFiles, setRowFiles] = useState<File[] | null>(null);
  const [{error, data}, sendData] = useFetch<T>(url, undefined, false);

  const fetchData = <V extends {}>(extraData?: V) => {
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
    sendData({body: formData, method: 'post'});
    setRowFiles(null);
  }

  return{setRowFiles, data, error, fetchData, rowFiles};
}