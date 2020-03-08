export const parseDate = (strDate: string): Date => {
  const day = strDate.substring(0, 2);
  const month = strDate.substring(3, 5);
  const year = strDate.substring(6, 10);
  const parsedDate = new Date(year + '-' + month + '-' + day);
  return parsedDate;
};

export const matchShortDate = (strDate: string) => {
  return /(\d{2})\/(\d{2})\/(\d{4})/.test(strDate); // por exemplo: 15/12/2020
};

export const isValidDate = (date: any) => {
  return !isNaN(date) && date instanceof Date;
}