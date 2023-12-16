
type StringOrNum = (string | number)

export const transactionDateFormat = () => {
  let today = new Date();
  let year = today.getFullYear();
  let date: StringOrNum = today.getDate();
  let month: StringOrNum = today.getMonth();
  date = date < 10 ? `0${date}` : date
  month = month < 10 ? `0${month + 1}` : month

  return `${year}-${month}-${date}`
};
