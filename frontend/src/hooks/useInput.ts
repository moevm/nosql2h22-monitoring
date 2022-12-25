import { ChangeEvent, useState } from "react";

export const useInput = (initialValue='', pattern=/.*/, onUpdate?: (value: string) => void)
  :[string, (event: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    console.log(value, pattern, pattern.test(value));
    if (pattern.test(value)) {
      setValue(value);
      onUpdate && onUpdate(value);
    }
  };

  return [value, handleChange];
};