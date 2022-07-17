import { useMemo } from "react";

import ArrowButton from "src/page/Calendar/ArrowButton";

import $ from "./style.module.scss";

type Props = {
  year: number;
  month: number;
  onMonthDecrease: () => void;
  onMonthIncrease: () => void;
};

function CalendarHeader({
  year,
  month,
  onMonthDecrease,
  onMonthIncrease,
}: Props) {
  const displayDate = useMemo(
    () => `${year}.${(month + 1).toString().padStart(2, "0")}`,
    [ month ],
  );

  return (
    <header className={$.header}>
      <div className={$.container}>
        <ArrowButton direction="left" onClick={onMonthDecrease} />
        <span className={$["year-month"]}>{displayDate}</span>
        <ArrowButton direction="right" onClick={onMonthIncrease} />
      </div>
    </header>
  );
}

export default CalendarHeader;
