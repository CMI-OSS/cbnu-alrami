import {
  CalenderAction,
  CalenderState,
} from "../interfaces/ActionInterfaces/CalenderInterface";
import { SUCCESS_CALENDER, FAIL_CALENDER } from "@src/actions/types";

const initialState: CalenderState = { "calender/success": false };

export default function Calender(
  state: CalenderState = initialState,
  action: CalenderAction,
) {
  switch (action.type) {
    case SUCCESS_CALENDER:
      return {
        ...state,
        "calender/success": true,
      };
    case FAIL_CALENDER:
      return {
        ...state,
        "calender/success": false,
      };
    default:
      return state;
  }
}
