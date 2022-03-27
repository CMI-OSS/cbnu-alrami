export interface CalendarScript {
  url: string;
  year: number;
  waitCalendarSelector: string;
  getSchedules: Function;
}
