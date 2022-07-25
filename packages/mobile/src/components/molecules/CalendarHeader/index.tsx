import { useMemo } from "react";

import ArrowButton from "src/page/Calendar/ArrowButton";
import { DAY } from "src/utils/calendarTools";
import { calendarZeroPad } from "src/utils/calendarZeroPad";

import $ from "./style.module.scss";

type Props = {
  calendar: {
    year: number;
    month: number;
    date?: number;
    day?: number;
  };
  onDecrease: () => void;
  onIncrease: () => void;
};

function CalendarHeader({ calendar, onDecrease, onIncrease }: Props) {
  const { year, month, date, day } = calendar;
  const displayDate = useMemo(() => {
    const yyyymm = `${year}.${calendarZeroPad(month + 1)}`;
    const dd =
      date && day !== undefined && `.${calendarZeroPad(date)}.(${DAY[day]})`;
    return yyyymm + (dd || "");
  }, [ month, date ]);

  return (
    <header className={$.header}>
      <div className={$.container}>
        <ArrowButton direction="left" onClick={onDecrease} />
        <span className={$["year-month"]}>{displayDate}</span>
        <ArrowButton direction="right" onClick={onIncrease} />
      </div>
    </header>
  );
}

export default CalendarHeader;
