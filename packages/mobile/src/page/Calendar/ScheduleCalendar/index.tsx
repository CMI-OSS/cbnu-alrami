import { Dispatch } from "react";

import { Dayjs } from "dayjs";
import { DateMap } from "src/page/Calendar";
import Date from "src/page/Calendar/Date";
import Day from "src/page/Calendar/Day";
import { DAY } from "src/utils/calendarTools";

import $ from "./style.module.scss";

type Props = {
  calendarMap: DateMap[];
  today: Dayjs;
  selectedDate: Dayjs;
  setSelectedDate: Dispatch<Dayjs>;
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
        {DAY.map((day) => {
          return <Day key={day} className={$.fraction} day={day} />;
        })}
        {calendarMap.map(({ date, isSchedule, isHoliyday }, index) => {
          return (
            <Date
              key={date.format()}
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
          );
        })}
      </ul>
    </section>
  );
}

export default ScheduleCalendar;
