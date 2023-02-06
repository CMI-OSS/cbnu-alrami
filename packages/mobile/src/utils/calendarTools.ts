import { FormattedSchedule } from "@hooks/api/schedule";
import { Calendar } from "calendar";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { flatten } from "underscore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const MINIMUM_YEAR = 1970;
export const MAXIMUM_MONTH = 11;
export const MAXIMUM_DATE = 31;
export const MINIMUM_MONTH = 0;
export const MINIMUM_DATE = 1;
export const DAY = [ "일", "월", "화", "수", "목", "금", "토" ] as const;

export const filterTodaySchedules = (
  selected: Dayjs,
  schedules: FormattedSchedule[],
) => {
  const filteredSchedules = schedules.filter(
    ({ startDateTime, endDateTime }) => {
      if (!endDateTime) return startDateTime.isSame(selected, "date");
      return (
        selected.isSameOrAfter(startDateTime, "date") &&
        selected.isSameOrBefore(endDateTime, "date")
      );
    },
  );
  return filteredSchedules;
};

export const getDatePeriod = (startDate: Dayjs, endDate: Dayjs | null) => {
  const dateFormat = "M[.]D[.]";
  let period: string;
  const startDayIndex = startDate.day();
  if (!endDate) {
    period = `${startDate.format(dateFormat)}(${DAY[startDayIndex]})`;
    return period;
  }
  const endDayIndex = endDate.day();
  period = `${startDate.format(dateFormat)}(${
    DAY[startDayIndex]
  })~${endDate.format(dateFormat)}(${DAY[endDayIndex]})`;
  return period;
};

const getTimeFormat = (date: Dayjs) => {
  return date.format("a[ ]h[:]mm").replace("am", "오전").replace("pm", "오후");
};

export const getTimePeriod = (
  startDate: Dayjs,
  endDate: Dayjs | null,
  today: Dayjs,
) => {
  if (!endDate) return "하루 종일";
  const isStartToday = startDate.isSame(today, "date");
  const isEndToday = endDate.isSame(today, "date");
  if (!isStartToday && isEndToday) return `~${getTimeFormat(endDate)}`;
  if (isStartToday && !isEndToday) return `${getTimeFormat(startDate)}~`;
  if (isStartToday && isEndToday)
    return `${getTimeFormat(startDate)} ~ ${getTimeFormat(endDate)}`;
  return "하루 종일";
};

export const getCalendarMap = (
  year: number,
  month: number,
  schedules: FormattedSchedule[],
) => {
  const calendarInstance = new Calendar();
  const calendar2D = calendarInstance.monthDates(year, month, (date) => {
    return dayjs(date);
  });
  const calendar1D = flatten(calendar2D);
  const calendarMap = calendar1D.map((date) => {
    for (let i = 0; i < schedules.length; i += 1) {
      const schedule = schedules[i];
      const { startDateTime, endDateTime, isHoliday } = schedule;
      if (endDateTime) {
        if (
          startDateTime.isSameOrBefore(date, "date") &&
          endDateTime.isSameOrAfter(date, "date")
        ) {
          return { date, isScheduleExists: true, isHoliday };
        }
      }
      if (startDateTime.isSame(date, "date")) {
        return { date, isScheduleExists: true, isHoliday };
      }
    }
    return { date, isScheduleExists: false, isHoliday: false };
  });
  return calendarMap;
};

export const caculateDateNum = (year: number, month: number) => {
  return dayjs().year(year).month(month).date(0).date();
};
