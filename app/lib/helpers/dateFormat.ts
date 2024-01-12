type StringOrNum = string | number;

export const transactionDateFormat = () => {
  let today = new Date();
  let year = today.getFullYear();
  let date: StringOrNum = today.getDate();
  let month: StringOrNum = today.getMonth();
  date = date < 10 ? `0${date}` : date;
  month = month < 10 ? `0${month + 1}` : month;

  return `${year}-${month}-${date}`;
};

export const dayFormat = (day: number) => {
  let dayName = "";
  day === 0
    ? (dayName = "Sun")
    : day === 1
    ? (dayName = "Mon")
    : day === 2
    ? (dayName = "Tue")
    : day === 3
    ? (dayName = "Wed")
    : day === 4
    ? (dayName = "Thu")
    : day === 5
    ? (dayName = "Fri")
    : (dayName = "Sat");

  return dayName;
};

export const monthFormat = (month: number) => {
  let monthName = "";
  month === 0
    ? (monthName = "January")
    : month === 1
    ? (monthName = "Febuary")
    : month === 2
    ? (monthName = "March")
    : month === 3
    ? (monthName = "April")
    : month === 4
    ? (monthName = "May")
    : month === 5
    ? (monthName = "June")
    : month === 6
    ? (monthName = "July")
    : month === 7
    ? (monthName = "August")
    : month === 8
    ? (monthName = "September")
    : month === 9
    ? (monthName = "October")
    : month === 10
    ? (monthName = "November")
    : (monthName = "December");

    return monthName
};
