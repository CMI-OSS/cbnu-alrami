export interface CalendarScript {
  url: string;
  scripts: { year: number; key: string }[];
  waitCalendarSelector: string;
  getSchedules: Function;
}
