export const dateToString = (date, separator = "-", iso = false) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  if (iso) return `${year}${separator}${month}${separator}${day}`;
  return `${day}${separator}${month}${separator}${year}`;
};
