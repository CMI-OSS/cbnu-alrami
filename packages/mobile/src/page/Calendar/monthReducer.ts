import {
  MAXIMUM_MONTH,
  MINIMUM_MONTH,
  MINIMUM_YEAR,
} from "src/utils/calendarTools";

const monthReducer = (
  state: { year: number; month: number },
  action: { type: "increment" | "decrement" },
) => {
  switch (action.type) {
    case "decrement":
      if (state.month === MINIMUM_MONTH) {
        if (state.year === MINIMUM_YEAR)
          return { year: state.year, month: state.month };
        return { year: state.year - 1, month: 11 };
      }
      return { year: state.year, month: state.month - 1 };
    case "increment":
      if (state.month === MAXIMUM_MONTH)
        return { year: state.year + 1, month: 0 };
      return { year: state.year, month: state.month + 1 };
    default:
      throw new Error("Not expected action type");
  }
};

export default monthReducer;
