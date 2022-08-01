import {
  ChangeEventHandler,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import dayjs, { Dayjs } from "dayjs";
import CalendarHeader from "src/components/molecules/CalendarHeader";
import Footer from "src/components/molecules/Footer";
import CardBox from "src/page/Calendar/CardBox";
import RadioBox from "src/page/Calendar/RadioBox";
import ScheduleCalendar from "src/page/Calendar/ScheduleCalendar";
import {
  fetchBookmarkSchedules,
  filterTodaySchedules,
  getCalendarMap,
} from "src/utils/calendarTools";

import AddScheduleLink from "./AddScheduleLink";
import caledarReducer from "./calendarReducer";
import $ from "./style.module.scss";
import useAllSchedules from "./useAllSchedules";
import useSelectedDate from "./useSelectedDate";

export type ScheduleType = "all" | "bookmark";

export type DateMap = {
  date: Dayjs;
  isSchedule: boolean;
  isHoliyday: boolean;
};

export type Schedule = {
  id: number;
  content: string;
  priority: number;
  isHoliyday: boolean;
  startDate: Dayjs;
  endDate: Dayjs | null;
};

function Calendar() {
  const [ toggleSchedule, setToggleSchedule ] = useState<ScheduleType>("all");
  const [ bookmarkSchedules, setBookmarkSchedules ] = useState<Schedule[]>([]);
  const [ { year, month }, dispatchMonth ] = useReducer(caledarReducer, {
    year: dayjs().year(),
    month: dayjs().month(),
  });
  const allSchedules = useAllSchedules();
  const today = useMemo(() => dayjs(), []);
  const [ selectedDate, setSelectedDate ] = useSelectedDate(today, year, month);
  const allScheduleMap = useMemo(
    () => getCalendarMap(year, month, allSchedules),
    [ month, allSchedules ],
  );
  const bookmarkScheduleMap = useMemo(
    () => getCalendarMap(year, month, bookmarkSchedules),
    [ month, bookmarkSchedules ],
  );

  useEffect(() => {
    // TODO: 목데이터 즐겨찾기 API로 교체하기
    setBookmarkSchedules(fetchBookmarkSchedules());
  }, []);

  const handleScheduleToggleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setToggleSchedule(value as ScheduleType);
  };

  return (
    <section className={$.calendar}>
      <div className={$["sticky-box"]}>
        <AddScheduleLink className={$["add-link"]} />
        <CalendarHeader
          calendar={{ ...{ year, month } }}
          onDecrease={() => dispatchMonth({ type: "decrement_month" })}
          onIncrease={() => dispatchMonth({ type: "increment_month" })}
        />
      </div>
      <ScheduleCalendar
        {...{ today, month, setSelectedDate, selectedDate }}
        calendarMap={
          toggleSchedule === "all" ? allScheduleMap : bookmarkScheduleMap
        }
      />
      <RadioBox
        toggle={toggleSchedule}
        onToggleChange={handleScheduleToggleChange}
      />
      <CardBox
        scheduleType={toggleSchedule}
        schedules={
          toggleSchedule === "all"
            ? filterTodaySchedules(selectedDate, allSchedules)
            : filterTodaySchedules(selectedDate, bookmarkSchedules)
        }
      />
      <Footer />
    </section>
  );
}

export default Calendar;
