import { ThunkAction } from "redux-thunk";
import { CalendarAction } from "../interfaces/ActionInterfaces/CalendarInterface";
import { RootState } from "../reducers";
import { SUCCESS_CALENDAR, FAIL_CALENDAR } from "./types";
import http from "../common/http";

export function successCalendar(): ThunkAction<
  void,
  RootState,
  null,
  CalendarAction
> {
  return async (dispatch) => {
    try {
      const response = await http.get(``);
      dispatch({ type: SUCCESS_CALENDAR, payload: response.data });
      return Promise.resolve(response.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

export function failCalendar(): ThunkAction<
  void,
  RootState,
  null,
  CalendarAction
> {
  return async (dispatch) => {
    try {
      const response = await http.get(``);
      dispatch({ type: FAIL_CALENDAR, payload: response.data });
      return Promise.resolve(response.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}
