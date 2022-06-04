import { Dispatch, SetStateAction } from "react";

import DateBox from "src/components/atoms/DateBox";
import DayBox from "src/components/atoms/DayBox";
import { CalendarData } from "src/page/Calendar";
import { DAY } from "src/utils/calendarTools";

import $ from "./style.module.scss";

type Props = {
  calendarMap: CalendarData[];
  today: string;
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  month: number;
};

function ScheduleCalendar({
  calendarMap,
  today,
  month,
  selectedDate,
  setSelectedDate,
}: Props) {
  return (
    <section className={$.box}>
      <ul className={$.calendar}>
        {DAY.map((day) => (
          <DayBox key={day} className={$.fraction} day={day} />
        ))}
        {calendarMap.map(({ date, isSchedule, isHoliyday }, index) => (
          <DateBox
            key={date}
            className={$.fraction}
            {...{
              date,
              isSchedule,
              isHoliyday,
              today,
              month,
              index,
              selectedDate,
              setSelectedDate,
            }}
          />
        ))}
      </ul>
    </section>
  );
}

export default ScheduleCalendar;
