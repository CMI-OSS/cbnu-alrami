import { ChangeEventHandler, useEffect, useState } from "react";

import CalendarHeader from "src/components/molecules/CalendarHeader";
import Footer from "src/components/molecules/Footer";
import ScheduleCalendar from "src/components/molecules/ScheduleCalendar";
import ScheduleBox from "src/components/molecules/ScheduleCardBox";
import ScheduleRadioBox from "src/components/molecules/ScheduleRadioBox";
import {
  filterTodaySchedules,
  getCalendarMap,
  getDateWithoutTime,
  MAXIMUM_MONTH,
  MINIMUM_MONTH,
  MINIMUM_YEAR,
  fetchColleageSchedules,
  fetchPersonalSchedules,
  getMonth,
} from "src/utils/calendarTools";

import $ from "./style.module.scss";

export type ScheduleType = "personal" | "college";

export type CalendarData = {
  date: string;
  isSchedule: boolean;
  isHoliyday: boolean;
};

export type Schedule = {
  id: number;
  content: string;
  priority: number;
  isHoliyday: boolean;
  startDate: string;
  endDate: string | null;
};

function Calendar() {
  const [ toggleSchedule, setToggleSchedule ] =
    useState<ScheduleType>("personal");
  const [ personalCalendarMap, setPersonalCalendarMap ] = useState<
    CalendarData[]
  >([]);
  const [ collegeCalendarMap, setCollegeCalendarMap ] = useState<CalendarData[]>(
    [],
  );
  const [ collegeSchedules, setCollegeSchedules ] = useState<Schedule[]>([]);
  const [ personalSchedule, setPersonalSchedule ] = useState<Schedule[]>([]);
  const [ year, setYear ] = useState(new Date().getFullYear());
  const [ month, setMonth ] = useState(new Date().getMonth() + 1);
  const [ today, setToday ] = useState(getDateWithoutTime(new Date()));
  const [ selectedDate, setSelectedDate ] = useState(today);

  useEffect(() => {
    setCollegeSchedules(fetchColleageSchedules());
    setPersonalSchedule(fetchPersonalSchedules());
  }, []);

  useEffect(() => {
    const todayMonth = getMonth(today);
    if (todayMonth === month) {
      setSelectedDate(today);
      return;
    }
    const firstDateOfMonth = getDateWithoutTime(new Date(year, month - 1, 1));
    setSelectedDate(firstDateOfMonth);
  }, [ month ]);

  useEffect(() => {
    setCollegeCalendarMap(getCalendarMap(year, month, collegeSchedules));
  }, [ month, collegeSchedules ]);

  useEffect(() => {
    setPersonalCalendarMap(getCalendarMap(year, month, personalSchedule));
  }, [ month, personalSchedule ]);

  const handleScheduleToggleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setToggleSchedule(value as ScheduleType);
  };

  const handleMonthDecrease = () => {
    if (month === MINIMUM_MONTH) {
      if (year === MINIMUM_YEAR) return;
      setYear((pre) => pre - 1);
      setMonth(11);
      return;
    }
    setMonth((pre) => pre - 1);
  };

  const handleMonthIncrease = () => {
    if (month === MAXIMUM_MONTH) {
      setYear((pre) => pre + 1);
      setMonth(0);
      return;
    }
    setMonth((pre) => pre + 1);
  };

  return (
    <section className={$.calendar}>
      <div className={$["sticky-box"]}>
        <CalendarHeader
          {...{ year, month }}
          onMonthDecrease={handleMonthDecrease}
          onMonthIncrease={handleMonthIncrease}
        />
        <ScheduleCalendar
          {...{ today, month, setSelectedDate, selectedDate }}
          calendarMap={
            toggleSchedule === "college"
              ? collegeCalendarMap
              : personalCalendarMap
          }
        />
      </div>
      <ScheduleRadioBox
        toggle={toggleSchedule}
        onToggleChange={handleScheduleToggleChange}
      />
      <ScheduleBox
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
