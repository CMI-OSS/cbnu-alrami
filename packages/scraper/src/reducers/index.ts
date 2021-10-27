import { combineReducers } from "redux";
import Calender from "./CalendarReducer";

const rootReducer = combineReducers({
  Calender,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
