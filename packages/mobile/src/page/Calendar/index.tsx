import { useReducer } from "react";

import useSwipe from "@hooks/useSwipe";
import dayjs, { Dayjs } from "dayjs";
import ErrorFallback from "src/components/atoms/ErrorFallback";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import CalendarHeader from "src/components/molecules/CalendarHeader";
import Footer from "src/components/molecules/Footer";
import AsyncBoundary from "src/components/templates/AsyncBoundary";

import CalendarBody from "./CalendarBody";
import caledarReducer from "./calendarReducer";
import $ from "./style.module.scss";

export type ScheduleType = "all" | "bookmark";

export type DateMap = {
  date: Dayjs;
  isScheduleExists: boolean;
  isHoliday: boolean;
};

const bodyHeight =
  "calc(var(--vh, 1vh) * 100 - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))";

function Calendar() {
  const today = dayjs();
  const [ { year, month }, dispatchMonth ] = useReducer(caledarReducer, {
    year: today.year(),
    month: today.month(),
  });
  const swipeRef = useSwipe();

  return (
    <section className={$.calendar} ref={swipeRef}>
      <div className={$["calendar-header"]}>
        <CalendarHeader
          calendar={{ ...{ year, month } }}
          onDecrease={() => {
            return dispatchMonth({ type: "decrement_month" });
          }}
          onIncrease={() => {
            return dispatchMonth({ type: "increment_month" });
          }}
        />
      </div>
      <AsyncBoundary
        suspenseFallback={<SuspenseFallback height={bodyHeight} />}
        errorFallback={ErrorFallback}
        fallBackHeight={bodyHeight}
      >
        <CalendarBody {...{ today, month, year }} />
      </AsyncBoundary>
      <Footer />
    </section>
  );
}

export default Calendar;
