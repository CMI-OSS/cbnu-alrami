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
  fetchColleageSchedules,
  fetchPersonalSchedules,
  filterTodaySchedules,
  getCalendarMap,
} from "src/utils/calendarTools";

import AddScheduleLink from "./AddScheduleLink";
import caledarReducer from "./calendarReducer";
import $ from "./style.module.scss";
import useSelectedDate from "./useSelectedDate";

export type ScheduleType = "personal" | "college";

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
  const [ toggleSchedule, setToggleSchedule ] =
    useState<ScheduleType>("personal");
  const [ collegeSchedules, setCollegeSchedules ] = useState<Schedule[]>([]);
  const [ personalSchedule, setPersonalSchedule ] = useState<Schedule[]>([]);
  const [ { year, month }, dispatchMonth ] = useReducer(caledarReducer, {
    year: dayjs().year(),
    month: dayjs().month(),
  });
  const today = useMemo(() => {
    return dayjs();
  }, []);
  const [ selectedDate, setSelectedDate ] = useSelectedDate(today, year, month);
  const collegeCalendarMap = useMemo(() => {
    return getCalendarMap(year, month, collegeSchedules);
  }, [ month, collegeSchedules ]);
  const personalCalendarMap = useMemo(() => {
    return getCalendarMap(year, month, personalSchedule);
  }, [ month, personalSchedule ]);

  useEffect(() => {
    setCollegeSchedules(fetchColleageSchedules());
    setPersonalSchedule(fetchPersonalSchedules());
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
          toggleSchedule === "college"
            ? collegeCalendarMap
            : personalCalendarMap
        }
      />
      <RadioBox
        toggle={toggleSchedule}
        onToggleChange={handleScheduleToggleChange}
      />
      <CardBox
        scheduleType={toggleSchedule}
        schedules={
          toggleSchedule === "college"
            ? filterTodaySchedules(selectedDate, collegeSchedules)
            : filterTodaySchedules(selectedDate, personalSchedule)
        }
        selectedDate={selectedDate}
      />
      <Footer />
    </section>
  );
}

export default Calendar;
