import {
  CalendarAction,
  CalendarState,
} from "../interfaces/ActionInterfaces/CalendarInterface";
import { SUCCESS_CALENDAR, FAIL_CALENDAR } from "../actions/types";

const initialState: CalendarState = { "calendar/success": false };

export default function calendar(
  state: CalendarState = initialState,
  action: CalendarAction,
) {
  switch (action.type) {
    case SUCCESS_CALENDAR:
      return {
        ...state,
        "calendar/success": true,
      };
    case FAIL_CALENDAR:
      return {
        ...state,
        "calendar/success": false,
      };
    default:
      return state;
  }
}
