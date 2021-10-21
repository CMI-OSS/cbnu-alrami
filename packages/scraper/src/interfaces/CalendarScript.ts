export interface CalendarScript {
  url: string;
  years: { year: number; key: string }[];
  waitCalendarSelector: string;
  getSchedules: Function;
}
