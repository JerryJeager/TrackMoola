export const transactionDateFormat = () => {
  let today = new Date();
  let year = today.getFullYear();
  let date = today.getDate();
  let month = today.getMonth();
  date = date < 10 ? `0${date}` : date
  month = month < 10 ? `0${month}` : month

  return `${year}-${month + 1}-${date}`
};
