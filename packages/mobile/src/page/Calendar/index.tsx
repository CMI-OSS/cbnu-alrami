import { ChangeEventHandler, useReducer, useState } from "react";

import {
  useBookmarkSchedulesQuery,
  useFullSchedulesQuery,
} from "@hooks/api/schedule";
import useSwipe from "@hooks/useSwipe";
import dayjs, { Dayjs } from "dayjs";
import CalendarHeader from "src/components/molecules/CalendarHeader";
import Footer from "src/components/molecules/Footer";
import CardBox from "src/page/Calendar/CardBox";
import RadioBox from "src/page/Calendar/RadioBox";
import ScheduleCalendar from "src/page/Calendar/ScheduleCalendar";
import { filterTodaySchedules, getCalendarMap } from "src/utils/calendarTools";

import caledarReducer from "./calendarReducer";
import $ from "./style.module.scss";
import useSelectedDate from "./useSelectedDate";

export type ScheduleType = "all" | "bookmark";

export type DateMap = {
  date: Dayjs;
  isScheduleExists: boolean;
  isHoliday: boolean;
};

function Calendar() {
  const today = dayjs();
  const [ toggleSchedule, setToggleSchedule ] = useState<ScheduleType>("all");
  const [ { year, month }, dispatchMonth ] = useReducer(caledarReducer, {
    year: today.year(),
    month: today.month(),
  });
  const [ selectedDate, setSelectedDate ] = useSelectedDate(today, year, month);
  const swipeRef = useSwipe();

  const { data: allSchedules } = useFullSchedulesQuery(year);
  const { data: bookmarkedSchedules } = useBookmarkSchedulesQuery();
  if (!bookmarkedSchedules || !allSchedules) return <div>없음</div>;

  const allScheduleMap = getCalendarMap(year, month, allSchedules);
  const bookmarkedScheduleMap = getCalendarMap(
    year,
    month,
    bookmarkedSchedules,
  );

  const handleScheduleToggleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setToggleSchedule(value as ScheduleType);
  };

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
      <ScheduleCalendar
        {...{ today, month, setSelectedDate, selectedDate }}
        calendarMap={
          toggleSchedule === "all" ? allScheduleMap : bookmarkedScheduleMap
        }
      />
      <RadioBox
        toggle={toggleSchedule}
        onToggleChange={handleScheduleToggleChange}
      />
      <CardBox
        scheduleType={toggleSchedule}
        bookmarkedSchedules={bookmarkedSchedules}
        todaysSchedules={
          toggleSchedule === "all"
            ? filterTodaySchedules(selectedDate, allSchedules)
            : filterTodaySchedules(selectedDate, bookmarkedSchedules)
        }
      />
      <Footer />
    </section>
  );
}

export default Calendar;
