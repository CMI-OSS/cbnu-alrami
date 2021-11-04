import { combineReducers } from "redux";
import Calendar from "./CalendarReducer";

const rootReducer = combineReducers({
  Calendar,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
