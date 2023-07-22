import { ChangeEventHandler, useState } from "react";

import dayjs from "dayjs";
import {
  bookmarkScheduleQuery,
  useBookmarkSchedulesQuery,
  useMonthSchedulesQuery,
} from "src/hooks/api/schedule";
import { queryClient } from "src/main";
import RadioBox from "src/page/Calendar/RadioBox";
import ScheduleCalendar from "src/page/Calendar/ScheduleCalendar";
import { getCalendarMap } from "src/utils/calendarTools";

import CardBox from "./CardBox";
import useSelectedDate from "./useSelectedDate";

export type ScheduleType = "all" | "bookmark";

type Props = {
  today: dayjs.Dayjs;
  month: number;
  year: number;
};

export default function CalendarBody({ today, month, year }: Props) {
  queryClient.prefetchQuery(bookmarkScheduleQuery);

  const { data: bookmarkSchedules } = useBookmarkSchedulesQuery();
  const [ toggleSchedule, setToggleSchedule ] = useState<ScheduleType>("all");
  const [ selectedDate, setSelectedDate ] = useSelectedDate(today, year, month);

  const { data: monthSchedules } = useMonthSchedulesQuery(
    selectedDate.year(),
    selectedDate.month() + 1,
  );

  if (!monthSchedules || !bookmarkSchedules) return null;

  const filterdBookmarkSchedules =
    bookmarkSchedules?.filter((schedule) => {
      if (selectedDate.isSame(schedule.startDateTime, "month")) return true;
      if (selectedDate.isBefore(schedule.startDateTime, "month")) return false;
      if (
        schedule.endDateTime &&
        selectedDate.isAfter(schedule.endDateTime, "month")
      )
        return false;

      return true;
    }) ?? [];

  const schedules =
    toggleSchedule === "all" ? monthSchedules : filterdBookmarkSchedules;
  const calendarMap = getCalendarMap(year, month, schedules);

  const handleScheduleToggleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setToggleSchedule(value as ScheduleType);
  };

  return (
    <>
      <ScheduleCalendar
        {...{ calendarMap, today, month, year }}
        {...{ toggleSchedule, selectedDate, setSelectedDate }}
      />
      <RadioBox
        toggle={toggleSchedule}
        onToggleChange={handleScheduleToggleChange}
      />
      <CardBox
        scheduleType={toggleSchedule}
        {...{
          year,
          selectedDate,
          schedules: schedules ?? [],
          bookmarkSchedules,
        }}
      />
    </>
  );
}
