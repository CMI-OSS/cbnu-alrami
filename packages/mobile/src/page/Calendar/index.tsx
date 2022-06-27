import { ChangeEventHandler, useEffect, useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import CalendarHeader from "src/components/molecules/CalendarHeader";
import Footer from "src/components/molecules/Footer";
import ScheduleCalendar from "src/components/molecules/ScheduleCalendar";
import ScheduleBox from "src/components/molecules/ScheduleCardBox";
import ScheduleRadioBox from "src/components/molecules/ScheduleRadioBox";
import {
  filterTodaySchedules,
  getCalendarMap,
  MAXIMUM_MONTH,
  MINIMUM_MONTH,
  MINIMUM_YEAR,
  fetchColleageSchedules,
  fetchPersonalSchedules,
} from "src/utils/calendarTools";

import $ from "./style.module.scss";

export type ScheduleType = "personal" | "college";

export type CalendarData = {
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
  const [ personalCalendarMap, setPersonalCalendarMap ] = useState<
    CalendarData[]
  >([]);
  const [ collegeCalendarMap, setCollegeCalendarMap ] = useState<CalendarData[]>(
    [],
  );
  const [ collegeSchedules, setCollegeSchedules ] = useState<Schedule[]>([]);
  const [ personalSchedule, setPersonalSchedule ] = useState<Schedule[]>([]);
  const [ year, setYear ] = useState(dayjs().year());
  const [ month, setMonth ] = useState(dayjs().month());
  const [ today, setToday ] = useState(dayjs());
  const [ selectedDate, setSelectedDate ] = useState(today);

  useEffect(() => {
    setCollegeSchedules(fetchColleageSchedules());
    setPersonalSchedule(fetchPersonalSchedules());
  }, []);

  useEffect(() => {
    if (today.month() === month) {
      setSelectedDate(today);
      return;
    }
    const firstDateOfMonth = dayjs(`${year}-${month + 1}-01`);
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
