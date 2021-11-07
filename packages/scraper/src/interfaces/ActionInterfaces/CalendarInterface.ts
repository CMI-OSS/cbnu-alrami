import { SUCCESS_CALENDAR, FAIL_CALENDAR } from "../../actions/types";

export interface SuccessType {
  type: typeof SUCCESS_CALENDAR;
}

export interface FailType {
  type: typeof FAIL_CALENDAR;
}

export type CalendarAction = SuccessType | FailType;

export interface CalendarState {
  "calendar/success": boolean;
}
