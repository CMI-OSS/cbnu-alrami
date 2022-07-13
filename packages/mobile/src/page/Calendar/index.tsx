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
import ScheduleCalendar from "src/components/molecules/ScheduleCalendar";
import ScheduleBox from "src/components/molecules/ScheduleCardBox";
import ScheduleRadioBox from "src/components/molecules/ScheduleRadioBox";
import {
  fetchColleageSchedules,
  fetchPersonalSchedules,
  filterTodaySchedules,
  getCalendarMap,
} from "src/utils/calendarTools";

import monthReducer from "./monthReducer";
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
  const [ { year, month }, dispatchMonth ] = useReducer(monthReducer, {
    year: dayjs().year(),
    month: dayjs().month(),
  });
  const today = useMemo(() => dayjs(), []);
  const [ selectedDate, setSelectedDate ] = useSelectedDate(today, year, month);
  const collegeCalendarMap = useMemo(
    () => getCalendarMap(year, month, collegeSchedules),
    [ month, collegeSchedules ],
  );
  const personalCalendarMap = useMemo(
    () => getCalendarMap(year, month, personalSchedule),
    [ month, personalSchedule ],
  );

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
        <CalendarHeader
          {...{ year, month }}
          onMonthDecrease={() => dispatchMonth({ type: "decrement" })}
          onMonthIncrease={() => dispatchMonth({ type: "increment" })}
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
