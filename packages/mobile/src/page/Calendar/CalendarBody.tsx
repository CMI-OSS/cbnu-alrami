import { ChangeEventHandler, useState } from "react";

import dayjs from "dayjs";
import {
  bookmarkScheduleQuery,
  fullScheduleQuery,
  useBookmarkSchedulesQuery,
  useFullSchedulesQuery,
} from "src/hooks/api/schedule";
import { queryClient } from "src/main";
import RadioBox from "src/page/Calendar/RadioBox";
import ScheduleCalendar from "src/page/Calendar/ScheduleCalendar";
import { filterTodaySchedules, getCalendarMap } from "src/utils/calendarTools";

import CardBox from "./CardBox";
import useSelectedDate from "./useSelectedDate";

export type ScheduleType = "all" | "bookmark";

type Props = {
  today: dayjs.Dayjs;
  month: number;
  year: number;
};

export default function CalendarBody({ today, month, year }: Props) {
  queryClient.prefetchQuery(fullScheduleQuery(year));
  queryClient.prefetchQuery(bookmarkScheduleQuery);
  const { data: allSchedules } = useFullSchedulesQuery(year);
  const { data: bookmarkSchedules } = useBookmarkSchedulesQuery();
  const [ toggleSchedule, setToggleSchedule ] = useState<ScheduleType>("all");
  const [ selectedDate, setSelectedDate ] = useSelectedDate(today, year, month);

  if (!allSchedules || !bookmarkSchedules) return null;

  const schedules = toggleSchedule === "all" ? allSchedules : bookmarkSchedules;
  const calendarMap = getCalendarMap(year, month, schedules);
  const todaysSchedules = filterTodaySchedules(selectedDate, schedules);

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
        {...{ year, selectedDate, todaysSchedules, bookmarkSchedules }}
      />
    </>
  );
}
