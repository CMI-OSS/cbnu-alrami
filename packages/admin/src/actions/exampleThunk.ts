import { ThunkAction } from "redux-thunk";
import { exampleAction, SW, MIS, PSY } from "./exampleTypes";
import { RootState } from "../reducers";
import http from "../common/http";

export function swThunk(): ThunkAction<void, RootState, null, exampleAction> {
  return async (dispatch) => {
    try {
      const response = await http.get(``);
      dispatch({ type: SW, payload: response.data });
      return Promise.resolve(response.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

export function misThunk(): ThunkAction<void, RootState, null, exampleAction> {
  return async (dispatch) => {
    try {
      const response = await http.get(``);
      dispatch({ type: MIS, payload: response.data });
      return Promise.resolve(response.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}
