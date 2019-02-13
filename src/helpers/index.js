import { getDaysInMonth } from "date-fns";

export const getMonthDays = date => getDaysInMonth(date);

export const correctDaysOffset = (date, offset = 1) =>
  (WEEKDAYS_NUMBER - (offset - date)) % WEEKDAYS_NUMBER;

export const fillMonthArray = date => {
  date = new Date(date.setDate(1));
  const daysInMonth = getDaysInMonth(date);
  const startWeekOfMonth = correctDaysOffset(date.getDay());
  return [
    ...new Array(startWeekOfMonth).fill(),
    ...new Array(daysInMonth)
      .fill()
      .map((day, index) => new Date(date.setDate(index + 1)))
  ];
};
