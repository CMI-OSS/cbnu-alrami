import { ChangeEventHandler, useMemo, useReducer, useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import { useFetchBookmarkedSchedules } from "src/api/bookmark";
import { useFetchScheduleCalendar } from "src/api/scheduleCalendar";
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
  isSchedule: boolean;
  isHoliday: boolean;
};

export type Schedule = {
  id: number;
  content: string;
  priority: number;
  isHoliday: boolean;
  startDate: Dayjs;
  endDate: Dayjs | null;
};

function Calendar() {
  const [ toggleSchedule, setToggleSchedule ] = useState<ScheduleType>("all");
  const [ { year, month }, dispatchMonth ] = useReducer(caledarReducer, {
    year: dayjs().year(),
    month: dayjs().month(),
  });

  const {
    data: allSchedules,
    isError: isAllSchedulesError,
    isLoading: isAllSchedulesLoading,
  } = useFetchScheduleCalendar(year);
  const {
    data: bookmarkedSchedules,
    isError,
    isLoading,
  } = useFetchBookmarkedSchedules("1111");

  const today = useMemo(() => {
    return dayjs();
  }, []);
  const [ selectedDate, setSelectedDate ] = useSelectedDate(today, year, month);
  const allScheduleMap = useMemo(() => {
    return getCalendarMap(year, month, allSchedules || []);
  }, [ month, allSchedules ]);

  const bookmarkedScheduleMap = useMemo(() => {
    return getCalendarMap(year, month, bookmarkedSchedules || []);
  }, [ month, bookmarkedSchedules ]);

  const handleScheduleToggleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setToggleSchedule(value as ScheduleType);
  };

  return (
    <section className={$.calendar}>
      <div className={$["sticky-box"]}>
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
        bookmarkedSchedules={bookmarkedSchedules || []}
        todaysSchedules={
          toggleSchedule === "all"
            ? filterTodaySchedules(selectedDate, allSchedules || [])
            : filterTodaySchedules(selectedDate, bookmarkedSchedules || [])
        }
      />
      <Footer />
    </section>
  );
}

export default Calendar;
