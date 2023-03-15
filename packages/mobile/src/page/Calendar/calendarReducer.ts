import {
  caculateDateNum,
  MAXIMUM_DATE,
  MAXIMUM_MONTH,
  MINIMUM_DATE,
  MINIMUM_MONTH,
  MINIMUM_YEAR,
} from "src/utils/calendarTools";

import { CalendarInfo } from "../../type/index";

export type CalendarAction =
  | "increment_month"
  | "decrement_month"
  | "decrement_date"
  | "increment_date";

const calendarReducer = (
  { year, month, date, day }: CalendarInfo,
  action: {
    type: CalendarAction;
  },
) => {
  const decrementDay = +(day !== undefined && (day === 0 ? 6 : day - 1));
  const incrementDay = +(day !== undefined && (day === 6 ? 0 : day + 1));

  switch (action.type) {
    case "decrement_month":
      if (month === MINIMUM_MONTH) {
        if (year === MINIMUM_YEAR) return { year, month };
        return { year: year - 1, month: MAXIMUM_MONTH };
      }
      return { year, month: month - 1 };

    case "increment_month":
      if (month === MAXIMUM_MONTH) return { year: year + 1, month: 0 };
      return { year, month: month + 1 };

    case "decrement_date":
      if (date) {
        if (month === MINIMUM_MONTH && date === MINIMUM_DATE)
          // 2022.01.01
          return {
            year: year - 1,
            month: MAXIMUM_MONTH,
            date: MAXIMUM_DATE,
            day: decrementDay,
          };
        if (date === MINIMUM_DATE)
          // 2022.02.01
          return {
            year,
            month: month - 1,
            date: caculateDateNum(year, month),
            day: decrementDay,
          };
        return { year, month, date: date - 1, day: decrementDay }; // 2022.07.24
      }
      return { year, month, date, day };

    case "increment_date":
      if (date) {
        if (month === MAXIMUM_MONTH && date === MAXIMUM_DATE)
          // 2022.12.31
          return {
            year: year + 1,
            month: MINIMUM_MONTH,
            date: MINIMUM_DATE,
            day: incrementDay,
          };
        if (date === caculateDateNum(year, month + 1))
          // 2022.06.30
          return {
            year,
            month: month + 1,
            date: MINIMUM_DATE,
            day: incrementDay,
          };
        return { year, month, date: date + 1, day: incrementDay }; // 2022.07.24
      }
      return { year, month, date, day };

    default:
      throw new Error("Not expected action type");
  }
};

export default calendarReducer;
