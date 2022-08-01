import { Calendar } from "calendar";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { PERSONAL_SCHEDULES } from "src/__mocks__/schedules";
import { Schedule } from "src/page/Calendar";
import { flatten } from "underscore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const MINIMUM_YEAR = 1970;
export const MAXIMUM_MONTH = 11;
export const MAXIMUM_DATE = 31;
export const MINIMUM_MONTH = 0;
export const MINIMUM_DATE = 1;
export const DAY = [ "일", "월", "화", "수", "목", "금", "토" ] as const;

export const fetchBookmarkSchedules = () =>
  PERSONAL_SCHEDULES.map(({ isHoliyday, startDate, endDate, ...last }) => ({
    isHoliyday: !!isHoliyday,
    startDate: dayjs(startDate),
    endDate: endDate ? dayjs(endDate) : null,
    ...last,
  }));

export const filterTodaySchedules = (
  selected: Dayjs,
  schedules: Schedule[],
) => {
  const filteredSchedules = schedules.filter(({ startDate, endDate }) => {
    if (!endDate) return startDate.isSame(selected, "date");
    return (
      selected.isSameOrAfter(startDate, "date") &&
      selected.isSameOrBefore(endDate, "date")
    );
  });
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

const getTimeFormat = (date: Dayjs) =>
  date.format("a[ ]h[:]mm").replace("am", "오전").replace("pm", "오후");

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
  schedules: Schedule[],
) => {
  const calendarInstance = new Calendar();
  const calendar2D = calendarInstance.monthDates(year, month, (date) =>
    dayjs(date),
  );
  const calendar1D = flatten(calendar2D);
  const calendarMap = calendar1D.map((date) => {
    for (let i = 0; i < schedules.length; i += 1) {
      const schedule = schedules[i];
      const { startDate, endDate, isHoliyday } = schedule;
      if (endDate) {
        if (
          startDate.isSameOrBefore(date, "date") &&
          endDate.isSameOrAfter(date, "date")
        ) {
          return { date, isSchedule: true, isHoliyday };
        }
      }
      if (startDate.isSame(date, "date")) {
        return { date, isSchedule: true, isHoliyday };
      }
    }
    return { date, isSchedule: false, isHoliyday: false };
  });
  return calendarMap;
};

export const caculateDateNum = (year: number, month: number) =>
  dayjs().year(year).month(month).date(0).date();
