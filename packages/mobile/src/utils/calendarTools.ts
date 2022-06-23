import { Calendar } from "calendar";
import { COLLEGE_SCHEDULES, PERSONAL_SCHEDULES } from "src/__mocks__/schedules";
import { Schedule } from "src/page/Calendar";
import { flatten } from "underscore";

type Ampm = "오전" | "오후";

export const MINIMUM_YEAR = 1970;
export const MAXIMUM_MONTH = 11;
export const MINIMUM_MONTH = 0;
export const DAY = [ "일", "월", "화", "수", "목", "금", "토" ] as const;

const getDateInformation = (dateTime: string) => {
  const year = dateTime.slice(0, 4);
  const month = dateTime.slice(5, 7).startsWith("0")
    ? dateTime.slice(6, 7)
    : dateTime.slice(5, 7);
  const date = dateTime.slice(8, 10).startsWith("0")
    ? dateTime.slice(9, 10)
    : dateTime.slice(8, 10);
  const dateInstance = new Date(dateTime);
  const dayIndex = dateInstance.getDay();
  const day = DAY[dayIndex];
  const dateObject = { year, month, date, day };
  return dateObject;
};

const getTimeInformation = (dateTime: string) => {
  const dateInstance = new Date(dateTime);
  let ampm: Ampm = "오전";
  let hours = dateInstance.getHours();
  const minutes = dateInstance.getMinutes().toString().padEnd(2, "0");
  if (hours > 12) {
    hours -= 12;
    ampm = "오후";
  }
  if (hours === 0) {
    hours = 12;
    ampm = "오전";
  }
  const timeInformation = { hours: hours.toString(), minutes, ampm };
  return timeInformation;
};

export const getMonth = (dateTime: string) =>
  parseInt(dateTime.slice(5, 7), 10);

export const getDate = (dateTime: string) =>
  dateTime.slice(8, 10).startsWith("0")
    ? dateTime.slice(9, 10)
    : dateTime.slice(8, 10);

export const fetchColleageSchedules = () =>
  COLLEGE_SCHEDULES.map(({ isHoliyday, ...schedule }) => ({
    // tinyint 타입을 boolean으로 변환
    isHoliyday: !!isHoliyday,
    ...schedule,
  }));

export const fetchPersonalSchedules = () =>
  PERSONAL_SCHEDULES.map(({ isHoliyday, ...schedule }) => ({
    isHoliyday: !!isHoliyday,
    ...schedule,
  }));

export const filterTodaySchedules = (
  selected: string,
  schedules: Schedule[],
) => {
  const filteredSchedules = schedules.filter(({ startDate, endDate }) => {
    const start = getDateWithoutTime(startDate);
    if (!endDate) return start === selected;
    const end = getDateWithoutTime(endDate);
    return start <= selected && selected <= end;
  });
  return filteredSchedules;
};

export const getDateWithoutTime = (dateTime: string | Date) => {
  const localTimeOffset = new Date().getTimezoneOffset() * 60000;
  if (typeof dateTime === "string") return dateTime.slice(0, 10);
  return new Date(dateTime.getTime() - localTimeOffset).toJSON().slice(0, 10);
};

export const getDatePeriod = (startDate: string, endDate: string | null) => {
  let period: string;
  const startDateObject = getDateInformation(startDate);
  if (endDate) {
    const endDateObject = getDateInformation(endDate);
    period = `${startDateObject.month}.${startDateObject.date}.(${startDateObject.day})~${endDateObject.month}.${endDateObject.date}.(${endDateObject.day})`;
    return period;
  }
  period = `${startDateObject.month}.${startDateObject.date}.(${startDateObject.day})`;
  return period;
};

export const getTimePeriod = (
  startDate: string,
  endDate: string | null,
  today: string,
) => {
  const startTime = getTimeInformation(startDate);
  if (!endDate) return "하루 종일";
  const endTime = getTimeInformation(endDate);
  const isNotStartToday = getDateWithoutTime(startDate) < today;
  const isNotEndToday = getDateWithoutTime(endDate) > today;
  if (isNotStartToday && isNotEndToday) return "하루 종일";
  if (isNotStartToday)
    return `~${endTime.ampm} ${endTime.hours}:${endTime.minutes}`;
  if (isNotEndToday)
    return `${startTime.ampm} ${startTime.hours}:${startTime.minutes}~`;
  return `${startTime.ampm} ${startTime.hours}:${startTime.minutes}~${endTime.ampm} ${endTime.hours}:${endTime.minutes}`;
};

export const getDisplayDate = (year: number, month: number) => {
  let displayMonth = month.toString();
  if (displayMonth.length === 1) displayMonth = `0${displayMonth}`;
  return `${year}.${displayMonth}`;
};

export const getCalendarMap = (
  year: number,
  month: number,
  schedules: Schedule[],
) => {
  const calendarInstance = new Calendar();
  const calendar2D = calendarInstance.monthDates(year, month - 1, (date) =>
    getDateWithoutTime(date),
  );
  const calendar1D = flatten(calendar2D);
  const calendarMap = calendar1D.map((date) => {
    for (let i = 0; i < schedules.length; i += 1) {
      const schedule = schedules[i];
      const { startDate, endDate, isHoliyday } = schedule;
      const start = getDateWithoutTime(startDate);
      if (endDate) {
        const end = getDateWithoutTime(endDate);
        if (start <= date && date <= end) {
          return { date, isSchedule: true, isHoliyday };
        }
      }
      if (start === date) {
        return { date, isSchedule: true, isHoliyday };
      }
    }
    return { date, isSchedule: false, isHoliyday: false };
  });
  return calendarMap;
};
