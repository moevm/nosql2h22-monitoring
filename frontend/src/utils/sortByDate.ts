import dayjs from 'dayjs';

export const sortByDate = <T extends {date: Date}[]>(obj: T) => {
  return obj.sort((a, b) => {
    const date1 = dayjs(a.date);
    const date2 = dayjs(b.date);

    return date1.diff(date2);
  });
};